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
      res.json(err);
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
      res.json(err);
    });
});

router.get('/metabolomics', (req, res) => {
  const { molecule, sample } = req.query;
  let {
    drugId1, drugId2,
  } = req.query;
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);

  console.log(sample);
  let sampleArray;
  if (sample) {
    sampleArray = sample.includes(',')
      ? sample.split(',').map(item => parseInt(item, 10))
      : [Number.isNaN(parseInt(sample, 10)) ? sample : parseInt(sample, 10)];
  }
  res.json({ message: 'Success' });
});

module.exports = router;
