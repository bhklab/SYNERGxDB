/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import Biomarkers from './Biomarkers';

const SynergyDiv = styled.div`
  width: 100%;   
  display: grid;
  grid-template-columns: repeat(9, 1fr);

  .table-header {
    font-weight: bold;
    border-bottom: 2px solid black;
  }

  span {
    padding: 8px 4px;

    &:nth-child(18n-8),
    &:nth-child(18n-7),
    &:nth-child(18n-6),
    &:nth-child(18n-5),
    &:nth-child(18n-4),
    &:nth-child(18n-3),
    &:nth-child(18n-2),
    &:nth-child(18n-1),
    &:nth-child(18n) {
      background-color: ${colors.trans_color_main_4};
    }
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
        idSample, tissue, sampleName, drugNameA, drugNameB, zip, bliss, loewe, hsa, sourceName, sourceId, idDrugA, idDrugB,
      } = synergyResult;
      const url = {
        pathname: '/drug_combo',
        search: `?sourceId=${sourceId}&idDrugA=${idDrugA}&idDrugB=${idDrugB}&idSample=${idSample}`,
      };
      return (
        <Fragment key={index}>
          <span><Link to={url}>{tissue}</Link></span>
          <span><Link to={url}>{sampleName}</Link></span>
          <span><Link to={url}>{drugNameA}</Link></span>
          <span><Link to={url}>{drugNameB}</Link></span>
          <span><Link to={url}>{zip}</Link></span>
          <span><Link to={url}>{bliss}</Link></span>
          <span><Link to={url}>{loewe}</Link></span>
          <span><Link to={url}>{hsa}</Link></span>
          <span><Link to={url}>{sourceName}</Link></span>
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
          <SynergyDiv>
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
          </SynergyDiv>
        </div>
      </Fragment>
    );
  }
}

export default ComboResults;
