/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';

const Documentation = () => {
  const divStyle = {
    fontSize: '20px',
  };
  const noStyle = {
    listStyleType: 'none',
  };
  return (
    <div>
      <header>
        <div className="wrapper">
          <h1 salign="center">SYNERGxDB</h1>
        </div>
      </header>
      <main>
        <h2>Documentation</h2>
        <ol type="A" style={divStyle} align="justify">
          <li>
            <b>SYNERGxDB</b>
            {' '}
is a comprehensive database to explore synergistic drug combinations for biomarker discovery.
          </li>
          <br />
          <li>
            <b>Overview</b>
            <ol>
              <li style={noStyle}>
                Many studies have highlighted the use of drug combination approaches in the treatment of tumors, which have been shown to provide aid
                in
                {' '}
                <b>overcoming cancer treatment failures.</b>
                {' '}
However, the impact of genetics on variability in combo responses for discovering predictive
                and prognostic biomarkers is currently unknown. To help solve this issue, we created
                {' '}
                <b>SYNERGxDB</b>
, a web-application that possesses the
                largest database of seven collections of pharmacological and molecular profiles of corresponding cell lines (123 cell lines in 11
                tissue types and 1,965 unique drugs/compounds - 14,634 unique combos). This application allows researchers and clinicians to identify
                novel synergistic drug combinations, in order to discover potential prognostic and predictive biomarkers that can help improve
                patient prognosis and selection.
              </li>
            </ol>

          </li>
          <br />
          <li>
            <b>Features</b>
            <br />
            <ol type="i">
              <li>
                    Search: The SYNERGxDB search engine allows users to identify potential biomarkers and novel drug combinations according to
                    the predicted synergy scores, by querying for a subset of cell lines or one cell line, first drug in combo, second drug in
                    combo, and/or dataset of choice to explore.
              </li>
              <br />
              <li>
                    Samples: All of the cell lines in SYNERGxDB are visually represented in a pie-chart based upon the following categories: (age, sex,
                    tissues, biopsy). By hovering over each slice of a chart, users can gain additional information about the cell lines (e.g. number
                    of cell lines derived from a male). Metadata is provided for each cell line in SYNERGxDB (N = 123), which includes: (cell line name,
                    tissue origin, sex, age, associated disease, and
                {' '}
                <i>Cellosaurus</i>
                {' '}
accession ID).
              </li>
              <br />
              <li>
                    Drugs: Metadata is provided for each drug compound in SYNERGxDB (N = 1,965), which includes: (compound name, ATC code, PubChem CID,
                    and DrugBank ID). In addition, users may browse drugs with ATC code in tree at the top panel.
              </li>
              <br />
              <li>
                    Datasets: Each study (dataset) is summarized through the following characteristics: (dataset name, source of study, number of
                    cell lines, number of drug compounds, and concentration design - e.g. 3-by-3 concentrations).
              </li>
              <br />
              <li>
                    Synergy scores: Synergy scores are calculated for each drug combo experiment in SYNERGxDB (N = 475,278), which includes:
                    (tissue, cell line, first drug in combo, second drug in combo, ZIP, Bliss, Loewe, and HSA).
              </li>
              <br />
              <li>
                    Potential biomarkers: From these synergy scores, potential biomarkers were identified by ANOVA for FPKM values in three cell
                    line groups based on the synergy score via ZIP model (synergy, ZIP
                {' '}
                {'>'}
                {' '}
0.2; moderate, 0
                {' '}
                {'<'}
                {' '}
ZIP
                {' '}
                {'<='}
                {' '}
0.2; none or antagonism
                    for the others), with the following characteristics provided: (HUGO gene symbol and P-value).
              </li>
              <br />
              <li>
                    Detailed synergy scores: Users are able to delve into the synergy scores calculated for each drug combo experiment through a
                    detailed synergy pane. Cumulative density is plotted across all of the synergy scores for a drug combo experiment of interest.
                    Experiment consists of sample, drug combo one (drugA) and drug combo two (drugB).
                {' '}
                <br />
                    Synergy matrices are provided for each score that is calculated for an experiment, where concentrations of drugA and drugB and
                    corresponding inhibition values (%) are presented. Users are able to further investigate the relationship between each drug
                    combination and synergy score through 3D-surface plots, where synergism is depicted through colour intensity. In addition, the
                    drug-dose response curves are generated for each drug and cell line combination, along with an inhibition heat map, and computed
                    AAC, IC50, and EC50.
              </li>
            </ol>
          </li>
        </ol>
      </main>
      <footer>
        <div className="wrapper">
          <p align="center">Copyright © 2019. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;
