/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/enrichment.JPG';

const TissueEnrichDoc = () => (
  <Fragment>
    <h3>Tissue-specific Enrichment Analysis</h3>
    <ol>
      <li>
      This analysis module displays the synergistic effect of the drug combination
      of specific tissue types with receiver perating characteristic (ROC) curves.
      By ranking the cell lines, the area undr the curve (AUC) will be calculated
      for each tissue type to see whether a st of cell lines are highly ranked compared
      to others within the database. On the lft side of the tab view, tissue-specific AUCs
       will be displayed in a single table and users can sort the table by AUC. On the
       right side, synergy scores will be dislayed in a waterfall plot along with ROC
       curve(s) for the selected tissue type.
        {' '}
        <Link to="/enrichment?&drugId1=11&drugId2=97">http://SYNERGxDB.ca/enrichment?&drugId1=11&drugId2=97</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/enrichment?&drugId1=11&drugId2=97">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default TissueEnrichDoc;
