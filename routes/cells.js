const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  db('Sample').select('name', 'idSample', 'tissue', 'sex', 'age', 'disease')
    .then((cellList) => {
      res.json(cellList);
    });
});

module.exports = router;
