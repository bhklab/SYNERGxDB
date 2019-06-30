const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
  db('Source')
    .select('name', 'no_samples', 'no_drugs', 'author', 'combo')
    .whereNot({ name: 'AstraZeneca' })
    .orderBy([
      { column: 'no_samples', order: 'desc' },
      { column: 'no_drugs', order: 'desc' },
    ])
    .then((data) => {
      res.json(data);
    });
});

module.exports = router;
