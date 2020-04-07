/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure12.png';

const DetailedDoc = () => (
  <Fragment>
    <ol>
      <li>
        <b>Detailed Synergy Scores</b>
      </li>
    </ol>
    <ol>
      <li>
      Synergy matrices are provided for each score that is calculated for an experiment, 
      where concentrations of compound A and B and corresponding inhibition values (%) 
      are presented. Users are able to further investigate the relationship between each 
      drug combination and synergy score through 3D-surface plots, where synergism is depicted 
      through colour intensity.
        {' '}
        <Link to="/drug_combo?idSource=2&idDrugA=11&idDrugB=97&idSample=15&comboId=43943">http://SYNERGxDB.ca/drug_combo?idSource=2&idDrugA=11&idDrugB=97&idSample=15&comboId=43943</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/drug_combo?idSource=2&idDrugA=11&idDrugB=97&idSample=15&comboId=43943">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default DetailedDoc;
