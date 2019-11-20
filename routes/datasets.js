/* eslint-disable func-names */
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

// Router primary goal is to filter dataset data based on drug ids and sample
router.get('/filter', (req, res) => {
  let {
    sample, drugId1, drugId2,
  } = req.query;
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  sample = Number.isNaN(parseInt(sample, 10)) ? sample : parseInt(sample, 10);

  function subqueryCD() {
    let baseQuery = this.select('idCombo_Design', 'idSample as sampleId')
      .from('Combo_Design');

    // Checks type of the request and modifies the query accordingly
    // Query builder when drug(s) are given
    if (drugId1 || drugId2) {
      if (typeof (sample) === 'number') {
      // Subquery to include all possible idDrugA and idDrugB combinations
        baseQuery = baseQuery.where(function () {
          if (drugId1 && drugId2) {
            return this.andWhere({ idDrugA: drugId1, idDrugB: drugId2, idSample: sample });
          } if (drugId1) {
            return this.andWhere({ idDrugA: drugId1, idSample: sample });
          }
          // drugId2 only
          return this.andWhere({ idDrugA: drugId2, idSample: sample });
        })
          .orWhere(function () {
            if (drugId1 && drugId2) {
              return this.andWhere({ idDrugA: drugId2, idDrugB: drugId1, idSample: sample });
            } if (drugId1) {
              return this.andWhere({ idDrugB: drugId1, idSample: sample });
            }
            // drugId2 only
            return this.andWhere({ idDrugB: drugId2, idSample: sample });
          });
      } else {
        baseQuery = baseQuery.where(function () {
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
    } else if (typeof (sample) === 'number') {
      baseQuery = baseQuery.where({ idSample: sample });
    }
    return baseQuery.as('CD');
  }

  function subqueryS() {
    let baseQuery = this.select('idCombo_Design')
      .from(subqueryCD);
      // Tissue specific requests
    if (typeof (sample) === 'string') baseQuery = baseQuery.where({ tissue: sample });
    return baseQuery
      .join('Sample', 'CD.sampleId', '=', 'Sample.idSample')
      .as('S');
  }

  function subquerySrc() {
    return this.distinct('idSource as sourceId')
      .from(subqueryS)
      .join('Synergy_score', 'Synergy_score.idCombo_Design', '=', 'S.idCombo_Design')
      .as('Src');
  }

  let mainQuery = db.select('idSource', 'name');
  if (!drugId1 && !drugId2 && !sample) {
    mainQuery = mainQuery.from('Source');
  } else {
    mainQuery = mainQuery
      .from(subquerySrc)
      .join('Source', 'Src.sourceId', '=', 'Source.idSource');
  }
  mainQuery.then((data) => {
    res.json(data);
  })
    .catch(err => res.json(err));
});

router.get('/:datasetId', (req, res) => {
  db.select('idSource', 'name', 'no_samples', 'no_drugs', 'pmID', 'author', 'combo')
    .from('Source')
    .where({ idSource: req.params.datasetId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;