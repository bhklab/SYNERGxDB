/* eslint-disable func-names */
const express = require('express');
const db = require('../db');

const router = express.Router();

// Route to retrieve list of potential biomarkers
router.get('/', (req, res) => {
  const { drugId1, drugId2 } = req.query;
  function subqueryAnova() {
    let baseQuery = this.select('gene', 'p', 'idSource as id')
      .from('anova');
    baseQuery = baseQuery.where({
      idDrugA: drugId1, idDrugB: drugId2,
    })
      .orWhere({
        idDrugA: drugId2, idDrugB: drugId1,
      });
    return baseQuery.orderBy('p', 'desc')
      .limit(10)
      .as('biomarker');
  }
  db.select('gene', 'p', 'idSource', 'name')
    .from(subqueryAnova)
    .join('source', 'source.idSource', '=', 'biomarker.id')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

router.get('/association', (req, res) => {
  const { gene, sample } = req.query;
  let {
    drugId1, drugId2, dataset,
  } = req.query;
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  dataset = dataset && parseInt(dataset, 10);

  console.log(sample);
  let sampleArray;
  let tissue;
  if (sample) {
    sampleArray = sample.includes(',')
      ? sample.split(',').map(item => parseInt(item, 10))
      : [Number.isNaN(parseInt(sample, 10)) ? sample : parseInt(sample, 10)];
    if (Number.isNaN(parseInt(sampleArray[0], 10))) [tissue] = sampleArray;
  }
  console.log('tissue', tissue);

  function subqueryGeneIdentifier() {
    this.select('gene_id')
      .from('gene_identifiers')
      .where({ hgnc_symbol: gene });
  }
  function subqueryFPKM() {
    this.select('model_id', 'fpkm')
      .from('rnaseq')
      .where('gene_id', 'in', subqueryGeneIdentifier)
      .as('FPKM');
  }

  function subquerySamples() {
    let subquery = this.select('model_id', 'name', 'model_identifiers.idSample as idSample')
      .from('sample');
    if (tissue) {
      subquery = subquery
        .join('model_identifiers', 'model_identifiers.idSample', '=', 'sample.idSample')
        .where({ tissue: sample });
    } else if (sampleArray) {
      subquery = subquery
        .join('model_identifiers', 'model_identifiers.idSample', '=', 'sample.idSample')
        .whereIn('sample.idSample', sampleArray);
    } else {
      subquery = subquery
        .join('model_identifiers', 'model_identifiers.idSample', '=', 'sample.idSample');
    }
    return subquery.as('S');
  }
  function subqueryAssociations() {
    this.select('idSample', 'fpkm', 'name')
      .from(subqueryFPKM)
      .join(subquerySamples, 'FPKM.model_id', '=', 'S.model_id')
      .as('A');
  }

  function subqueryDrugs() {
    if (drugId2) {
      return this.where({ idDrugA: drugId1, idDrugB: drugId2 })
        .orWhere({ idDrugB: drugId1, idDrugA: drugId2 });
    }
    return this.where({ idDrugA: drugId1 })
      .orWhere({ idDrugB: drugId1 });
  }

  function subqueryComboDesign() {
    let subquery = this.select('fpkm', 'name as cellName', 'idCombo_Design')
      .from(subqueryAssociations)
      .join('Combo_design', 'Combo_design.idSample', '=', 'A.idSample');

    if (drugId1) subquery = subquery.where(subqueryDrugs);
    return subquery.as('CD');
  }
  function subquerySynergyScores() {
    let subquery = this.select('fpkm', 'cellName', 'bliss', 'loewe', 'hsa', 'zip')
      .from(subqueryComboDesign)
      .join('Synergy_score', 'Synergy_score.idCombo_design', '=', 'CD.idCombo_design');
    if (dataset) subquery = subquery.where({ idSource: dataset });
    return subquery
      .orderBy('cellName')
      .as('SS');
  }
  db.select('fpkm', 'cellName')
    .avg('bliss as bliss')
    .avg('loewe as loewe')
    .avg('hsa as hsa')
    .avg('zip as zip')
    .from(subquerySynergyScores)
    .groupBy('fpkm', 'cellName')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

// Retrieves data for the biomarker table
router.get('/synergy', async (req, res) => {
  const { type } = req.query;
  if (!type || !(type === 'zip' || type === 'bliss' || type === 'hsa' || type === 'loewe')) {
    res.status(400).json({ message: 'Synergy type is not specified correctly' });
    return;
  }

  let {
    dataset, drugId1, drugId2,
  } = req.query;
  dataset = dataset && parseInt(dataset, 10);
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);

  function drugFiltering() {
    if (drugId2) {
      return this.where({ idDrugA: drugId1, idDrugB: drugId2 })
        .orWhere({ idDrugB: drugId1, idDrugA: drugId2 });
    }
    return this.where({ idDrugA: drugId1 })
      .orWhere({ idDrugB: drugId1 });
  }

  function subqueryBiomarkers() {
    let subquery;
    switch (type) {
      case 'zip':
        subquery = this.select('zip_significant.*').from('zip_significant');
        break;
      case 'bliss':
        subquery = this.select('bliss_significant.*').from('bliss_significant');
        break;
      case 'hsa':
        subquery = this.select('hsa_significant.*').from('hsa_significant');
        break;
      case 'loewe':
        subquery = this.select('loewe_significant.*').from('loewe_significant');
        break;
      default:
        break;
    }
    if (drugId1) subquery = subquery.where(drugFiltering);
    if (dataset) subquery = subquery.andWhere({ idSource: dataset });
    return subquery.as('biomark');
  }

  function subqueryGeneDatasetPairs() {
    let query = this.distinct('gene', 'idSource', 'idDrugA', 'idDrugB');
    switch (type) {
      case 'zip':
        query = query.from('zip_significant');
        break;
      case 'bliss':
        query = query.from('bliss_significant');
        break;
      case 'hsa':
        query = query.from('hsa_significant');
        break;
      case 'loewe':
        query = query.from('loewe_significant');
        break;
      default:
        break;
    }
    if (drugId1) query = query.where(drugFiltering);
    return query.as('GDP');
  }

  function subqueryOccurrences() {
    let query;
    if (dataset) {
      query = this.select(db.raw('gene, idDrugA, idDrugB, 1 as \'occurrences\''));
    } else {
      query = this.select('gene', 'idDrugA', 'idDrugB').count('idSource as occurrences');
    }
    return query.from(subqueryGeneDatasetPairs).groupBy('gene', 'idDrugA', 'idDrugB').as('O');
  }

  function subqueryDataset() {
    this.select('gene', 'concordanceIndex', 'pValue', 'name as dataset', 'idDrugA', 'idDrugB')
      .from(subqueryBiomarkers)
      .innerJoin('source', 'source.idSource', '=', 'biomark.idSource')
      .as('DS');
  }
  function subqueryDrugA() {
    this.select('gene', 'concordanceIndex', 'pValue', 'dataset', 'idDrugA', 'name as drugA', 'idDrugB')
      .from(subqueryDataset)
      .innerJoin('drug', 'drug.idDrug', '=', 'DS.idDrugA')
      .as('D1');
  }
  function subqueryDrugB() {
    this.select('gene', 'concordanceIndex', 'pValue', 'dataset', 'idDrugA', 'idDrugB', 'drugA', 'name as drugB')
      .from(subqueryDrugA)
      .innerJoin('drug', 'drug.idDrug', '=', 'D1.idDrugB')
      .as('D2');
  }

  db.select('occurrences', 'D2.gene as gene', 'concordanceIndex', 'pValue', 'dataset', 'drugA', 'drugB')
    .from(subqueryDrugB)
    .innerJoin(subqueryOccurrences, function () {
      this.on('O.gene', '=', 'D2.gene');
      this.andOn('O.idDrugA', '=', 'D2.idDrugA');
      this.andOn('O.idDrugB', '=', 'D2.idDrugB');
    })
    .orderBy('occurrences', 'desc')
    .orderBy('pValue')
    .orderBy('gene')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

// Checks if there is any biomarker data available for a given dataset
// and synergy score type
router.get('/dataset/:id/:type', (req, res) => {
  let idSource;
  const { type } = req.params;
  console.log(req.params.id, type);

  if (type !== 'zip' && type !== 'bliss' && type !== 'hsa' && type !== 'loewe') {
    res.status(400).json({ error: 'synergy score type is incorrect' });
    return;
  }

  if (req.params.id) {
    idSource = parseInt(req.params.id, 10);
  } else {
    res.status(400).json({ error: 'dataset id is incorrectly specified' });
    return;
  }
  let query = db.countDistinct('idSource as count');

  switch (type) {
    case 'zip':
      query = query.from('zip_significant');
      break;
    case 'bliss':
      query = query.from('bliss_significant');
      break;
    case 'hsa':
      query = query.from('hsa_significant');
      break;
    case 'loewe':
      query = query.from('loewe_significant');
      break;
    default:
      query = query.from('zip_significant');
      break;
  }

  query
    .where({ idSource })
    .then((data) => {
      const { count } = data[0];
      const message = {};
      message.biomarkers = count > 0;
      console.log(count);
      res.status(200).json(message);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

module.exports = router;


// ////////////////////////////////////////////////////
// Synergy route, old implementation with minPValue //
// ////////////////////////////////////////////////////

// router.get('/synergy', async (req, res) => {
//   const { type } = req.query;
//   if (!type || !(type === 'zip' || type === 'bliss' || type === 'hsa' || type === 'loewe')) {
//     res.status(400).json({ message: 'Synergy type is not specified correctly' });
//     return;
//   }

//   let {
//     dataset, drugId1, drugId2,
//   } = req.query;
//   dataset = dataset && parseInt(dataset, 10);
//   drugId1 = drugId1 && parseInt(drugId1, 10);
//   drugId2 = drugId2 && parseInt(drugId2, 10);

//   function drugFiltering() {
//     if (drugId2) {
//       return this.where({ idDrugA: drugId1, idDrugB: drugId2 })
//         .orWhere({ idDrugB: drugId1, idDrugA: drugId2 });
//     }
//     return this.where({ idDrugA: drugId1 })
//       .orWhere({ idDrugB: drugId1 });
//   }

//   function subqueryPValueGene() {
//     let subquery = this.select('gene').min('pValue as minPValue');
//     switch (type) {
//       case 'zip':
//         subquery = subquery.from('zip_significant');
//         break;
//       case 'bliss':
//         subquery = subquery.from('bliss_significant');
//         break;
//       case 'hsa':
//         subquery = subquery.from('hsa_significant');
//         break;
//       case 'loewe':
//         subquery = subquery.from('loewe_significant');
//         break;
//       default:
//         break;
//     }
//     if (drugId1) subquery = subquery.where(drugFiltering);
//     if (dataset) subquery = subquery.andWhere({ idSource: dataset });
//     return subquery.groupBy('gene').as('t1');
//   }

//   function subqueryBiomarkers() {
//     let query;
//     switch (type) {
//       case 'zip':
//         query = this.select('zip_significant.*')
//           .from(subqueryPValueGene)
//           .innerJoin('zip_significant', function () {
//             this.on('zip_significant.gene', '=', 't1.gene');
//             this.andOn('zip_significant.pValue', '=', 't1.minPValue');
//           });
//         break;
//       case 'bliss':
//         query = this.select('bliss_significant.*')
//           .from(subqueryPValueGene)
//           .innerJoin('bliss_significant', function () {
//             this.on('bliss_significant.gene', '=', 't1.gene');
//             this.andOn('bliss_significant.pValue', '=', 't1.minPValue');
//           });
//         break;
//       case 'hsa':
//         query = this.select('hsa_significant.*')
//           .from(subqueryPValueGene)
//           .innerJoin('hsa_significant', function () {
//             this.on('hsa_significant.gene', '=', 't1.gene');
//             this.andOn('hsa_significant.pValue', '=', 't1.minPValue');
//           });
//         break;
//       case 'loewe':
//         query = this.select('loewe_significant.*')
//           .from(subqueryPValueGene)
//           .innerJoin('loewe_significant', function () {
//             this.on('loewe_significant.gene', '=', 't1.gene');
//             this.andOn('loewe_significant.pValue', '=', 't1.minPValue');
//           });
//         break;
//       default:
//         break;
//     }
//     return query.groupBy('gene').as('biomark');
//   }

//   function subqueryDataset() {
//     this.select('gene', 'concordanceIndex', 'pValue', 'name as dataset', 'idDrugA', 'idDrugB')
//       .from(subqueryBiomarkers)
//       .innerJoin('source', 'source.idSource', '=', 'biomark.idSource')
//       .as('DS');
//   }
//   function subqueryDrugA() {
//     this.select('gene', 'concordanceIndex', 'pValue', 'dataset', 'name as drugA', 'idDrugB')
//       .from(subqueryDataset)
//       .innerJoin('drug', 'drug.idDrug', '=', 'DS.idDrugA')
//       .as('D1');
//   }

//   db.select('gene', 'concordanceIndex', 'pValue', 'dataset', 'drugA', 'name as drugB')
//     .from(subqueryDrugA)
//     .innerJoin('drug', 'drug.idDrug', '=', 'D1.idDrugB')
//     .orderBy('pValue')
//     .orderBy('concordanceIndex')
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ message: 'Bad Request' });
//     });
// });
