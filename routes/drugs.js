const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res, next) => {
  db('Drug').select('name', 'atcCode', 'idDrugBank', 'idPubChem')
    .then((data) => {
      res.json(data);
    });
});

module.exports = router;
