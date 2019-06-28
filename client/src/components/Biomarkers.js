import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import Plots from './Plots';


class Biomarkers extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      biomarkerData: false,
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
        this.setState({ results: data });
        if (data.length > 0) this.setState({ biomarkerData: true });
      });
  }

  render() {
    const { biomarkerData, results } = this.state;
    if (biomarkerData) {
      const listOfBiomarkers = results.map(biomarker => (
        <tr>
          <th>{biomarker.gene}</th>
          <th>{biomarker.p}</th>
          <th>{biomarker.name}</th>
        </tr>
      ));
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
              <tbody>
                {listOfBiomarkers}
              </tbody>
            </table>
          </div>
          <Plots />
        </Fragment>
      );
    }
    return null;
  }
}
export default Biomarkers;
