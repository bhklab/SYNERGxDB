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

  // Query to get relevant cell lines that have drug combo for them
  // When sample is a cell line
  function subqueryDrugA() {
    this.select('idDrugA')
      .from('Combo_Design')
      .where({ idSample: sample, idDrugB: drugId })
      .as('a1');
  }
  function subqueryDrugB() {
    this.select('idDrugB')
      .from('Combo_Design')
      .where({ idSample: sample, idDrugA: drugId })
      .as('b1');
  }
  function queryB() {
    this.select('idDrug', 'name').from(subqueryDrugB).join('Drug', 'b1.idDrugB', '=', 'Drug.idDrug');
  }
  db.select('idDrug', 'name').from(subqueryDrugA).join('Drug', 'a1.idDrugA', '=', 'Drug.idDrug')
    .union(queryB)
    .then((drugList) => {
      res.json(drugList);
    });
});


router.post('/getCombos', (req, res, next) => {
  console.log(req.body);

  const { sample, drugId1, drugId2 } = req.body;

  // idDrugA should always be smaller than idDrugB when database is queried
  const drug1 = drugId1 < drugId2 ? drugId1 : drugId2;
  const drug2 = drugId1 < drugId2 ? drugId2 : drugId1;


  function subqueryCD() {
    this.select('idCombo_Design')
      .from('Combo_Design')
      .where({ idSample: sample, idDrugA: drug1, idDrugB: drug2 })
      .as('CD');
  }
  db.select('bliss', 'loewe', 'hsa', 'zip', 'idSource')
    .from(subqueryCD).join('Synergy_Score', 'CD.idCombo_Design', '=', 'Synergy_Score.idSynergy_Score')
    .then((data) => {
      res.json(data);
    });
});


module.exports = router;
