/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure11.png';

const ConsistencyDoc = () => (
  <Fragment>
    <h3>Consistency in Synergy Scores</h3>
    <ol>
      <li>
        Users can compare two methods of the synergy scores on a scatter plot and
        statistical testing will be carried out including concordance index,
        Spearman rho, and Pearson r.
        {' '}
        <Link to="/consistency?&drugId1=11&drugId2=97">https://www.SYNERGxDB.ca/consistency?&drugId1=11&drugId2=97</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/consistency?&drugId1=11&drugId2=97">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default ConsistencyDoc;
