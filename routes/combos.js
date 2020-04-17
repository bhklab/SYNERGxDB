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
    let baseQuery = this.select('idCombo_Design', 'idSample', 'idDrugA', 'idDrugB', 'name as sampleName', 'tissue', 'idCellosaurus', 'sex', 'age', 'disease', 'origin')
      .from(subqueryCD);
      // Tissue specific requests
    if (typeof (sample) === 'string') baseQuery = baseQuery.where({ tissue: sample });
    return baseQuery
      .join('Sample', 'CD.sampleId', '=', 'Sample.idSample')
      .as('S');
  }
  // Subquery to get idDrugA name(s)
  function subqueryD1() {
    this.select('idCombo_Design', 'idSample', 'name as drugNameA', 'idDrugA', 'idDrugB', 'sampleName', 'tissue', 'idCellosaurus', 'sex', 'age', 'disease', 'origin', 'atcCode as atCodeDrugA', 'idDrugBank as idDrugBankA', 'idPubChem as idPubChemDrugA', 'description as descriptionDrugA', 'smiles as smilesDrugA', 'inchikey as inchikeyDrugA')
      .from(subqueryS)
      .join('Drug', 'S.idDrugA', '=', 'Drug.idDrug')
      .as('D1');
  }
  // Subquery to get idDrugB name(s)
  function subqueryD2() {
    this.select('idCombo_Design', 'idSample', 'drugNameA', 'idDrugA', 'name as drugNameB', 'idDrugB', 'sampleName', 'tissue', 'idCellosaurus', 'sex', 'age', 'disease', 'origin', 'atCodeDrugA', 'idDrugBankA', 'idPubChemDrugA', 'descriptionDrugA', 'atcCode as atCodeDrugB', 'idDrugBank as idDrugBankB', 'idPubChem as idPubChemDrugB', 'description as descriptionDrugB', 'smilesDrugA', 'inchikeyDrugA', 'smiles as smilesDrugB', 'inchikey as inchikeyDrugB')
      .from(subqueryD1)
      .join('Drug', 'D1.idDrugB', '=', 'Drug.idDrug')
      .as('D2');
  }
  // Links synergy scores to existing data
  function subquerySS() {
    if (dataset) {
      return this.select('D2.idCombo_Design as comboId', 'idSample', 'bliss', 'loewe', 'hsa', 'zip', 'comboscore', 'sampleName', 'drugNameA', 'drugNameB', 'tissue', 'idSource as sourceId', 'idDrugA', 'idDrugB', 'idCellosaurus', 'sex', 'age', 'disease', 'origin', 'atCodeDrugA', 'idDrugBankA', 'idPubChemDrugA', 'descriptionDrugA', 'atCodeDrugB', 'idDrugBankB', 'idPubChemDrugB', 'descriptionDrugB', 'smilesDrugA', 'inchikeyDrugA', 'smilesDrugB', 'inchikeyDrugB')
        .from(subqueryD2)
        .join('Synergy_Score', 'D2.idCombo_Design', '=', 'Synergy_Score.idCombo_Design')
        .where({ idSource: dataset })
        .as('SS');
    }
    return this.select('D2.idCombo_Design as comboId', 'idSample', 'bliss', 'loewe', 'hsa', 'zip', 'comboscore', 'sampleName', 'drugNameA', 'drugNameB', 'tissue', 'idSource as sourceId', 'idDrugA', 'idDrugB', 'idCellosaurus', 'sex', 'age', 'disease', 'origin', 'atCodeDrugA', 'idDrugBankA', 'idPubChemDrugA', 'descriptionDrugA', 'atCodeDrugB', 'idDrugBankB', 'idPubChemDrugB', 'descriptionDrugB', 'smilesDrugA', 'inchikeyDrugA', 'smilesDrugB', 'inchikeyDrugB')
      .from(subqueryD2)
      .join('Synergy_Score', 'D2.idCombo_Design', '=', 'Synergy_Score.idCombo_Design')
      .as('SS');
  }
  // Adds source name to the results and sends it to the client
  db.select('comboId', 'idSample', 'bliss', 'loewe', 'hsa', 'zip', 'comboscore', 'name as sourceName', 'sampleName', 'drugNameA', 'drugNameB', 'tissue', 'idSource', 'idDrugA', 'idDrugB', 'idCellosaurus', 'sex', 'age', 'disease', 'origin', 'atCodeDrugA', 'idDrugBankA', 'idPubChemDrugA', 'descriptionDrugA', 'atCodeDrugB', 'idDrugBankB', 'idPubChemDrugB', 'descriptionDrugB', 'smilesDrugA', 'inchikeyDrugA', 'smilesDrugB', 'inchikeyDrugB')
    .from(subquerySS)
    .join('Source', 'SS.sourceId', '=', 'Source.idSource')
    .orderBy('zip', 'desc')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

