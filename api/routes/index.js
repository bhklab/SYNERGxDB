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

  // Subquery to link combo designs to respective synergy scores
  function subqueryCD() {
    this.select('*')
      .from('Combo_Design')
      .where({ idSample: sample, idDrugA: drug1, idDrugB: drug2 })
      .as('CD');
  }
  // Subquery to get cell line name(s) and tissue name
  function subqueryS() {
    this.select('idCombo_Design', 'idDrugA', 'idDrugB', 'name as sampleName', 'tissue')
      .from(subqueryCD)
      .join('Sample', 'CD.idSample', '=', 'Sample.idSample')
      .as('S');
  }
  // Subquery to get idDrugA name(s)
  function subqueryD1() {
    this.select('idCombo_Design', 'name as drugNameA', 'idDrugB', 'sampleName', 'tissue')
      .from(subqueryS)
      .join('Drug', 'S.idDrugA', '=', 'Drug.idDrug')
      .as('D1');
  }
  // Subquery to get idDrugB name(s)
  function subqueryD2() {
    this.select('idCombo_Design', 'drugNameA', 'name as drugNameB', 'sampleName', 'tissue')
      .from(subqueryD1)
      .join('Drug', 'D1.idDrugB', '=', 'Drug.idDrug')
      .as('D2');
  }
  // Links synergy scores to existing data
  function subquerySS() {
    this.select('bliss', 'loewe', 'hsa', 'zip', 'idSource', 'sampleName', 'drugNameA', 'drugNameB', 'tissue')
      .from(subqueryD2)
      .join('Synergy_Score', 'D2.idCombo_Design', '=', 'Synergy_Score.idSynergy_Score')
      .as('SS');
  }
  // Adds source name to the results and sends it to the client
  db.select('bliss', 'loewe', 'hsa', 'zip', 'name as sourceName', 'sampleName', 'drugNameA', 'drugNameB', 'tissue')
    .from(subquerySS)
    .join('Source', 'SS.idSource', '=', 'Source.idSource')
    .then((data) => {
      res.json(data);
    });
});


module.exports = router;
