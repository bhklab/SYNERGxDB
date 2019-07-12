const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/datasets', (req, res, next) => {
  const {
    idSource,
  } = req.query;
  const baseQuery = db('Source')
    .select();

  if (idSource) {
    baseQuery
      .first()
      .where({ idSource })
      .then((data) => {
        res.json(data);
      });
  } else {
    baseQuery
    // This condition should be removed later
      .whereNot({ name: 'AstraZeneca' })
      .orderBy([
        { column: 'no_samples', order: 'desc' },
        { column: 'no_drugs', order: 'desc' },
      ])
      .then((data) => {
        res.json(data);
      });
  }
});

router.get('/stats', (req, res) => {
  const responseObject = {};
  const getCellsAndTissues = new Promise((resolve, reject) => {
    db('Sample')
      .count('idSample as cells')
      .countDistinct('tissue as tissues')
      .then((data) => {
        const { cells, tissues } = data[0];
        responseObject.cells = cells;
        responseObject.tissues = tissues;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
  const getCombinations = new Promise((resolve, reject) => {
    db.raw('select count(distinct idDrugA, idDrugB) as combos from combo_design')
      .then((rawData) => {
        responseObject.combos = rawData[0][0].combos;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
  const getExperiments = new Promise((resolve, reject) => {
    db('Combo_design')
      .count('idCombo_Design as experiments')
      .then((data) => {
        responseObject.experiments = data[0].experiments;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
  const getDatapoints = new Promise((resolve, reject) => {
    db('Combo_matrix')
      .count('idCombo_Matrix as datapoints')
      .then((data) => {
        responseObject.datapoints = data[0].datapoints;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
  // Process all database requests in parallel
  const databaseQueries = [getCellsAndTissues, getCombinations, getExperiments, getDatapoints];
  return Promise.all(databaseQueries)
    .then(() => {
      console.log(responseObject);
      res.json(responseObject);
    })
    .catch(err => console.log(err));
});

module.exports = router;
