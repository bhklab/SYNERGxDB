/* eslint-disable func-names */
const express = require('express');
const db = require('../db');

const router = express.Router();

// retrieves list of genes for the search list
router.get('/genes', (req, res) => {
  const {
    datatype,
  } = req.query;
  let query;
  switch (datatype) {
    case 'rnaseq':
      console.log('rnaseq');
      query = db.select('hgnc_symbol as gene').from('gene_identifiers');
      break;
    case 'mutation':
      console.log('mutation');
      query = db.distinct('Hugo_Symbol as gene').from('mutations');
      break;
    case 'cna':
      console.log('cna');
      query = db.distinct('gene').from('copynumber');
      break;
    default:
      res.status(404).json({ message: 'Profile is not selected correctly' });
  }
  if (query) query.orderBy('gene').then(data => res.json(data));
});

// retrieves list of biological molecules for the search list
router.get('/molecules', (req, res) => {
  db('metabolomics')
    .columnInfo()
    .then((data) => {
      const listOfMolecules = Object.keys(data).map(item => item);
      listOfMolecules.splice(0, 3);
      res.json(listOfMolecules);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

// retrieves list of relevant samples for the search list
router.get('/samples', (req, res) => {
  const {
    datatype,
  } = req.query;

  function subqueryDatatype() {
    switch (datatype) {
      case 'metabolomic':
        return this.select('idSample').from('metabolomics');
      case 'rnaseq':
        return this.select('idSample').from('model_identifiers');
      case 'mutation':
        return this.distinct('idSample').from('mutations');
      case 'cna':
        return this.distinct('idSample').from('copynumber');
      default:
        throw new Error({ code: 400, message: 'Profile is not selected correctly' });
    }
  }
  db.select('idSample', 'name', 'tissue')
    .from('sample')
    .whereIn('idSample', subqueryDatatype)
    .orderBy('name')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

router.get('/metabolomics', async (req, res) => {
  let { drugId1, drugId2 } = req.query;
  const { molecule, sample } = req.query;
  if (!drugId1 || !drugId2 || !molecule) {
    return res.status(400).json({ error: 'Request must contain drugId1, drugId2 and molecule query parameters' });
  }
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  if (!drugId1 || !drugId2) {
    return res.status(400).json({ error: 'drugId1 and drugId2 query parameters must be integers' });
  }

  let sampleArray;
  if (sample) {
    sampleArray = sample.includes(',')
      ? sample.split(',').map(item => parseInt(item, 10))
      : [Number.isNaN(parseInt(sample, 10)) ? sample : parseInt(sample, 10)];
  }

  function subqueryComboDesign() {
    this.select('idSample', 'idCombo_Design')
      .from('combo_design')
      .where(function () {
        const query = this.where({ idDrugA: drugId1, idDrugB: drugId2 });
        return sample ? query.whereIn('idSample', sampleArray) : query;
      })
      .orWhere(function () {
        const query = this.where({ idDrugA: drugId2, idDrugB: drugId1 });
        return sample ? query.whereIn('idSample', sampleArray) : query;
      })
      .as('CD');
  }

  function subquerySynergyScores() {
    this.select('idSample', 'bliss', 'hsa', 'zip', 'loewe')
      .from(subqueryComboDesign)
      .join('synergy_score', 'synergy_score.idCombo_Design', '=', 'CD.idCombo_Design')
      .as('SS');
  }

  function subqueryMetabolomics() {
    const query = this.select(molecule, 'idSample')
      .from('metabolomics');
    return sample ? query.whereIn('idSample', sampleArray).as('M') : query.as('M');
  }

  function subqueryBiomarkerData() {
    this.select('SS.idSample', 'bliss', 'hsa', 'zip', 'loewe', molecule)
      .from(subqueryMetabolomics)
      .join(subquerySynergyScores, 'M.idSample', '=', 'SS.idSample')
      .as('BD');
  }

  try {
    const data = await db.select(molecule, 'name as cellName', 'bliss', 'hsa', 'zip', 'loewe')
      .from(subqueryBiomarkerData)
      .join('sample', 'sample.idSample', '=', 'BD.idSample');
    if (data.length === 0) return res.status(404).json({ message: 'No data found for a given set of parameters' });
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Unknown error has occured while processing request' });
  }
});


router.get('/cna', async (req, res) => {
  const { gene, sample } = req.query;
  let { drugId1, drugId2 } = req.query;
  if (!drugId1 || !drugId2 || !gene) {
    return res.status(400).json({ error: 'Request must contain drugId1, drugId2 and gene query parameters' });
  }
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  if (!drugId1 || !drugId2) {
    return res.status(400).json({ error: 'drugId1 and drugId2 query parameters must be integers' });
  }
  let sampleArray;
  if (sample) {
    sampleArray = sample.includes(',')
      ? sample.split(',').map(item => parseInt(item, 10))
      : [Number.isNaN(parseInt(sample, 10)) ? sample : parseInt(sample, 10)];
  }

  function subqueryComboDesign() {
    this.select('idSample', 'idCombo_Design')
      .from('combo_design')
      .where(function () {
        const query = this.where({ idDrugA: drugId1, idDrugB: drugId2 });
        return sample ? query.whereIn('idSample', sampleArray) : query;
      })
      .orWhere(function () {
        const query = this.where({ idDrugA: drugId2, idDrugB: drugId1 });
        return sample ? query.whereIn('idSample', sampleArray) : query;
      })
      .as('CD');
  }

  function subquerySynergyScores() {
    this.select('idSample', 'bliss', 'hsa', 'zip', 'loewe')
      .from(subqueryComboDesign)
      .join('synergy_score', 'synergy_score.idCombo_Design', '=', 'CD.idCombo_Design')
      .as('SS');
  }

  function subqueryCopyNumber() {
    const query = this.select('cn', 'idSample')
      .from('copynumber')
      .where({ gene });
    return sample ? query.whereIn('idSample', sampleArray).as('CN') : query.as('CN');
  }
  function subqueryBiomarkerData() {
    this.select('SS.idSample', 'bliss', 'hsa', 'zip', 'loewe', 'cn')
      .from(subqueryCopyNumber)
      .join(subquerySynergyScores, 'CN.idSample', '=', 'SS.idSample')
      .as('BD');
  }

  try {
    const data = await db.select('cn', 'name as cellName', 'bliss', 'hsa', 'zip', 'loewe')
      .from(subqueryBiomarkerData)
      .join('sample', 'sample.idSample', '=', 'BD.idSample');
    if (data.length === 0) return res.status(404).json({ message: 'No data found for a given set of parameters' });
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Unknown error has occured while processing request' });
  }
});

module.exports = router;
