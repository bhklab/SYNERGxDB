/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';

const datasetData = [
  {
    idSource: 1,
    name: 'MERCK',
    no_samples: 39,
    no_drugs: 38,
    pmID: '26983881',
    author: "O'Neil et al",
    combo: '4-by-4',
  }, {
    idSource: 2,
    name: 'NCI-ALMANAC',
    no_samples: 60,
    no_drugs: 92,
    pmID: '28446463',
    author: 'Holbeck et al',
    combo: '3-by-3 or 5-by-3',
  },
];

const DatasetDoc = () => (
  <Fragment>
    <h2>Dataset API</h2>
    <div className="api-section">
      <h3>Get dataset information</h3>
      <p>Retrieves data about datasets that have been used for data analysis</p>
      <p className="code">
        <span>curl http://synergxdb.ca/api/datasets/</span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(datasetData, null, 2)}</pre></div>
    </div>
  </Fragment>
);


export default DatasetDoc;
