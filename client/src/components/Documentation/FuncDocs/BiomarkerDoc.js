/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/biomarker.JPG';

const BiomarkerDoc = () => (
  <Fragment>
    <h3>Biomarker discovery</h3>
    <ol>
      <li>
      We tested an association between gene expression and synergy score in each dataset
      and provide concordance indices in orde to identify potential predictive biomarkers
      in combination therapies. Users can selct a threshold to define two groups – synergy
      score high and low – to carry out statitical testing between the two groups in terms
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
