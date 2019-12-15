/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';

const sampleData = [{
  name: 'MDA-MB-231',
  idSample: 9,
  tissue: 'breast',
  sex: 'F',
  age: 51,
  disease: 'Breast adenocarcinoma',
  idCellosaurus: 'CVCL_0062',
  origin: 'Pleural effusion',
},
{
  name: 'SK-MEL-2',
  idSample: 10,
  tissue: 'skin',
  sex: 'M',
  age: 60,
  disease: 'Melanoma',
  idCellosaurus: 'CVCL_0069',
  origin: 'Thigh skin',
},
{
  name: 'DU145',
  idSample: 11,
  tissue: 'prostate',
  sex: 'M',
  age: 69,
  disease: 'Prostate carcinoma',
  idCellosaurus: 'CVCL_0105',
  origin: 'Brain',
}];

const enrichmentData = [
  {
    dataset: 'NCI-ALMANAC',
    drugA: 'Bortezomib',
    drugB: 'Topotecan',
    tissue: 'skin',
    auc: 0.614512,
    score: 'Bliss',
  },
  {
    dataset: 'NCI-ALMANAC',
    drugA: 'Bortezomib',
    drugB: 'Topotecan',
    tissue: 'skin',
    auc: 0.591017,
    score: 'Loewe',
  },
  {
    dataset: 'NCI-ALMANAC',
    drugA: 'Bortezomib',
    drugB: 'Topotecan',
    tissue: 'skin',
    auc: 0.587302,
    score: 'HSA',
  },
  {
    dataset: 'NCI-ALMANAC',
    drugA: 'Bortezomib',
    drugB: 'Topotecan',
    tissue: 'skin',
    auc: 0.53288,
    score: 'ZIP',
  },
];

const SampleDoc = () => (
  <Fragment>
    <h2>Sample API</h2>
    <div className="api-section">
      <h3>Get cell line information</h3>
      <p>Retrieves data related to all cell lines which were used in the analysis</p>
      <p className="code">
        <span>curl http://synergxdb.ca/api/cell_lines/</span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(sampleData, null, 2)}</pre></div>
    </div>
    <div className="api-section">
      <h3>Get tissue specific enrichment data</h3>
      <p>Retrieves tissue enrichment data from the database. The API request can take 4 optional request paramaters: dataset (dataset id, integer), sample (tissue name, string), drugId1 (integer), drugId2 (integer)</p>
      <p className="code">
        <span>
          curl
        </span>
      </p>
      <p className="code">
        <span>
          http://synergxdb.ca/api/cell_lines/enrichment?sample=skin&drugId1=11&drugId2=97&dataset=2
        </span>
      </p>
      <p>Output: </p>
      <div><pre className="output">{JSON.stringify(enrichmentData, null, 2)}</pre></div>
    </div>
  </Fragment>
);


export default SampleDoc;
