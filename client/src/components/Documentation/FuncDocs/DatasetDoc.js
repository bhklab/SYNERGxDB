/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure06.png';

const DatasetDoc = () => (
  <Fragment>
    <ol>
      <li>
        <b>Datasets</b>
      </li>
    </ol>
    <ol>
      <li>
      Each study (dataset) is summarized through the following characteristics: 
      dataset name, source of study, number of cell lines, number of drug compounds, 
      and concentration design - e.g. 3-by-3 concentrations.
        {' '}
        <Link to="/datasets/">http://SYNERGxDB.ca/datasets/</Link><br />
The experimental dataset downloaded from the NCI-ALMANAC homepage (https://wiki.nci.nih.gov/display/NCIDTPdata/NCI-ALMANAC) contained observed values that were empty in 182,295 (5%) measurements, which are the experimental results of three compounds (4'-Epiadriamycin, Eribulin mesylate, and Idarubicin hydrochloride). 
      </li>
    </ol>
    <Link className="doc-img" to="/datasets/">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default DatasetDoc;
