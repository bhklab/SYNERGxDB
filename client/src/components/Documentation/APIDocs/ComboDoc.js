/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';

const comboDoc = [
  {
    comboId: 108533,
    idSample: 55,
    bliss: 0.2489,
    loewe: 0.2792,
    hsa: 0.3023,
    zip: 0.375,
    sourceName: 'NCI-ALMANAC',
    sampleName: 'M14',
    drugNameA: 'Bortezomib',
    drugNameB: 'Topotecan',
    tissue: 'skin',
    idSource: 2,
    idDrugA: 11,
    idDrugB: 97,
  },
  {
    comboId: 19885,
    idSample: 80,
    bliss: 0.251,
    loewe: 0.29,
    hsa: 0.3067,
    zip: 0.3723,
    sourceName: 'NCI-ALMANAC',
    sampleName: 'UACC-62',
    drugNameA: 'Bortezomib',
    drugNameB: 'Topotecan',
    tissue: 'skin',
    idSource: 2,
    idDrugA: 11,
    idDrugB: 97,
  }];

const ComboDoc = () => (
  <Fragment>
    <h2>Combo API</h2>
    <div className="api-section">
      <h3>Get combo information</h3>
      <p>Retrieves synergy score data for drug combinations. The API request can take 4 optional request paramaters: dataset (dataset id, integer), sample (tissue name, string, or cell line id, integer), drugId1 (integer), drugId2 (integer)</p>
      <p className="code">
        <span>
          curl
          {' '}
          {'http://synergxdb.ca/api/combos?&sample=skin&dataset=2&drugId1=11&drugId2=97'}
        </span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(comboDoc, null, 2)}</pre></div>
    </div>
  </Fragment>
);


export default ComboDoc;
