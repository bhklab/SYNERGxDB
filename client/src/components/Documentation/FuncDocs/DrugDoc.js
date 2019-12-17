/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure05.png';

const DrugDoc = () => (
  <Fragment>
    <ol>
      <li>
        <b>Compounds</b>
      </li>
    </ol>
    <ol>
      <li>
      Metadata is provided for each drug compound in SYNERGxDB (N = 1,962), which includes: compound name, ATC code, PubChem CID, and DrugBank ID. By hovering over each bar of a chart, users can gain additional information about the number of compounds tested in a given dataset.
        {' '}
        <Link to="/drugs">http://SYNERGxDB.ca/drugs</Link>
      </li>
    </ol>
    <Link class="doc-img" to="/drugs">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default DrugDoc;
