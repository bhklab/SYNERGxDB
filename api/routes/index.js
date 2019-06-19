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

  function subquery() {
    this.select('idDrugB')
      .from('Combo_Design')
      .where({ idSample: sample, idDrugA: drugId })
      .as('t1');
  }
  db.select('idDrug', 'name').from(subquery).join('Drug', 't1.idDrugB', '=', 'Drug.idDrug')
    .as('t2')
    .then((drugList) => {
      res.json(drugList);
    });
  // db('Drug').select('idDrug', 'name').join(() => {
  //     this.select('idDrugB')
  //       .from('Combo_Design')
  //       .where({ idSample: sample, idDrugA: drugId })
  //       .as('t1');
  //   }).join('Drug', 't1.idDrugB', '=', 'Drug.idDrug')
  //     .as('t2')
  //     .then((drugList) => {
  //       res.json(drugList);
  //     });
});

module.exports = router;
