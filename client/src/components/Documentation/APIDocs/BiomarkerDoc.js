/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';

const synData = [{
  gene: 'ANGPTL8',
  concordanceIndex: 0.309307,
  pValue: 3.63307e-10,
  dataset: 'NCI-ALMANAC',
  drugA: 'Bortezomib',
  drugB: 'Topotecan',
},
{
  gene: 'RIPK4',
  concordanceIndex: 0.318431,
  pValue: 5.93887e-8,
  dataset: 'NCI-ALMANAC',
  drugA: 'Bortezomib',
  drugB: 'Topotecan',
}];

const associationData = [
  {
    fpkm: 0,
    cellName: 'ACHN',
    bliss: 0.2042,
    loewe: 0.2313,
    hsa: 0.2548,
    zip: 0.4155,
  },
  {
    fpkm: 0,
    cellName: 'BT-549',
    bliss: 0.2012,
    loewe: 0.2395,
    hsa: 0.2636,
    zip: 0.3892,
  },
  {
    fpkm: 0,
    cellName: 'CCRF-CEM',
    bliss: 0.3907,
    loewe: 0.4604,
    hsa: 0.4679,
    zip: 0.6531,
  }];

const BiomarkerData = () => (
  <Fragment>
    <h2>Biomarker API</h2>
    <div className="api-section">
      <h3>Get Potential Biomarkers</h3>
      <p>Retrieves list of potential biomarkers. The API request requires you to specify `type` request parameter, which indicates type of synergy score used for the analysis (values can be `zip`, `hsa`, `loewe` and `bliss`). Also, API can take 3 optional request paramaters: dataset (dataset id, integer), drugId1 (integer), drugId2 (integer)</p>
      <p className="code">
        <span>
          curl
        </span>
      </p>
      <p className="code">
        <span>https://www.synergxdb.ca/api/biomarkers/synergy?type=zip&drugId1=11&drugId2=97&dataset=2</span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(synData, null, 2)}</pre></div>
    </div>
    <div className="api-section">
      <h3>Get Biomarker Association Data</h3>
      <p>Retrieves expression data for a given gene across different cell lines. The API request requires you to specify `gene` request parameter. The API request can take 4 optional request paramaters: dataset (dataset id, integer), sample (tissue name, string, cell line id(s), integer(s)), drugId1 (integer), drugId2 (integer)</p>
      <p className="code">
        <span>
          curl
        </span>
      </p>
      <p className="code">
        <span>
          https://www.synergxdb.ca/api/biomarkers/association?&dataset=2&drugId1=11&drugId2=97&gene=ANGPTL8
        </span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(associationData, null, 2)}</pre></div>
    </div>
  </Fragment>
);


export default BiomarkerData;
