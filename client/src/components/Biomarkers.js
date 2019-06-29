import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import Plots from './Plots';

const StyledBiomarkers = styled.div`
  margin: 20px auto;
`;


class Biomarkers extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      biomarkerData: false,
      selectedBiomarker: '0',
    };
    this.handleSelect = this.handleSelect.bind(this);
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
        if (data.length > 0) {
          this.setState({
            biomarkerData: true,
          });
        }
      });
  }

  handleSelect(e) {
    this.setState({
      selectedBiomarker: e.target.value,
    });
  }

  render() {
    const {
      biomarkerData, results, selectedBiomarker,
    } = this.state;
    const { drugId1, drugId2, sourceName } = this.props;
    if (biomarkerData) {
      const listOfBiomarkers = results.map((biomarker, index) => (
        <tr>
          <td>{biomarker.gene}</td>
          <td>{biomarker.p}</td>
          <td>{biomarker.name}</td>
          <td>
            <input
              type="radio"
              value={index}
              checked={index.toString() === selectedBiomarker}
              onChange={this.handleSelect}
            />
          </td>
        </tr>
      ));
      return (
        <Fragment>
          <StyledBiomarkers className="biomarkers">
            <h2>Potential Biomarkers, Top 10</h2>
            <table>
              <thead>
                <tr>
                  <th>Gene Symbol</th>
                  <th>One-way ANOVA P</th>
                  <th>Source</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {listOfBiomarkers}
              </tbody>
            </table>
          </StyledBiomarkers>
          <Plots
            idDrugA={drugId1}
            idDrugB={drugId2}
            idSource={results[selectedBiomarker].idSource}
            gene={results[selectedBiomarker].gene}
          />
        </Fragment>
      );
    }
    return null;
  }
}
export default Biomarkers;
