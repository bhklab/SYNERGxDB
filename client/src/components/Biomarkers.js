import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import Plots from './Plots';


class Biomarkers extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      selected: {},
    };
  }

  componentDidMount() {
    const { drugId1, drugId2 } = this.props;

    fetch('/api/getBiomarkers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
    return (
      <Fragment>
        <div className="biomarkers">
          <h2>Potential Biomarkers, Top 10</h2>
          <table>
            <thead>
              <tr>
                <th>Gene Symbol</th>
                <th>One-way ANOVA P</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
        <Plots />
      </Fragment>
    );
  }
}
export default Biomarkers;