router.get('/matrix', (req, res) => {
  let { comboId, idSource } = req.query;
  comboId = parseInt(comboId, 10);
  idSource = parseInt(idSource, 10);
  db.select('concA', 'concB', 'raw_matrix', 'bliss_matrix', 'loewe_matrix', 'hsa_matrix', 'zip_matrix', 'combo_score')
    .from('combo_matrix')
    .where({ idCombo_Design: comboId, idSource })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

router.get('/stats', (req, res) => {
  // COMBOS
  function subqueryCombos() {
    const baseQuery = this.select('idSource', db.raw('count(distinct concat(??, ?, ??)) as ??', ['CD.idDrugA', '--', 'CD.idDrugB', 'nCombos']))
      .from('Combo_Design as CD')
      .innerJoin('Synergy_Score as SS', 'CD.idCombo_Design', '=', 'SS.idCombo_Design')
      .groupBy('SS.idSource');

    return baseQuery.as('CMBS');
  }

  // EXPERIMENTS
  function subqueryExperiments() {
    const baseQuery = this.select('idSource', db.raw('count(*) as ??', ['nExperiments']))
      .from('Synergy_Score')
      .groupBy('idSource');

    return baseQuery.as('EXPS');
  }

  // major query + DATAPOINTS
  db.select('CM.idSource as idSource', 'name', db.raw('count(*) as ??', ['nDatapoints']), 'nCombos', 'nExperiments')
    .from('Combo_Matrix as CM', subqueryCombos)
    .join(subqueryCombos, 'CM.idSource', '=', 'CMBS.idSource')
    .join(subqueryExperiments, 'CM.idSource', '=', 'EXPS.idSource')
    .join('Source', 'CM.idSource', '=', 'Source.idSource')
    .groupBy('idSource', 'nCombos', 'nExperiments')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

router.get('/heatmap', (req, res) => {
  let {
    drugId1, drugId2,
  } = req.query;

  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);


  // getting all data
  let query = db.select('cd.idSample AS idSample', 'sa.name AS sample', 'so.name AS source', 'idDrugA', 'idDrugB', db.raw('left(??,12) AS ??', ['d.name', 'drugNameA']), db.raw('left(??,12) AS ??', ['dd.name', 'drugNameB']), 'zip', 'bliss', 'loewe', 'hsa')
    .from('combo_design AS cd')
    .join('synergy_score AS ss', 'ss.idCombo_Design', 'cd.idCombo_Design')
    .join('drug AS d', 'idDrugA', 'd.idDrug')
    .join('drug AS dd', 'idDrugB', 'dd.idDrug')
    .join('sample AS sa', 'cd.idSample', 'sa.idSample')
    .join('source AS so', 'ss.idSource', 'so.idSource');

  // query builder for different number of drugs
  if (drugId1) {
    query = query.where({ idDrugA: drugId1 })
      .orWhere({ idDrugB: drugId1 });
  }
  if (drugId2) {
    query = query.orWhere({ idDrugA: drugId2 })
      .orWhere({ idDrugB: drugId2 });
  }

  query
    .orderBy('idDrugA', 'idDrugB')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

module.exports = router;
