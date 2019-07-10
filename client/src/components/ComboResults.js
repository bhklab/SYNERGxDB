/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

import Biomarkers from './Biomarkers';

const SynergyDiv = styled.div`
  grid-template-columns: repeat(9, 1fr);
  border-bottom: solid 2px black;
  margin: 10px 0;
  div:nth-child(2n) span {
    background-color: ${colors.trans_color_main_3};
  }
`;

const StyledRow = styled.div`
  display: contents;
  transition: ${transitions.main_trans};
  
  &:nth-child(n):hover span {
    background-color: ${colors.trans_color_main_4};
  }
`;

class ComboResults extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      drugId1: null,
      drugId2: null,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const { sample, drugId1, drugId2 } = requestParams;
    const requestBody = {
      drugId1: parseInt(drugId1, 10),
      drugId2: parseInt(drugId2, 10),
    };
    this.setState({
      drugId1: parseInt(drugId1, 10),
      drugId2: parseInt(drugId2, 10),
    });
    if (sample !== 'Any') requestBody.sample = parseInt(sample, 10);
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
    const { results, drugId1, drugId2 } = this.state;
    const showBiomarker = typeof drugId2 === 'number' && <Biomarkers drugId1={drugId1} drugId2={drugId2} sourceName={results} />;
    const totalSynergyScores = results.length;
    const resultRows = results.map((synergyResult, index) => {
      const {
        idSample, tissue, sampleName, drugNameA, drugNameB, sourceName, idSource, idDrugA, idDrugB,
      } = synergyResult;
      let {
        zip, bliss, loewe, hsa,
      } = synergyResult;
      zip = zip && zip.toFixed(4);
      bliss = bliss && bliss.toFixed(4);
      loewe = loewe && loewe.toFixed(4);
      hsa = hsa && hsa.toFixed(4);
      const url = {
        pathname: '/drug_combo',
        search: `?idSource=${idSource}&idDrugA=${idDrugA}&idDrugB=${idDrugB}&idSample=${idSample}`,
      };
      return (
        <StyledRow key={index}>
          <Link to={url} style={{ display: 'contents' }}>
            <span>{tissue.toUpperCase()}</span>
            <span>{sampleName.toUpperCase()}</span>
            <span>{drugNameA}</span>
            <span>{drugNameB}</span>
            {zip >= 0.2 ? <span className="high-score">{zip}</span> : <span>{zip}</span>}
            {bliss >= 0.2 ? <span className="high-score">{bliss}</span> : <span>{bliss}</span>}
            {loewe >= 0.2 ? <span className="high-score">{loewe}</span> : <span>{loewe}</span>}
            {hsa >= 0.2 ? <span className="high-score">{hsa}</span> : <span>{hsa}</span>}
            <span>{sourceName}</span>
          </Link>
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
