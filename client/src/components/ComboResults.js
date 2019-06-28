/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import ResultRow from './ResultRow';
import Biomarkers from './Biomarkers';


class ComboResults extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    const { sample, drugId1, drugId2 } = this.props;
    fetch('/api/getCombos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sample,
        drugId1,
        drugId2,
      }),
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ results: data });
      });
  }

  render() {
    const { results } = this.state;
    console.log(results)
    const { drugId1, drugId2 } = this.props;
    const showBiomarker = typeof drugId2 === 'number' && <Biomarkers drugId1={drugId1} drugId2={drugId2} sourceName={results} />;
    const totalSynergyScores = results.length;
    const resultRows = results.map((synergyResult, index) => <ResultRow synergyResult={synergyResult} key={index} />);
    return (
      <Fragment>
        {showBiomarker}
        <div className="synergy-scores">
          <h2>
            Synergy Scores, N=
            {totalSynergyScores}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Tissue</th>
                <th>Cell line</th>
                <th>Drug A</th>
                <th>Drug B</th>
                <th>ZIP</th>
                <th>Bliss</th>
                <th>Loewe</th>
                <th>HSA</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {resultRows}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default ComboResults;
