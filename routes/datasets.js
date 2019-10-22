const express = require('express');
const db = require('../db');

const router = express.Router();


router.get('/', (req, res) => {
  const {
    idSource,
  } = req.query;
  const baseQuery = db('Source')
    .select();

  if (idSource) {
    baseQuery
      .first()
      .where({ idSource })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  } else {
    baseQuery
      // This condition should be removed later
      .whereNot({ name: 'AstraZeneca' })
      .orderBy([
        { column: 'no_samples', order: 'desc' },
        { column: 'no_drugs', order: 'desc' },
      ])
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
});

router.get('/:datasetId', (req, res) => {
  db.select('idSource', 'name', 'no_samples', 'no_drugs', 'pmID', 'author', 'combo')
    .from('Source')
    .where({ idSource: req.params.datasetId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


module.exports = router;
