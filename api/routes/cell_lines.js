const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
  db('Sample').select('name', 'sex', 'age', 'disease', 'tissue')
    .then((data) => {
      res.json(data);
    });
});

module.exports = router;
