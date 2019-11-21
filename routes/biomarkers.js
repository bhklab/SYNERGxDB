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
      res.json(err);
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
  function subqueryGeneIdentifier() {
    this.select('gene_id')
      .from('gene_identifiers')
      .where({ hgnc_symbol: gene });
  }
  function subquerySamples() {
    let subquery = this.select('model_id', 'name', 'model_identifiers.idSample as idSample')
      .from('sample');
    if (typeof (sample) === 'string') {
      subquery = subquery
        .join('model_identifiers', 'model_identifiers.idSample', '=', 'sample.idSample')
        .where({ tissue: sample });
    } else {
      subquery = subquery
        .join('model_identifiers', 'model_identifiers.idSample', '=', 'sample.idSample');
    }
    return subquery.as('S');
  }
  function subqueryFPKM() {
    this.select('model_id', 'fpkm')
      .from('rnaseq')
      .where('gene_id', 'in', subqueryGeneIdentifier)
      .as('FPKM');
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
      res.json(err);
    });
});

// Retrieves data for the biomarker table
router.get('/synergy', (req, res) => {
  const { type } = req.query;
  if (!type || !(type === 'zip' || type === 'bliss' || type === 'hsa' || type === 'loewe')) {
    res.json({ message: 'Synergy type is not specified correctly' });
    return;
  }

  let {
    dataset, drugId1, drugId2,
  } = req.query;
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  dataset = dataset && parseInt(dataset, 10);

  function drugFiltering() {
    if (drugId2) {
      return this.where({ idDrugA: drugId1, idDrugB: drugId2 })
        .orWhere({ idDrugB: drugId1, idDrugA: drugId2 });
    }
    return this.where({ idDrugA: drugId1 })
      .orWhere({ idDrugB: drugId1 });
  }

  function subqueryPValueGene() {
    let subquery = this.select('gene').min('pValue as minPValue');
    switch (type) {
      case 'zip':
        subquery = subquery.from('zip_significant');
        break;
      case 'bliss':
        subquery = subquery.from('bliss_significant');
        break;
      case 'hsa':
        subquery = subquery.from('hsa_significant');
        break;
      case 'loewe':
        subquery = subquery.from('loewe_significant');
        break;
      default:
        break;
    }
    if (drugId1) subquery = subquery.where(drugFiltering);
    if (dataset) subquery = subquery.andWhere({ idSource: dataset });
    return subquery.groupBy('gene').as('t1');
  }

  function subqueryBiomarkers() {
    let query;
    switch (type) {
      case 'zip':
        query = this.select('zip_significant.*')
          .from(subqueryPValueGene)
          .innerJoin('zip_significant', function () {
            this.on('zip_significant.gene', '=', 't1.gene');
            this.andOn('zip_significant.pValue', '=', 't1.minPValue');
          });
        break;
      case 'bliss':
        query = this.select('bliss_significant.*')
          .from(subqueryPValueGene)
          .innerJoin('bliss_significant', function () {
            this.on('bliss_significant.gene', '=', 't1.gene');
            this.andOn('bliss_significant.pValue', '=', 't1.minPValue');
          });
        break;
      case 'hsa':
        query = this.select('hsa_significant.*')
          .from(subqueryPValueGene)
          .innerJoin('hsa_significant', function () {
            this.on('hsa_significant.gene', '=', 't1.gene');
            this.andOn('hsa_significant.pValue', '=', 't1.minPValue');
          });
        break;
      case 'loewe':
        query = this.select('loewe_significant.*')
          .from(subqueryPValueGene)
          .innerJoin('loewe_significant', function () {
            this.on('loewe_significant.gene', '=', 't1.gene');
            this.andOn('loewe_significant.pValue', '=', 't1.minPValue');
          });
        break;
      default:
        break;
    }
    return query.groupBy('gene').as('biomark');
  }

  function subqueryDataset() {
    this.select('gene', 'concordanceIndex', 'pValue', 'name as dataset', 'idDrugA', 'idDrugB')
      .from(subqueryBiomarkers)
      .innerJoin('source', 'source.idSource', '=', 'biomark.idSource')
      .as('DS');
  }
  function subqueryDrugA() {
    this.select('gene', 'concordanceIndex', 'pValue', 'dataset', 'name as drugA', 'idDrugB')
      .from(subqueryDataset)
      .innerJoin('drug', 'drug.idDrug', '=', 'DS.idDrugA')
      .as('D1');
  }

  db.select('gene', 'concordanceIndex', 'pValue', 'dataset', 'drugA', 'name as drugB')
    .from(subqueryDrugA)
    .innerJoin('drug', 'drug.idDrug', '=', 'D1.idDrugB')
    .orderBy('pValue')
    .orderBy('concordanceIndex')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// db.select(
//   'zip.idSource as idSource',
//   'zip.idDrugA as idDrugA',
//   'zip.idDrugB as idDrugB',
//   'zip.gene as gene',
//   'zip.concordanceIndex as concordanceIndex',
//   'zip.pValue as pValue',
// );

// Database call to get data for Plot.js box plots
// router.post('/fpkm', (req, res) => {
//   const {
//     idSource, idDrugA, idDrugB, gene, interaction,
//   } = req.body;
//   // Subquery to get list of idSample from idSource, idDrugA, idDrugB
//   function subquerySL() {
//     const allSample = this.distinct('cd.idSample')
//       .from('Combo_Design as cd')
//       .join('Synergy_Score as ss', 'cd.idCombo_Design', '=', 'ss.idCombo_Design')
//       .where({
//         idSource,
//         idDrugA,
//         idDrugB,
//       });
//     let subQuery;
//     switch (interaction) {
//       case 'SYN':
//         subQuery = allSample.andWhere('ZIP', '>', 0.2);
//         break;
//       case 'MOD':
//         subQuery = allSample.andWhere(0.2, '>=', 'ZIP', '>=', 0);
//         break;
//       case 'ANT':
//         subQuery = allSample.andWhere('ZIP', '<', 0);
//         break;
//       default:
//         break;
//     }
//     return subQuery;
//   }

//   // Subquery to get gene_id from hgnc_symbol
//   function subqueryGI() {
//     this.select('gene_id')
//       .from('gene_identifiers')
//       .where({ hgnc_symbol: gene });
//   }

//   // Select statement to return FPKM
//   db.select('rna.FPKM')
//     .from('RNAseq as rna')
//     .join('model_identifiers as mi', 'rna.model_id', '=', 'mi.model_id')
//     .whereIn('idSample', subquerySL)
//     .andWhere({ gene_id: subqueryGI })
//     .andWhere('rna.FPKM', '>', 0)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json(err);
//     });
// });


// // Route to retrieve list of potential biomarkers
// router.post('/', (req, res) => {
//   const { drugId1, drugId2, dataset } = req.body;


//   function subqueryAnova() {
//     // remove idSource: 2 when more data analyzed (this is a temporary fix)
//     let baseQuery = this.select('gene', 'p', 'idSource as id')
//       .from('anova');
//     if (dataset) {
//       baseQuery = baseQuery.where({
//         idDrugA: drugId1, idDrugB: drugId2, idSource: dataset,
//       })
//         .orWhere({
//           idDrugA: drugId2, idDrugB: drugId1, idSource: dataset,
//         });
//     } else {
//       baseQuery = baseQuery.where({
//         idDrugA: drugId1, idDrugB: drugId2, idSource: 2,
//       })
//         .orWhere({
//           idDrugA: drugId2, idDrugB: drugId1, idSource: 2,
//         });
//     }
//     return baseQuery.orderBy('p', 'desc')
//       .limit(10)
//       .as('biomarker');
//   }
//   db.select('gene', 'p', 'idSource', 'name')
//     .from(subqueryAnova)
//     .join('source', 'source.idSource', '=', 'biomarker.id')
//     .then((data) => {
//       res.json(data);
//     });
// });


module.exports = router;
