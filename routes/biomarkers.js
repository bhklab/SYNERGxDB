const express = require('express');
const db = require('../db');

const router = express.Router();

// Route to retrieve list of potential biomarkers
router.post('/', (req, res) => {
  const { drugId1, drugId2, dataset } = req.body;


  function subqueryAnova() {
    // remove idSource: 2 when more data analyzed (this is a temporary fix)
    let baseQuery = this.select('gene', 'p', 'idSource as id')
      .from('anova');
    if (dataset) {
      baseQuery = baseQuery.where({
        idDrugA: drugId1, idDrugB: drugId2, idSource: dataset,
      })
        .orWhere({
          idDrugA: drugId2, idDrugB: drugId1, idSource: dataset,
        });
    } else {
      baseQuery = baseQuery.where({
        idDrugA: drugId1, idDrugB: drugId2, idSource: 2,
      })
        .orWhere({
          idDrugA: drugId2, idDrugB: drugId1, idSource: 2,
        });
    }
    return baseQuery.orderBy('p', 'desc')
      .limit(10)
      .as('biomarker');
  }
  db.select('gene', 'p', 'idSource', 'name')
    .from(subqueryAnova)
    .join('source', 'source.idSource', '=', 'biomarker.id')
    .then((data) => {
      res.json(data);
    });
});

// Database call to get data for Plot.js box plots
router.post('/fpkm', (req, res) => {
  const {
    idSource, idDrugA, idDrugB, gene, interaction,
  } = req.body;
  // Subquery to get list of idSample from idSource, idDrugA, idDrugB
  function subquerySL() {
    const allSample = this.distinct('cd.idSample')
      .from('Combo_Design as cd')
      .join('Synergy_Score as ss', 'cd.idCombo_Design', '=', 'ss.idCombo_Design')
      .where({
        idSource,
        idDrugA,
        idDrugB,
      });
    switch (interaction) {
      case 'SYN':
        return allSample.andWhere('ZIP', '>', 0.2);
      case 'MOD':
        return allSample.andWhere(0.2, '>=', 'ZIP', '>=', 0);
      case 'ANT':
        return allSample.andWhere('ZIP', '<', 0);
    }
  }

  // Subquery to get gene_id from hgnc_symbol
  function subqueryGI() {
    this.select('gene_id')
      .from('gene_identifiers')
      .where({ hgnc_symbol: gene });
  }

  // Select statement to return FPKM
  db.select('rna.FPKM')
    .from('RNAseq as rna')
    .join('model_identifiers as mi', 'rna.model_id', '=', 'mi.model_id')
    .whereIn('idSample', subquerySL)
    .andWhere({ gene_id: subqueryGI })
    .andWhere('rna.FPKM', '>', 0)
    .then((data) => {
      res.json(data);
    });
});


module.exports = router;
