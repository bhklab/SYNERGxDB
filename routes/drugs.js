const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db('Drug').select('name', 'atcCode', 'idDrugBank', 'idPubChem', 'idDrug')
    .then((data) => {
      res.json(data);
    });
});

// Information necessary for ComboDetails component
router.get('/info', (req, res) => {
  const {
    idDrugA, idDrugB,
  } = req.query;
  db('Drug').select('name', 'idPubChem', 'idDrugBank', 'description')
    .where({ idDrug: idDrugA })
    .orWhere({ idDrug: idDrugB })
    .then((data) => {
      res.json(data);
    });
});

router.post('/', (req, res) => {
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


module.exports = router;
