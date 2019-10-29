const express = require('express');
const db = require('../db');

const router = express.Router();

// Route to retrieve list of potential biomarkers
router.get('/', (req, res) => {
  const { drugId1, drugId2 } = req.query;
  console.log(drugId1, drugId2);
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
  let { sample } = req.query;
  const { gene } = req.query;
  sample = Number.isNaN(parseInt(sample, 10)) ? sample : parseInt(sample, 10);
  function subqueryGeneIdentifier() {
    this.select('gene_id')
      .from('gene_identifiers')
      .where({ hgnc_symbol: gene });
  }
  function subquerySamples() {
    let subquery = this.select('model_id', 'name', 'model_identifiers.idSample as idSample')
      .from('sample');

    if (typeof (sample) !== 'number') {
      subquery = subquery
        .join('model_identifiers', 'model_identifiers.idSample', '=', 'sample.idSample')
        .where({ tissue: sample });
    }
    if (typeof (sample) === 'number') {
      subquery = subquery
        .join('model_identifiers', 'model_identifiers.idSample', '=', 'sample.idSample')
        .where({ 'sample.idSample': sample });
    }
    return subquery.as('S');
  }
  function subqueryAssociations() {
    this.select('model_id', 'fpkm')
      .from('rnaseq')
      .where('gene_id', 'in', subqueryGeneIdentifier)
      .as('A');
  }
  db.select('idSample', 'fpkm', 'name')
    .from(subqueryAssociations)
    .join(subquerySamples, 'A.model_id', '=', 'S.model_id')
    .orderBy('idSample', 'asc')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Database call to get data for Plot.js box plots
router.post('/fpkm', (req, res) => {
  const {
    idSource, idDrugA, idDrugB, gene, interaction,
  } = req.body;
  // Subquery to get list of idSample from idSource, idDrugA, idDrugB
  function subquerySL() {
    const allSample = this.distinct('cd.idSample')
      .from('Combo_Design as cd')
      .join('Synergy_Score as ss', 'cd.idCombo_Design', '=', 'ss.idCombo_Design')
      .where({
        idSource,
        idDrugA,
        idDrugB,
      });
    let subQuery;
    switch (interaction) {
      case 'SYN':
        subQuery = allSample.andWhere('ZIP', '>', 0.2);
        break;
      case 'MOD':
        subQuery = allSample.andWhere(0.2, '>=', 'ZIP', '>=', 0);
        break;
      case 'ANT':
        subQuery = allSample.andWhere('ZIP', '<', 0);
        break;
      default:
        break;
    }
    return subQuery;
  }

  // Subquery to get gene_id from hgnc_symbol
  function subqueryGI() {
    this.select('gene_id')
      .from('gene_identifiers')
      .where({ hgnc_symbol: gene });
  }

  // Select statement to return FPKM
  db.select('rna.FPKM')
    .from('RNAseq as rna')
    .join('model_identifiers as mi', 'rna.model_id', '=', 'mi.model_id')
    .whereIn('idSample', subquerySL)
    .andWhere({ gene_id: subqueryGI })
    .andWhere('rna.FPKM', '>', 0)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

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
