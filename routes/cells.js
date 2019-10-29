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
  let baseQuery = db.select('idCombo_Design', 'idSample as sampleId')
    .from('Combo_Design');

  // Checks type of the request and modifies the query accordingly
  // Query builder when drug(s) are given
  if (drugId1) {
    if (typeof (sample) === 'number') {
      // Subquery to include all possible idDrugA and idDrugB combinations
      baseQuery = baseQuery.where(function () {
        return drugId2 ? this.andWhere({ idDrugA: drugId1, idDrugB: drugId2, idSample: sample })
          : this.andWhere({ idDrugA: drugId1, idSample: sample });
      })
        .orWhere(function () {
          return drugId2 ? this.where({ idDrugA: drugId2, idDrugB: drugId1, idSample: sample })
            : this.andWhere({ idDrugB: drugId1, idSample: sample });
        });
    } else {
      baseQuery = baseQuery.where(function () {
        return drugId2 ? this.andWhere({ idDrugA: drugId1, idDrugB: drugId2 })
          : this.andWhere({ idDrugA: drugId1 });
      })
        .orWhere(function () {
          return drugId2 ? this.where({ idDrugA: drugId2, idDrugB: drugId1 })
            : this.where({ idDrugB: drugId1 });
        });
    }
  } else if (typeof (sample) === 'number') {
    baseQuery = baseQuery.where({ idSample: sample });
  }
  return baseQuery.as('CD');
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
