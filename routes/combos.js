/* eslint-disable max-len */
/* eslint-disable func-names */
const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  let {
    sample, drugId1, drugId2, dataset,
  } = req.query;
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  dataset = dataset && parseInt(dataset, 10);
  sample = Number.isNaN(parseInt(sample, 10)) ? sample : parseInt(sample, 10);
  // Subquery to link combo designs to respective synergy scores
  function subqueryCD() {
    let baseQuery = this.select('idCombo_Design', 'idDrugA', 'idDrugB', 'idSample as sampleId')
      .from('Combo_Design');

    // Checks type of the request and modifies the query accordingly
    // Query builder when drug(s) are given
    if (drugId1) {
      if (typeof (sample) === 'number') {
        // Subquery to include all possible idDrugA and idDrugB combinations
        baseQuery = baseQuery.where(function () {
          return drugId2 ? this.andWhere({ idDrugA: drugId1, idDrugB: drugId2, idSample: sample }) : this.andWhere({ idDrugA: drugId1, idSample: sample });
        })
          .orWhere(function () {
            return drugId2 ? this.where({ idDrugA: drugId2, idDrugB: drugId1, idSample: sample }) : this.andWhere({ idDrugB: drugId1, idSample: sample });
          });
      } else {
        baseQuery = baseQuery.where(function () {
          return drugId2 ? this.andWhere({ idDrugA: drugId1, idDrugB: drugId2 }) : this.andWhere({ idDrugA: drugId1 });
        })
          .orWhere(function () {
            return drugId2 ? this.where({ idDrugA: drugId2, idDrugB: drugId1 }) : this.where({ idDrugB: drugId1 });
          });
      }
    } else if (typeof (sample) === 'number') {
      baseQuery = baseQuery.where({ idSample: sample });
    }

    return baseQuery.as('CD');
  }
  // Subquery to get cell line name(s) and tissue name
  function subqueryS() {
    let baseQuery = this.select('idCombo_Design', 'idSample', 'idDrugA', 'idDrugB', 'name as sampleName', 'tissue')
      .from(subqueryCD);
      // Tissue specific requests
    if (typeof (sample) === 'string') baseQuery = baseQuery.where({ tissue: sample });
    return baseQuery
      .join('Sample', 'CD.sampleId', '=', 'Sample.idSample')
      .as('S');
  }
  // Subquery to get idDrugA name(s)
  function subqueryD1() {
    this.select('idCombo_Design', 'idSample', 'name as drugNameA', 'idDrugA', 'idDrugB', 'sampleName', 'tissue')
      .from(subqueryS)
      .join('Drug', 'S.idDrugA', '=', 'Drug.idDrug')
      .as('D1');
  }
  // Subquery to get idDrugB name(s)
  function subqueryD2() {
    this.select('idCombo_Design', 'idSample', 'drugNameA', 'idDrugA', 'name as drugNameB', 'idDrugB', 'sampleName', 'tissue')
      .from(subqueryD1)
      .join('Drug', 'D1.idDrugB', '=', 'Drug.idDrug')
      .as('D2');
  }
  // Links synergy scores to existing data
  function subquerySS() {
    if (dataset) {
      return this.select('D2.idCombo_Design as comboId', 'idSample', 'bliss', 'loewe', 'hsa', 'zip', 'sampleName', 'drugNameA', 'drugNameB', 'tissue', 'idSource as sourceId', 'idDrugA', 'idDrugB')
        .from(subqueryD2)
        .join('Synergy_Score', 'D2.idCombo_Design', '=', 'Synergy_Score.idCombo_Design')
        .where({ idSource: dataset })
        .as('SS');
    }
    return this.select('D2.idCombo_Design as comboId', 'idSample', 'bliss', 'loewe', 'hsa', 'zip', 'sampleName', 'drugNameA', 'drugNameB', 'tissue', 'idSource as sourceId', 'idDrugA', 'idDrugB')
      .from(subqueryD2)
      .join('Synergy_Score', 'D2.idCombo_Design', '=', 'Synergy_Score.idCombo_Design')
      .as('SS');
  }
  // Adds source name to the results and sends it to the client
  db.select('comboId', 'idSample', 'bliss', 'loewe', 'hsa', 'zip', 'name as sourceName', 'sampleName', 'drugNameA', 'drugNameB', 'tissue', 'idSource', 'idDrugA', 'idDrugB')
    .from(subquerySS)
    .join('Source', 'SS.sourceId', '=', 'Source.idSource')
    .orderBy('zip', 'desc')
    .then((data) => {
      res.json(data);
    });
});

router.get('/matrix', (req, res) => {
  let { comboId, idSource } = req.query;
  comboId = parseInt(comboId, 10);
  idSource = parseInt(idSource, 10);
  console.log(comboId, idSource);
  db.select('concA', 'concB', 'raw_matrix', 'bliss_matrix', 'loewe_matrix', 'hsa_matrix', 'zip_matrix', 'idSource')
    .from('Combo_matrix')
    .where({ idCombo_Design: comboId, idSource })
    .then(data => res.json(data));
});


module.exports = router;
