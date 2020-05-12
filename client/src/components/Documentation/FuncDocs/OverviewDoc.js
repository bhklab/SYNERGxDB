/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import downloadIcon from '../../../images/icons/download.svg';

const OverviewDoc = () => (
  <Fragment>
    <span>
      {' '}
      <b><i>SYNERGxDB</i></b>
      {' '}
      is a comprehensive database to explore synergistic drug combinations for biomarker discovery.
    </span>
    <ol>
      <li>
        <b>Overview</b>
        <ol>
          <li>
            Many studies have highlighted the use of drug combination approaches in the treatment of tumors, which have been shown to provide aid
            in
            {' '}
            <b>overcoming cancer treatment failures.</b>
            {' '}
            However, the impact of genetics on variability in combo responses for discovering predictive
            and prognostic biomarkers is currently unknown. To help solve this issue, we created
            {' '}
            <b><i>SYNERGxDB</i></b>
            , a web-application that possesses the largest database of seven collections of pharmacological and molecular profiles of corresponding cell lines
            (151 cell lines in 15 tissue types and 1,977 drugs/compounds - 22,507 combinations). This application allows researchers and clinicians to identify
            novel synergistic drug combinations, in order to discover potential prognostic and predictive biomarkers that can help improve
            patient prognosis and selection.
          </li>
        </ol>
        <ol>
          <b>Database</b>
          <li>
            The MySQL dump of pharmacological and molecular profiles of
            {' '}
            <b><i>SYNERGxDB</i></b>
            {' '}
            is available through
            {' '}
            <a href="https://zenodo.org/record/3780920/files/synergxdb_0.2.1.zip?download=1">
              Zenodo
              {' '}
              <img className="zenodo" src={downloadIcon} alt="download icon" />
            </a>
          </li>
          <li>
            <a href="http://doi.org/10.5281/zenodo.3823346">
              <img className="doi" src="https://zenodo.org/badge/DOI/10.5281/zenodo.3823346.svg" alt="DOI" />
            </a>
          </li>
        </ol>

      </li>
    </ol>
  </Fragment>
);

export default OverviewDoc;
