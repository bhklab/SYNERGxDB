/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure04.png';

const SampleDoc = () => (
  <Fragment>
    <ol>
      <li>
        <b>Samples</b>
      </li>
    </ol>
    <ol>
      <li>
      All of the cell lines in SYNERGxDB are visually represented in a pie-chart based upon the following categories: tissues, 
      sex, age, biopsy. By hovering over each slice of a chart, users can gain additional information about the cell lines 
      (e.g. number of cell lines derived from skin tissue). Metadata is provided for each cell line in SYNERGxDB (N = 151), which includes: cell line name, tissue origin, sex, age, associated disease, and Cellosaurus accession ID.
        {' '}
        <Link to="/cell-lines/">http://SYNERGxDB.ca/cell-lines/</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/cell-lines/">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default SampleDoc;
