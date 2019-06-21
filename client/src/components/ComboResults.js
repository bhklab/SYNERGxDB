/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import ResultRow from './ResultRow';
import Plots from './Plots';
import Biomarkers from './Biomarkers';


class ComboResults extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      selected: {},
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(event) {
    event.preventDefault();
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
    const totalSynergyScores = results.length;
    const resultRows = results.map((synergyResult, index) => <ResultRow synergyResult={synergyResult} key={index} />);
    return (
      <Fragment>
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
