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
  console.log('dataset filter route fired');
  console.log(req.query);
  let {
    sample, drugId1, drugId2,
  } = req.query;
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  sample = Number.isNaN(parseInt(sample, 10)) ? sample : parseInt(sample, 10);
  console.log(drugId1, drugId2, sample);

  function subqueryCD() {
    let baseQuery = this.select('idCombo_Design', 'idSample as sampleId')
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


  // Tissue specific requests
  //   if (typeof (sample) === 'string') {
  //     console.log('string');
  //     db.select('idCombo_Design', 'idSample')
  //       .from(subqueryCD)
  //       .where({ tissue: sample })
  //       .join('Sample', 'CD.sampleId', '=', 'Sample.idSample')
  //       .then((data) => {
  //         console.log(data);
  //         res.json(data);
  //       });
  //   } else {
  //     console.log('something else');
  //     db.select('idCombo_Design', 'idSample')
  //       .from(subqueryCD)
  //       .join('Sample', 'CD.sampleId', '=', 'Sample.idSample')
  //       .then((data) => {
  //         console.log(data);
  //         res.json(data);
  //       });
  //   }

  function subquerySrc() {
    return this.distinct('idSource as sourceId')
      .from(subqueryS)
      .join('Combo_matrix', 'Combo_matrix.idCombo_Design', '=', 'S.idCombo_Design')
      .as('Src');
  }

  //   db.distinct('idSource')
  //     .from(subqueryS)
  //     .join('Combo_matrix', 'Combo_matrix.idCombo_Design', '=', 'S.idCombo_Design')
  //     .then((data) => {
  //       console.log(data);
  //       res.json(data);
  //     })
  //     .catch(err => res.json(err));

  db.select('idSource', 'name')
    .from(subquerySrc)
    .join('Source', 'Src.sourceId', '=', 'Source.idSource')
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch(err => res.json(err));
  // db.select('');
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
