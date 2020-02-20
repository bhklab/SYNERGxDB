/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../images/docs/figure07.png';

const PharmacoDoc = () => (
  <Fragment>
    <ol>
      <li>
        <b>Pharmacogenomic Analysis</b>
      </li>
    </ol>
    <ol>
      <li>
      Users can select a type of molecular/metabolomic profile (e.g., gene 
      expression) and a gene symbol along with a set of cell lines in one 
      specific tissue or a set of user-preferred cell lines across multiple 
      tissues. Subsequently, one or two compounds (maximum) are selected, which 
      results in just one or all possible drug combinations to be analyzed with 
      the respective cell lines. Lastly, synergy scores are selected to be analyzed 
      that will carry out an association test between genomic characteristics and 
      synergy scores. Here, we showed an example in an association between ATP6V1B2 
      expression and synergy scores in ‘Bortezomib + Topotecan’.
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
