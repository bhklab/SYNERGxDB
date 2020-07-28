/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/sensitivity.JPG';

const SynDoc = () => (
  <Fragment>
    <h3>Cell-line Sensitivity Analysis</h3>
    <ol>
      <li>
        This analysis provides the summarized synergistic/antagonistic patterns of
        drug combinations in a single heatmap aross multiple datasets within a
        given tissue type or a set of cell line selected by users. In addition,
        the distribution of synergy scores in uselected samples will be displayed
        in box plots that are aligned with eachdrug combination. The cell line(s)
        of a respective drug combination that hs the most hit(s) (i.e. synergy score &gt; 0.2)
        will be displayed on the top row of theheatmap, with the combinations that possess
        the least hits residing at the bottom. sers also have the ability to identify
        which drug in a given database shows th most synergistic effects when one drug is administered.
        {' '}
        <Link to="/sensitivity?&drugId1=11&drugId2=97"> https://www.SYNERGxDB.ca/sensitivity?&drugId1=11&drugId2=97</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/sensitivity?&drugId1=11&drugId2=97">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default SynDoc;
