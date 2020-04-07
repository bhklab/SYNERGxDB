/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/biomarker.JPG';

const BiomarkerDoc = () => (
  <Fragment>
    <ol>
      <li>
        <b>Biomarker discovery</b>
      </li>
    </ol>
    <ol>
      <li>
      We tested an association between gene expression and synergy score in each dataset 
      and provide concordance indices in order to identify potential predictive biomarkers 
      in combination therapies. Users can select a threshold to define two groups – synergy 
      score high and low – to carry out statistical testing between the two groups in terms 
      of gene expression.
        {' '}
        <Link to="/biomarker?&drugId1=11&drugId2=97">http://SYNERGxDB.ca/biomarker?&drugId1=11&drugId2=97</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/biomarker?&drugId1=11&drugId2=97">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default BiomarkerDoc;
