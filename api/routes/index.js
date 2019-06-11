const express = require('express');
const db = require('../db');

const router = express.Router();

/* GET home page. */
router.get('/getDrugs', (req, res, next) => {
  db('Drug').select('name')
    .then((data) => {
      const drugList = data.map(item => item.name);
      res.json(drugList);
    });
});

router.get('/getCellLines', (req, res, next) => {
  db('Sample').select('name')
    .then((data) => {
      const cellList = data.map(item => item.name);
      res.json(cellList);
    });
});

module.exports = router;
