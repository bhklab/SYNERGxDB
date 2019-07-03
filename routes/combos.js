/* eslint-disable func-names */
const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
  const { sample, drugId1, drugId2 } = req.body;

  // Subquery to link combo designs to respective synergy scores
  function subqueryCD() {
    let baseQuery = this.select('*')
      .from('Combo_Design');

    // Checks type of the request and modifies the query accordingly
    if (typeof (sample) === 'number') baseQuery = baseQuery.where({ idSample: sample });
    // Checks if drugId2 is set to 'Any'
    if (typeof (drugId2) === 'number') {
      // Subquery to include all possible idDrugA and idDrugB combinations
      baseQuery = baseQuery.andWhere(function () {
        this.where({ idDrugA: drugId1, idDrugB: drugId2 });
      })
        .orWhere(function () {
          this.where({ idDrugA: drugId2, idDrugB: drugId1 });
        });
    } else {
      baseQuery = baseQuery.where({ idDrugA: drugId1 });
    }

    return baseQuery.as('CD');
  }
  // Subquery to get cell line name(s) and tissue name
  function subqueryS() {
    let baseQuery = this.select('idCombo_Design', 'idDrugA', 'idDrugB', 'name as sampleName', 'tissue')
      .from(subqueryCD);
      // Tissue specific requests
    if (typeof (sample) === 'string') baseQuery = baseQuery.where({ tissue: sample });
    return baseQuery
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
