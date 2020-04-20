/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure15.png';
import img2 from '../../../images/docs/figure16.png';

const DownloadDoc = () => (
  <Fragment>
    <h3>Download</h3>
    <ol>
      <li>
        <b>1. Molecular profile</b>
      </li>
    </ol>
    <ol>
      <li>
        Users can download molecular profile data, as well as detailed cell line data, in a csv format from the cell line page:
        {' '}
        <Link to="/cell-lines/">http://SYNERGxDB.ca/cell-lines/</Link>
        <br />
      </li>
    </ol>
    <Link className="doc-img" to="/cell-lines/">
      <img src={img} alt="" />
    </Link>
    <ol>
      <li>
        <b>2. Screening profiles</b>
      </li>
    </ol>
    <ol>
      <li>
        Users can download drug combinations screening data for a specific dataset from the dataset page by clicking on a specific dataset name in the table:
        {' '}
        <Link to="/datasets/">http://SYNERGxDB.ca/datasets/</Link>
        <br />
      </li>
    </ol>
    <Link className="doc-img" to="/datasets/">
      <img src={img2} alt="" />
    </Link>
  </Fragment>
);

export default DownloadDoc;
