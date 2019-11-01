/* eslint-disable func-names */
const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db('Sample').select('name', 'idSample', 'tissue', 'sex', 'age', 'disease', 'idCellosaurus', 'origin')
    .then((cellList) => {
      res.json(cellList);
    });
});

// Information necessary for ComboDetails component
router.get('/info', (req, res) => {
  const {
    idSample,
  } = req.query;
  db.select('idSample', 'name', 'idCellosaurus', 'disease')
    .first()
    .from('Sample')
    .where({ idSample })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get('/filter', (req, res) => {
  console.log('sample filter route fired');
  console.log(req.query);
  let {
    dataset, drugId1, drugId2,
  } = req.query;
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  dataset = dataset && parseInt(dataset, 10);
  console.log(drugId1, drugId2, dataset);
  // res.json({ message: 'OK' });


  function subqueryCD() {
    let subquery = this.select('idCombo_Design', 'idSample')
      .from('Combo_Design');

    // Checks type of the request and modifies the query accordingly
    // Query builder when drug(s) are given
    if (drugId1 || drugId2) {
      subquery = subquery.where(function () {
        if (drugId1 && drugId2) {
          return this.andWhere({ idDrugA: drugId1, idDrugB: drugId2 });
        } if (drugId1) {
          return this.andWhere({ idDrugA: drugId1 });
        }
        // drugId2 only
        return this.andWhere({ idDrugA: drugId2 });
      })
        .orWhere(function () {
          if (drugId1 && drugId2) {
            return this.andWhere({ idDrugA: drugId2, idDrugB: drugId1 });
          } if (drugId1) {
            return this.andWhere({ idDrugB: drugId1 });
          }
          // drugId2 only
          return this.andWhere({ idDrugB: drugId2 });
        });
    }
    return subquery.as('CD');
  }

  let baseQuery = db.distinct('idSample')
    .from(subqueryCD);
  if (dataset) baseQuery = baseQuery.where({ idSource: dataset });

  baseQuery
    .join('Combo_matrix', 'Combo_matrix.idCombo_Design', '=', 'CD.idCombo_Design')
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get('/:cellId', (req, res) => {
  db.select('name', 'idSample', 'tissue', 'sex', 'age', 'disease', 'idCellosaurus', 'origin')
    .from('Sample')
    .where({ idSample: req.params.cellId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
