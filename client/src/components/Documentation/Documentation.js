/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

const Documentation = () => (
  <Fragment>
    <h1>SYNERGxDB</h1>
    <h2>Documentation</h2>
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
                , a web-application that possesses the
                largest database of seven collections of pharmacological and molecular profiles of corresponding cell lines (124 cell lines in 11 tissue types and
                1,962 drugs/compounds - 15,268 combinations). This application allows researchers and clinicians to identify
                novel synergistic drug combinations, in order to discover potential prognostic and predictive biomarkers that can help improve
                patient prognosis and selection.
          </li>
        </ol>

      </li>
      <br />
      <li>
        <b>Features</b>
        <br />
        <ol>
          <li>
              Search: The SYNERGxDB search engine allows users to identify potential biomarkers and novel drug combinations according to
              the predicted synergy scores, by querying for a subset of cell lines or one cell line, first drug in combo, second drug in
              combo, and/or dataset of choice to explore.
          </li>
          <br />
          <li>
              Samples: All of the cell lines in SYNERGxDB are visually represented in a pie-chart based upon the following categories: (age, sex,
              tissues, biopsy). By hovering over each slice of a chart, users can gain additional information about the cell lines (e.g. number
              of cell lines derived from a male). Metadata is provided for each cell line in SYNERGxDB (N = 124), which includes: (cell line name,
              tissue origin, sex, age, associated disease, and
            {' '}
            <i>Cellosaurus</i>
            {' '}
              accession ID).
          </li>
          <br />
          <li>
              Compounds: Metadata is provided for each drug compound in SYNERGxDB (N = 1,962), which includes: (compound name, ATC code, PubChem CID,
              and DrugBank ID). In addition, users may browse drugs with ATC code in tree at the top panel.
          </li>
          <br />
          <li>
              Datasets: Each study (dataset) is summarized through the following characteristics: (dataset name, source of study, number of
              cell lines, number of drug compounds, and concentration design - e.g. 3-by-3 concentrations).
          </li>
          <br />
          <li>
              Synergy scores: Synergy scores are calculated for each drug combo experiment in SYNERGxDB (N = 477,595), which includes:
              (tissue, cell line, first drug in combo, second drug in combo, ZIP, Bliss, Loewe, and HSA).
          </li>
          <br />
          <li>
              Detailed synergy scores: Users are able to delve into the synergy scores calculated for each drug combo experiment through a
              detailed synergy pane. Cumulative density is plotted across all of the synergy scores for a drug combo experiment of interest.
              Experiment consists of sample, drug combo one (compound A) and drug combo two (compound B).
          </li>
          <br />
          <li>
              Synergy matrices are provided for each score that is calculated for an experiment, where concentrations of drugA and drugB and
              corresponding inhibition values (%) are presented. Users are able to further investigate the relationship between each drug
              combination and synergy score through 3D-surface plots, where synergism is depicted through colour intensity. In addition, the
              drug-dose response curves are generated for each drug and cell line combination, along with an inhibition heat map, and computed
              AAC, IC50, and EC50.
          </li>
        </ol>
      </li>
    </ol>
  </Fragment>
);

export default Documentation;
