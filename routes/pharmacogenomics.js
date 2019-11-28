/* eslint-disable func-names */
const express = require('express');
const db = require('../db');

const router = express.Router();

// retrieves list of genes for the search list
router.get('/genes', (req, res) => {
  const {
    profile,
  } = req.query;
  let query;
  switch (profile) {
    case 'rnaseq':
      console.log('rnaseq');
      query = db.select('hgnc_symbol as gene', 'gene_id').from('gene_identifiers');
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
    profile,
  } = req.query;

  function subqueryProfile() {
    switch (profile) {
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
    .whereIn('idSample', subqueryProfile)
    .orderBy('name')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
