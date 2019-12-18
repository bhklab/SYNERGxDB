/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/sensitivity.JPG';

const SynDoc = () => (
  <Fragment>
    <ol>
      <li>
        <b>Cell-line Sensitivity Analysis</b>
      </li>
    </ol>
    <ol>
      <li>
      This analysis provides the summarized synergistic/antagonistic patterns of drug combinations in a single heatmap across multiple datasets within a given tissue type or a set of cell lines selected by users. In addition, the distribution of synergy scores in unselected samples will be displayed in box plots that are aligned with each drug combination. The cell line(s) of a respective drug combination that has the most hit(s) (i.e. synergy score > 0.2) will be displayed on the top row of the heatmap, with the combinations that possess the least hits residing at the bottom. Users also have the ability to identify which drug in a given database shows the most synergistic effects when one drug is administered.
        {' '}
        <Link to="/sensitivity?&drugId1=11&drugId2=97"> http://SYNERGxDB.ca/sensitivity?&drugId1=11&drugId2=97</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/sensitivity?&drugId1=11&drugId2=97">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default SynDoc;
