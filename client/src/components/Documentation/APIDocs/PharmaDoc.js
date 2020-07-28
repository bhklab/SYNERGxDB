/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';

const metabolomicData = [{
  adenine: 5.9144647,
  cellName: 'K-562',
  bliss: 0.3427,
  hsa: 0.3966,
  zip: 0.4617,
  loewe: 0.3792,
},
{
  adenine: 6.1473693,
  cellName: 'RPMI-8226',
  bliss: 0.2672,
  hsa: 0.3213,
  zip: 0.3404,
  loewe: 0.298,
},
{
  adenine: 5.6806534,
  cellName: 'U-251MG',
  bliss: 0.1906,
  hsa: 0.2464,
  zip: 0.3436,
  loewe: 0.2298,
}];

const cnaData = [
  {
    cn: 1.06543476513,
    cellName: 'ZR-75-1',
    bliss: -0.0129,
    hsa: 0.0166,
    zip: -0.045,
    loewe: -0.0142,
  },
  {
    cn: 1.04689523824,
    cellName: 'MCF-7',
    bliss: 0.0362,
    hsa: 0.0839,
    zip: 0.0583,
    loewe: 0.0523,
  }, {
    cn: 0.484549807236,
    cellName: 'BT-549',
    bliss: 0.2012,
    hsa: 0.2636,
    zip: 0.3892,
    loewe: 0.2395,
  }];

const PharmaDoc = () => (
  <Fragment>
    <h2>Pharmacogenomics API</h2>
    <div className="api-section">
      <h3>Get Metabolomic Data</h3>
      <p>Retrieves metabolomic data for a given biological molecule across multiple cell lines. The API request requires you to specify `molecule` (biological molecule name, varchar), `drugId1` (integer), `drugId2` (integer) request parameters. Also, you can optionally provide the list of cell lines you would like to analyze in `sample`.</p>
      <p className="code">
        <span>
          curl
        </span>
      </p>
      <p className="code">
        <span>https://www.synergxdb.ca/api/pharmacogenomics/metabolomics?drugId1=11&drugId2=97&sample=1,3,4,5,6,7,8,9,10&molecule=adenine</span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(metabolomicData, null, 2)}</pre></div>
    </div>
    <div className="api-section">
      <h3>Get CNA Data</h3>
      <p>Retrieves copy number alteration data for a given gene across different cell lines. The API request requires you to specify `gene` (gene name, varchar), `drugId1` (integer), `drugId2` (integer) request parameters. Also, you can optionally provide the list of cell lines you would like to analyze in `sample`.</p>
      <p className="code">
        <span>
          curl
        </span>
      </p>
      <p className="code">
        <span>
          https://www.synergxdb.ca/api/pharmacogenomics/cna?drugId1=11&drugId2=97&sample=6,9,28,38,39,47,83,94,116&gene=FANK1%20(92565)
        </span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(cnaData, null, 2)}</pre></div>
    </div>
  </Fragment>
);


export default PharmaDoc;
