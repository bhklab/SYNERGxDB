/* eslint-disable func-names */
const express = require('express');
const db = require('../db');

const router = express.Router();

// retrieves list of genes for the search list
router.get('/genes', (req, res) => {
  res.json({ message: 'List of genes' });
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
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
