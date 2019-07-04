/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import Biomarkers from './Biomarkers';

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);

  .table-header {
    font-weight: bold;
  }

  span {
    padding: 8px 4px;
    border-bottom: 2px solid black;
  }
`;

class ComboResults extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    const { sample, drugId1, drugId2 } = this.props;
    const requestBody = {
      drugId1,
      drugId2,
    };
    if (sample !== 'Any') requestBody.sample = sample;

    fetch('/api/combos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ results: data });
      });
  }

  render() {
    const { results } = this.state;
    const { drugId1, drugId2 } = this.props;
    const showBiomarker = typeof drugId2 === 'number' && <Biomarkers drugId1={drugId1} drugId2={drugId2} sourceName={results} />;
    const totalSynergyScores = results.length;
    const resultRows = results.map((synergyResult, index) => {
      const {
        tissue, sampleName, drugNameA, drugNameB, zip, bliss, loewe, hsa, sourceName,
      } = synergyResult;
      return (
        <Fragment key={index}>
          <span><Link to="/drug_combo">{tissue}</Link></span>
          <span><Link to="/drug_combo">{sampleName}</Link></span>
          <span><Link to="/drug_combo">{drugNameA}</Link></span>
          <span><Link to="/drug_combo">{drugNameB}</Link></span>
          <span><Link to="/drug_combo">{zip}</Link></span>
          <span><Link to="/drug_combo">{bliss}</Link></span>
          <span><Link to="/drug_combo">{loewe}</Link></span>
          <span><Link to="/drug_combo">{hsa}</Link></span>
          <span><Link to="/drug_combo">{sourceName}</Link></span>
        </Fragment>
      );
    });
    return (
      <Fragment>
        {showBiomarker}
        <div className="synergy-scores">
          <h2>
            Synergy Scores, N=
            {totalSynergyScores}
          </h2>
          <GridDiv>
            <span className="table-header">Tissue</span>
            <span className="table-header">Cell line</span>
            <span className="table-header">Drug A</span>
            <span className="table-header">Drug B</span>
            <span className="table-header">ZIP</span>
            <span className="table-header">Bliss</span>
            <span className="table-header">Loewe</span>
            <span className="table-header">HSA</span>
            <span className="table-header">Source</span>
            {resultRows}
          </GridDiv>
        </div>
      </Fragment>
    );
  }
}

export default ComboResults;
