const express = require('express');
const axios = require('axios');

const router = express.Router();

// retrieves wCI stats from openCPU server
router.post('/', (req, res) => {
  const { prediction, observation } = req.body;

  // client must provide prediction and observation
  if (!prediction || !Array.isArray(prediction)) {
    res.status(400).send({ error: 'Request body must contain array of prediction values inside the request body' });
    return;
  }
  if (!observation || !Array.isArray(observation)) {
    res.status(400).send({ error: 'Request body must contain array of prediction values inside the request body' });
    return;
  }

  // makes axios request to wCI OpenCPU server
  axios.post('http://52.138.39.182/ocpu/library/wCI/R/paired.concordance.index/json', {
    prediction,
    observation,
    CPP: false,
  })
    .then((response) => {
      const { data } = response;
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

module.exports = router;
