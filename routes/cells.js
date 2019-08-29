const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db('Sample').select('name', 'idSample', 'tissue', 'sex', 'age', 'disease', 'idCellosaurus', 'origin')
    .then((cellList) => {
      res.json(cellList);
    });
});

router.get("/:cellId", (req, res) => {
  db.select('name', 'idSample', 'tissue', 'sex', 'age', 'disease', 'idCellosaurus', 'origin')
    .from("Sample")
    .where({ idSample: req.params.cellId})
    .then((data) => {
      res.json(data)
    })
})

// Information necessary for ComboDetails component
router.get('/info', (req, res) => {
  const {
    idSample,
  } = req.query;
  db.select('name', 'idCellosaurus', 'disease')
    .first()
    .from('Sample')
    .where({ idSample })
    .then((data) => {
      res.json(data);
    });
});

module.exports = router;
