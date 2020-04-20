/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure07.png';

const PharmacoDoc = () => (
  <Fragment>
    <h3>Pharmacogenomic Analysis</h3>
    <ol>
      <li>
      Users can select a type of molecular/metabolomic profile (e.g., gene
      expression) and a gene symbol along wit a set of cell lines in one
      specific tissue or a set of user-prefered cell lines across multiple
      tissues. Subsequently, one or two componds (maximum) are selected, which
      results in just one or all possible dru combinations to be analyzed with
      the respective cell lines. Lastly, synegy scores are selected to be analyzed
      that will carry out an association testbetween genomic characteristics and
      synergy scores. Here, we showed an examle in an association between ATP6V1B2
      expression and synergy scores in ‘Borteomib + Topotecan’.
        {' '}
        <Link to="/pharmacogenomics?example=true">http://SYNERGxDB.ca/pharmacogenomics?example=true</Link>
      </li>
    </ol>
    <Link className="doc-img" to="/pharmacogenomics?example=true">
      <img src={img} alt="" />
    </Link>
  </Fragment>
);

export default PharmacoDoc;
