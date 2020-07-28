/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure04.png';

const SampleDoc = () => (
  <Fragment>
    <h3>Samples</h3>
    <ol>
      <li>
        All of the cell lines in SYNERGxDB are visually represented in a pie-chart based upon the following categories: tissues,
        sex, age, biopsy. By hovering over eachslice of a chart, users can gain additional information about the cell lines
        (e.g. number of cell lines derived fromskin tissue). Metadata is provided for each cell line in SYNERGxDB (N = 151), which includes: cell line name, tissue origin, sex, age, associated disease, and Cellosaurus accession ID.
        {' '}
        <Link to="/cell-lines/">https://www.SYNERGxDB.ca/cell-lines/</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/cell-lines/">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default SampleDoc;
