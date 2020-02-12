/* eslint-disable func-names */
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
      res.status(400).json({ message: 'Bad Request' });
    });
});

router.get('/enrichment', (req, res) => {
  const { sample } = req.query;
  let {
    drugId1, drugId2, dataset,
  } = req.query;
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  dataset = dataset && parseInt(dataset, 10);
  function modifyQuery(query) {
    if (!drugId1 && !drugId2 && !dataset && !sample) return query;
    let modQuery = query;
    const whereObj1 = {};
    const whereObj2 = {};
    if (dataset) {
      whereObj1.idSource = dataset;
      whereObj2.idSource = dataset;
    }
    if (sample) {
      whereObj1.tissue = sample;
      whereObj2.tissue = sample;
    }
    if (drugId1) {
      whereObj1.idDrugA = drugId1;
      whereObj2.idDrugB = drugId1;
    }
    if (drugId2) {
      whereObj1.idDrugB = drugId2;
      whereObj2.idDrugA = drugId2;
    }
    modQuery = modQuery.where(whereObj1);
    if (drugId1 || drugId2) modQuery = modQuery.orWhere(whereObj2);
    return modQuery;
  }
  function subqueryBliss() {
    let query = this.select(db.raw('idSource, idDrugA, idDrugB, tissue, bliss_auc as auc, \'Bliss\' as score'))
      .from('tissue_enrichment');
    query = modifyQuery(query);
    return query;
  }
  function subqueryLoewe() {
    let query = this.select(db.raw('idSource, idDrugA, idDrugB, tissue, loewe_auc as auc, \'Loewe\' as score'))
      .from('tissue_enrichment');
    query = modifyQuery(query);
    return query;
  }
  function subqueryHSA() {
    let query = this.select(db.raw('idSource, idDrugA, idDrugB, tissue, hsa_auc as auc, \'HSA\' as score'))
      .from('tissue_enrichment');
    query = modifyQuery(query);
    return query;
  }
  // Restructures the data with unions for further sorting by AUC values
  function subqueryAll() {
    let query = this.select(db.raw('idSource, idDrugA, idDrugB, tissue, zip_auc as auc, \'ZIP\' as score'))
      .from('tissue_enrichment');
    query = modifyQuery(query);
    return query
      .union(subqueryBliss)
      .union(subqueryLoewe)
      .union(subqueryHSA)
      .as('Comb');
  }
  function subqueryDataset() {
    this.select('name as dataset', 'idDrugA', 'idDrugB', 'tissue', 'auc', 'score')
      .from(subqueryAll)
      .join('source', 'source.idSource', '=', 'Comb.idSource')
      .as('CombD');
  }
  function subqueryDrugA() {
    this.select('dataset', 'name as drugA', 'idDrugB', 'tissue', 'auc', 'score')
      .from(subqueryDataset)
      .join('drug', 'drug.idDrug', '=', 'CombD.idDrugA')
      .as('CombDD');
  }
  db.select('dataset', 'drugA', 'name as drugB', 'tissue', 'auc', 'score')
    .from(subqueryDrugA)
    .join('drug', 'drug.idDrug', '=', 'CombDD.idDrugB')
    .orderBy('auc', 'desc')
    .as('T')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
});

router.get('/filter', (req, res) => {
  let {
    dataset, drugId1, drugId2,
  } = req.query;
  drugId1 = drugId1 && parseInt(drugId1, 10);
  drugId2 = drugId2 && parseInt(drugId2, 10);
  dataset = dataset && parseInt(dataset, 10);

  // filters data based on given drugs
  function subqueryCD() {
    let subquery = this.select('idCombo_Design', 'idSample')
      .from('Combo_Design');

    if (drugId1 || drugId2) {
      subquery = subquery.where(function () {
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
    return subquery.as('CD');
  }

  // subquery combo-matrix table (optional, only used when dataset is given)
  function subquerySS() {
    return this.select('idCombo_Design', 'idSource')
      .from('Synergy_score')
      .where({ idSource: dataset })
      .as('SS');
  }

  // consolidates filtering by dataset and drug(s) together
  function subqueryGetSampleIds() {
    let baseQuery = this.distinct('idSample');
    if (drugId1 || drugId2) {
      baseQuery = baseQuery
        .from(subqueryCD);
    } else {
      baseQuery = baseQuery
        .from('Combo_Design');
    }

    if (dataset) {
      baseQuery = baseQuery.where({ idSource: dataset });
      if (drugId1 || drugId2) {
        baseQuery = baseQuery.join(subquerySS, 'SS.idCombo_Design', '=', 'CD.idCombo_Design');
      } else {
        baseQuery = baseQuery.join(subquerySS, 'SS.idCombo_Design', '=', 'Combo_Design.idCombo_Design');
      }
    }
    return baseQuery.as('S');
  }

  // Retrieves cell line names and tissue names
  db.select('Sample.idSample as idSample', 'tissue', 'name')
    .from(subqueryGetSampleIds)
    .join('Sample', 'S.idSample', '=', 'Sample.idSample')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: 'Bad Request' });
    });
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
      res.status(400).json({ message: 'Bad Request' });
    });
});

module.exports = router;
