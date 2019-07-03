/* eslint-disable func-names */
const express = require('express');
const db = require('../db');

const router = express.Router();


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

router.get('/getCellLines', (req, res) => {
  db('Sample').select('name', 'idSample', 'tissue')
    .then((cellList) => {
      res.json(cellList);
    });
});

router.get('/getDrugs', (req, res) => {
  db('Drug').select('name', 'idDrug')
    .then((drugList) => {
      res.json(drugList);
    });
});


router.post('/getDrugs', (req, res) => {
  const { sample, drugId } = req.body;

  // query to get relevant cell lines
  function subqueryTissue() {
    if (sample) {
      return this.select('idSample')
        .from('Sample')
        .where({ tissue: sample }).as('t');
    }
    // query for all sample
    return this.select('idSample')
      .from('Sample').as('t');
  }
  // Query to get relevant cell lines that have drug combo for them
  // Checks for all drugs that go after the drugId
  function subqueryDrugA() {
    let baseQuery;
    // Checks if the query cell line or tissue specific/no sample specified
    if (typeof (sample) === 'number') {
      // query with cell line
      baseQuery = this.select('idDrugA')
        .from('Combo_Design')
        .where({ idSample: sample, idDrugB: drugId });
    } else {
      // query with tissue
      baseQuery = this.select('idDrugA')
        .from(subqueryTissue)
        .where({ idDrugB: drugId })
        .join('Combo_Design', 't.idSample', '=', 'Combo_Design.idSample');
    }
    return baseQuery.as('a1');
  }
  // Checks for all drugs that go before the drugId (subquery)
  function subqueryDrugB() {
    let baseQuery;
    if (typeof (sample) === 'number') {
      // query with cell line
      baseQuery = this.select('idDrugB')
        .from('Combo_Design')
        .where({ idSample: sample, idDrugA: drugId });
    } else {
      // query with tissue
      baseQuery = this.select('idDrugB')
        .from(subqueryTissue)
        .where({ idDrugA: drugId })
        .join('Combo_Design', 't.idSample', '=', 'Combo_Design.idSample');
    }
    return baseQuery.as('b1');
  }
  // Checks for all drugs that go before the drugId (main query)
  function queryB() {
    this.select('idDrug', 'name').from(subqueryDrugB).join('Drug', 'b1.idDrugB', '=', 'Drug.idDrug');
  }
  db.select('idDrug', 'name').from(subqueryDrugA).join('Drug', 'a1.idDrugA', '=', 'Drug.idDrug')
    .union(queryB)
    .then((drugList) => {
      res.json(drugList);
    });
});


router.post('/getCombos', (req, res) => {
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

// Database call to get data for Plot.js box plots
router.post('/getFPKM', (req, res) => {
  const {
    idSource, idDrugA, idDrugB, gene, interaction,
  } = req.body;

  // Subquery to get list of idSample from idSource, idDrugA, idDrugB
  function subquerySL() {
    const allSample = this.distinct('cd.idSample')
      .from('Combo_Design as cd')
      .join('Synergy_Score as ss', 'cd.idCombo_Design', '=', 'ss.idCombo_Design')
      .where({
        idSource,
        idDrugA,
        idDrugB,
      });
    switch (interaction) {
      case 'SYN':
        return allSample.andWhere('ZIP', '>', 0.2);
      case 'MOD':
        return allSample.andWhere(0.2, '>=', 'ZIP', '>=', 0);
      case 'ANT':
        return allSample.andWhere('ZIP', '<', 0);
    }
  }

  // Subquery to get gene_id from hgnc_symbol
  function subqueryGI() {
    this.select('gene_id')
      .from('gene_identifiers')
      .where({ hgnc_symbol: gene });
  }

  // Select statement to return FPKM
  db.select('rna.FPKM')
    .from('RNAseq as rna')
    .join('model_identifiers as mi', 'rna.model_id', '=', 'mi.model_id')
    .whereIn('idSample', subquerySL)
    .andWhere({ gene_id: subqueryGI })
    .andWhere('rna.FPKM', '>', 0)
    .then((data) => {
      res.json(data);
    });
});

router.post('/getANOVAp', (req, res) => {
  const {
    idSource, idDrugA, idDrugB, gene,
  } = req.body;

  db.select('anova.p')
    .from('anova')
    .where({
      idSource,
      idDrugA,
      idDrugB,
      gene,
    })
    .then((data) => {
      res.json(data);
    });
});

// Route to retrieve list of potential biomarkers
router.post('/getBiomarkers', (req, res) => {
  const { drugId1, drugId2 } = req.body;
  function subqueryAnova() {
    // remove idSource: 2 when more data analyzed (this is a temporary fix)
    this.select('gene', 'p', 'idSource as id')
      .from('anova')
      .where({
        idDrugA: drugId1, idDrugB: drugId2, idSource: 2,
      })
      .orWhere({
        idDrugA: drugId2, idDrugB: drugId1, idSource: 2,
      })
      .orderBy('p', 'desc')
      .limit(10)
      .as('biomarker');
  }
  db.select('gene', 'p', 'idSource', 'name')
    .from(subqueryAnova)
    .join('source', 'source.idSource', '=', 'biomarker.id')
    .then((data) => {
      res.json(data);
    });
});

module.exports = router;
