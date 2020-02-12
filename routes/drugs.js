/* eslint-disable func-names */
/* eslint-disable no-lonely-if */
const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
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
      res.status(400).json({ message: 'Bad Request' });
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
      res.status(400).json({ message: 'Bad Request' });
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
          res.status(400).json({ message: 'Bad Request' });
        });
    });
});

router.get('/filter', (req, res) => {
  console.log('Drug filtering');
  let {
    dataset, drugId,
  } = req.query;
  const { sample } = req.query;
  drugId = drugId && parseInt(drugId, 10);
  dataset = dataset && parseInt(dataset, 10);

  console.log(sample);
  let sampleArray;
  let tissue;
  if (sample) {
    sampleArray = sample.includes(',')
      ? sample.split(',').map(item => parseInt(item, 10))
      : [Number.isNaN(parseInt(sample, 10)) ? sample : parseInt(sample, 10)];
    if (Number.isNaN(parseInt(sampleArray[0], 10))) [tissue] = sampleArray;
  }
  console.log(dataset, drugId, sample);
  // query to get relevant cell lines
  function subqueryTissue() {
    return this.select('idSample')
      .from('Sample')
      .where({ tissue }).as('t');
  }
  // Checks all drug A entries
  function subqueryDrugA() {
    let baseQuery = this.distinct('idDrugA');
    if (tissue) {
      baseQuery = baseQuery.from(subqueryTissue);
      if (drugId) baseQuery = baseQuery.where({ idDrugB: drugId });
      if (dataset) {
        baseQuery = baseQuery.whereIn('idDrugA', function () {
          this.select('idDrug').from('drug_source').where({ idSource: dataset });
        });
      }
      baseQuery = baseQuery.join('Combo_Design', 't.idSample', '=', 'Combo_Design.idSample');
    } else {
      baseQuery = baseQuery.from('Combo_Design');
      if (dataset) {
        baseQuery = baseQuery.whereIn('idDrugA', function () {
          this.select('idDrug').from('drug_source').where({ idSource: dataset });
        });
      }
      if (drugId) baseQuery = baseQuery.where({ idDrugB: drugId });
      if (sampleArray && !tissue) baseQuery = baseQuery.whereIn('idSample', sampleArray);
    }
    return baseQuery.as('a1');
  }
  // Checks all drug B entries
  function subqueryDrugB() {
    let baseQuery = this.distinct('idDrugB');
    if (tissue) {
      baseQuery = baseQuery.from(subqueryTissue);
      if (drugId) baseQuery = baseQuery.where({ idDrugA: drugId });
      if (dataset) {
        baseQuery = baseQuery.whereIn('idDrugB', function () {
          this.select('idDrug').from('drug_source').where({ idSource: dataset });
        });
      }
      baseQuery = baseQuery.join('Combo_Design', 't.idSample', '=', 'Combo_Design.idSample');
    } else {
      baseQuery = baseQuery.from('Combo_Design');
      if (dataset) {
        baseQuery = baseQuery.whereIn('idDrugB', function () {
          this.select('idDrug').from('drug_source').where({ idSource: dataset });
        });
      }
      if (drugId) baseQuery = baseQuery.where({ idDrugA: drugId });
      if (sampleArray && !tissue) baseQuery = baseQuery.whereIn('idSample', sampleArray);
    }
    return baseQuery.as('b1');
  }

  // Checks for all drugs that go before the drugId (main query)
  function queryB() {
    this.select('idDrug', 'name').from(subqueryDrugB).join('Drug', 'b1.idDrugB', '=', 'Drug.idDrug');
  }
  // query optimization for dataset only requests
  let query;
  if (!drugId && !sampleArray && dataset) {
    query = db.select('idDrug', 'name').from('Drug').whereIn('idDrug', function () {
      this.select('idDrug').from('drug_source').where({ idSource: dataset });
    });
  } else {
    query = db.select('idDrug', 'name').from(subqueryDrugA).join('Drug', 'a1.idDrugA', '=', 'Drug.idDrug')
      .union(queryB);
  }

  query
    .orderBy('name')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
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
      res.status(400).json({ message: 'Bad Request' });
    });
});

module.exports = router;
