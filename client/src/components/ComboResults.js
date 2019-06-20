/* eslint-disable no-console */
import React, { Component } from 'react';
// import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import ResultRow from './ResultRow';


class ComboResults extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      selected: {},
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
    const resultRows = results.map(synergyResult => <ResultRow synergyResult={synergyResult} />);
    return (
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
    );
  }
}

export default ComboResults;
