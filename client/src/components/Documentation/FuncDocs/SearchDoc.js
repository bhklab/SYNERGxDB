/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import img1 from '../../../images/docs/figure03.png';
import img2 from '../../../images/docs/figure13.png';

const SearchDoc = () => (
  <Fragment>
    <h3>Search</h3>
    <ol>
      <li>
        The SYNERGxDB search engine allows users to identify potential biomarkers and novel drug combinations according to the predicted synergy scores,
        by querying for a subset of cell linesor one cell line, the first compound in combination, the second compound in combination, and/or dataset
        of choice to explore.
        {' '}
        <Link to="/">https://www.SYNERGxDB.ca/</Link>
      </li>
    </ol>
    <Link to="/">
      <img className="doc-img" src={img2} alt="" />
    </Link>
  </Fragment>
);

export default SearchDoc;
