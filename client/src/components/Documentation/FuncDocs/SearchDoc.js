/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const SearchDoc = () => (
  <Fragment>
    <ol>
      <li>
        <b>Search</b>
      </li>
    </ol>
    <ol>
      <li>
       The SYNERGxDB search engine allows users to identify potential biomarkers and novel drug combinations according to the predicted synergy scores, by querying for a subset of cell lines or one cell line, the first compound in combination, the second compound in combination, and/or dataset of choice to explore.
        {' '}
        <Link to="/">http://SYNERGxDB.ca/</Link>
      </li>
    </ol>
  </Fragment>
);

export default SearchDoc;
