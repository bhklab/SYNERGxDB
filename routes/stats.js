const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/stats', (req, res) => {
  const responseObject = {};
  const getCellsAndTissues = new Promise((resolve, reject) => {
    db('sample')
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
    db('combo_design')
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
    db('combo_matrix')
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
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

module.exports = router;
