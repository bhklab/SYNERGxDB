const express = require('express');
const db = require('../db');

const router = express.Router();

/* GET home page. */


router.get('/getCellLines', (req, res, next) => {
  db('Sample').select('name', 'idSample', 'tissue')
    .then((cellList) => {
      res.json(cellList);
    });
});

router.get('/getDrugs', (req, res, next) => {
  db('Drug').select('name', 'idDrug')
    .then((drugList) => {
      res.json(drugList);
    });
});

router.post('/getDrugs', (req, res, next) => {
  console.log(req.body);

  const { sample, drugId } = req.body;
  // Query when sample is a cell line
  db('Combo_Design').select('idDrugB')
    .where({ idSample: sample, idDrugA: drugId })
    .then((drugList) => {
      res.json(drugList);
    });
});

module.exports = router;
