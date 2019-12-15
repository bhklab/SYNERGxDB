/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';

const drugData = [
  {
    name: '(+)-PD 128907 hydrochloride',
    atcCode: null,
    idDrugBank: null,
    idPubChem: '11957668',
    idDrug: 1456,
    dataset_names: 'STANFORD',
  },
  {
    name: '(-)-Epigallocatechin gallate',
    atcCode: null,
    idDrugBank: 'DB12116',
    idPubChem: '65064',
    idDrug: 369,
    dataset_names: 'STANFORD',
  }];

const DrugDoc = () => (
  <Fragment>
    <h2>Drug API</h2>
    <div className="api-section">
      <h3>Get drug information</h3>
      <p>Retrieves data about all compounds that have been tested in the analysis</p>
      <p className="code">
        <span>curl http://synergxdb.ca/api/drugs/</span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(drugData, null, 2)}</pre></div>
    </div>
  </Fragment>
);


export default DrugDoc;
