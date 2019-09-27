/* eslint-disable no-lonely-if */
const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  // db('Drug').select('name', 'atcCode', 'idDrugBank', 'idPubChem', 'idDrug')
  // .then((data) => {
  //   res.json(data);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   res.json(err);
  // });

  db.select('Drug.name as name', 'atcCode', 'idDrugBank', 'idPubChem', 'drug.idDrug as idDrug',
    db.raw('group_concat(??) as ??', ['source.name', 'dataset_names']))
    .from('drug', 'drug_source', 'source')
    .join('drug_source', 'drug.idDrug', '=', 'drug_source.idDrug')
    .join('source', 'drug_source.idSource', '=', 'source.idSource')
    .groupBy('name', 'atcCode', 'idDrugBank', 'idPubChem', 'idDrug')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


// Information necessary for ComboDetails component
router.get('/info', (req, res) => {
  const {
    idDrugA, idDrugB,
  } = req.query;
  db('Drug').select('idDrug', 'name', 'idPubChem', 'idDrugBank', 'description')
    .where({ idDrug: idDrugA })
    .orWhere({ idDrug: idDrugB })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get('/mono', (req, res) => {
  let {
    drugId1, drugId2, idSource, idSample,
  } = req.query;

  drugId1 = parseInt(drugId1, 10);
  drugId2 = parseInt(drugId2, 10);
  idSource = parseInt(idSource, 10);
  idSample = parseInt(idSample, 10);
  const drugArray = [drugId1, drugId2];

  console.log(idSample, drugId1, drugId2, idSource, typeof idSource);
  db.select('idDrug', 'aac', 'ic50', 'ec50')
    .from('Mono_summary')
    .where({ idSample, idSource })
    .whereIn('idDrug', drugArray)
    .limit(2)
    .orderBy('idDrug', 'asc')
    .then((monoData) => {
      // standarizes data for client
      const outputArray = monoData;
      switch (outputArray.length) {
        case 0:
          outputArray.push(
            {
              idDrug: drugId1, aac: 0, ec50: 0, ic50: 0,
            },
            {
              idDrug: drugId2, aac: 0, ec50: 0, ic50: 0,
            },
          );
          break;
        case 1:
          // eslint-disable-next-line no-unused-expressions
          outputArray[0].idDrug === drugId1 ? outputArray.push({
            idDrug: drugId2, aac: 0, ec50: 0, ic50: 0,
          }) : outputArray.unshift({
            idDrug: drugId1, aac: 0, ec50: 0, ic50: 0,
          });
          break;
        default:
          break;
      }
      // fetches drug names and sends data to client
      db('Drug').select('name').whereIn('idDrug', drugArray).orderBy('idDrug', 'asc')
        .then((drugData) => {
          drugData.forEach((item, index) => { outputArray[index].drugName = item.name; });
          res.json(outputArray);
        })
        .catch((err) => {
          console.log(err);
          res.json(err);
        });
    });
});

router.post('/', (req, res) => {
  const { sample, dataset, drugId } = req.body;
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
  // query for specific dataset
  function subquerySynergyScore() {
    return this.select('idCombo_Design as idComb')
      .from('Synergy_score')
      .where({ idSource: dataset })
      .as('SS');
  }
  // query for relevent combo design (intermediary step required to filter by source name)
  function subqueryComboDesign() {
    return this.select('idCombo_Design', 'idSample', 'idDrugA', 'idDrugB')
      .from(subquerySynergyScore)
      .join('Combo_Design', 'ss.idComb', '=', 'Combo_Design.idCombo_Design')
      .as('CD');
  }
  // Query to get relevant cell lines that have drug combo for them
  // Checks for all drugs that go after the drugId
  function subqueryDrugA() {
    let baseQuery;
    // Checks if the query cell line or tissue specific/no sample specified
    if (typeof (sample) === 'number') {
      // query with cell line
      if (dataset) {
        // query with dataset
        baseQuery = this.select('idDrugA')
          .from(subqueryComboDesign)
          .where({ idSample: sample, idDrugB: drugId });
      } else {
        // query without dataset
        baseQuery = this.select('idDrugA')
          .from('Combo_Design')
          .where({ idSample: sample, idDrugB: drugId });
      }
    } else {
      // query with tissue
      if (dataset) {
        // query with dataset
        baseQuery = this.select('idDrugA')
          .from(subqueryTissue)
          .where({ idDrugB: drugId })
          .join(subqueryComboDesign, 't.idSample', '=', 'CD.idSample');
      } else {
        // query without dataset
        console.log('tissue + no dataset');
        baseQuery = this.select('idDrugA')
          .from(subqueryTissue)
          .where({ idDrugB: drugId })
          .join('Combo_Design', 't.idSample', '=', 'Combo_Design.idSample');
      }
    }
    return baseQuery.as('a1');
  }
  // Checks for all drugs that go before the drugId (subquery)
  function subqueryDrugB() {
    let baseQuery;
    if (typeof (sample) === 'number') {
      // query with cell line
      if (dataset) {
        // query with dataset
        baseQuery = this.select('idDrugB')
          .from(subqueryComboDesign)
          .where({ idSample: sample, idDrugA: drugId });
      } else {
        // query without dataset
        baseQuery = this.select('idDrugB')
          .from('Combo_Design')
          .where({ idSample: sample, idDrugA: drugId });
      }
    } else {
      if (dataset) {
        // query with dataset
        baseQuery = this.select('idDrugB')
          .from(subqueryTissue)
          .where({ idDrugA: drugId })
          .join(subqueryComboDesign, 't.idSample', '=', 'CD.idSample');
      } else {
        // query without dataset
        baseQuery = this.select('idDrugB')
          .from(subqueryTissue)
          .where({ idDrugA: drugId })
          .join('Combo_Design', 't.idSample', '=', 'Combo_Design.idSample');
      }
    }
    return baseQuery.as('b1');
  }
  // Checks for all drugs that go before the drugId (main query)
  function queryB() {
    this.select('idDrug', 'name').from(subqueryDrugB).join('Drug', 'b1.idDrugB', '=', 'Drug.idDrug');
  }
  db.select('idDrug', 'name').from(subqueryDrugA).join('Drug', 'a1.idDrugA', '=', 'Drug.idDrug')
    .union(queryB)
    .orderBy('name')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get('/:drugId', (req, res) => {
  db.select('name', 'atcCode', 'idDrugBank', 'idPubChem', 'idDrug')
    .from('Drug')
    .where({ idDrug: req.params.drugId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
