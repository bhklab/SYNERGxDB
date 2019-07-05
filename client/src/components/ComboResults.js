/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

import Biomarkers from './Biomarkers';

const SynergyDiv = styled.div`
  grid-template-columns: repeat(9, 1fr);
  div:nth-child(2n) span {
    background-color: ${colors.trans_color_main_4};
  }
`;

const StyledRow = styled.div`
  display: contents;
  transition: ${transitions.main_trans};
  
  &:nth-child(n):hover span {
    background-color: ${colors.trans_color_main_3};
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
        idSample, tissue, sampleName, drugNameA, drugNameB, zip, bliss, loewe, hsa, sourceName, idSource, idDrugA, idDrugB,
      } = synergyResult;
      const url = {
        pathname: '/drug_combo',
        search: `?idSource=${idSource}&idDrugA=${idDrugA}&idDrugB=${idDrugB}&idSample=${idSample}`,
      };
      return (
        <StyledRow key={index}>
          <span><Link to={url}>{tissue}</Link></span>
          <span><Link to={url}>{sampleName}</Link></span>
          <span><Link to={url}>{drugNameA}</Link></span>
          <span><Link to={url}>{drugNameB}</Link></span>
          {zip >= 0.2 ? <span className="high-score"><Link to={url}>{zip}</Link></span> : <span><Link to={url}>{zip}</Link></span>}
          {bliss >= 0.2 ? <span className="high-score"><Link to={url}>{bliss}</Link></span> : <span><Link to={url}>{bliss}</Link></span>}
          {loewe >= 0.2 ? <span className="high-score"><Link to={url}>{loewe}</Link></span> : <span><Link to={url}>{loewe}</Link></span>}
          {hsa >= 0.2 ? <span className="high-score"><Link to={url}>{hsa}</Link></span> : <span><Link to={url}>{hsa}</Link></span>}
          <span><Link to={url}>{sourceName}</Link></span>
        </StyledRow>
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
          <SynergyDiv className="grid-container">
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
