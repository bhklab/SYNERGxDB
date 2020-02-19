/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';

const OverviewDoc = () => (
  <Fragment>
    <span>
      {' '}
      <b>SYNERGxDB</b>
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
            <b>SYNERGxDB</b>
                , a web-application that possesses the largest database of seven collections of pharmacological and molecular profiles of corresponding cell lines 
                (151 cell lines in 15 tissue types and 1,973 drugs/compounds - 14,536 combinations). This application allows researchers and clinicians to identify
                novel synergistic drug combinations, in order to discover potential prognostic and predictive biomarkers that can help improve
                patient prognosis and selection.
          </li>
        </ol>

      </li>
    </ol>
  </Fragment>
);

export default OverviewDoc;
