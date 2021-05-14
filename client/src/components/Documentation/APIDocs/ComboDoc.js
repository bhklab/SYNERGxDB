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
      <p>
        Retrieves synergy score data for drug combinations. The API request can take 4 optional request paramaters to specify the query:
        <em>dataset</em>
        (dataset id, integer),
        {' '}
        <em>sample</em>
        {' '}
        (tissue name, string, or cell line id, integer),
        {' '}
        <em>drugId1</em>
        {' '}
        (integer),
        {' '}
        <em>drugId2</em>
        {' '}
        (integer).
      </p>
      <p>
        API supports data pagination to help programatically retrieve large sets of data in batches.
        {' '}
        <em>page</em>
        {' '}
        query parameter (integer, default value is 1) specifies page number and
        {' '}
        <em>perPage</em>
        {' '}
        parameter (integer, default value is 20, maximum value is 100) sets number of records retrieved per page. For example,
        {' '}
        <em>...page=2&perPage=10...</em>
        {' '}
        query would retrieve records from 11 to 20
      </p>
      <p className="code">
        <span>
          curl
          {' '}
        </span>
        <br />
        <span>
          https://www.synergxdb.ca/api/combos?page=2&perPage=30&sample=skin&dataset=2&drugId1=11
        </span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(comboDoc, null, 2)}</pre></div>
    </div>
  </Fragment>
);


export default ComboDoc;
