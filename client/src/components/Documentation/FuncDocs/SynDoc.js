/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure02.png';

const SynDoc = () => (
  <Fragment>
    <ol>
      <li>
        <b>Synergy Scores</b>
      </li>
    </ol>
    <ol>
      <li>
      Synergy scores are calculated for each drug combination experiment in SYNERGxDB (N = 477,839), which includes: tissue, cell line, 
      the first/second compounds, ZIP, Bliss, Loewe, and HSA. Users can provide ‘Bortezomib’ and ‘Topotecan’ to pull out all synergy scores 
      tested in any cell lines/datasets.
        {' '}
        <Link to="/synergy_score?drugId1=11&drugId2=97">http://SYNERGxDB.ca/synergy_score?drugId1=11&drugId2=97</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/synergy_score?drugId1=11&drugId2=97">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default SynDoc;
