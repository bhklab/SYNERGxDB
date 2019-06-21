import React, { Component } from 'react';
// import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';


class ResultRow extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  componentDidMount() {
  }

  render() {
    const {
      tissue, sampleName, drugNameA, drugNameB, zip, bliss, loewe, hsa, sourceName,
    } = this.props.synergyResult;
    return (
      <tr>
        <td>{tissue}</td>
        <td>{sampleName}</td>
        <td>{drugNameA}</td>
        <td>{drugNameB}</td>
        <td>{zip}</td>
        <td>{bliss}</td>
        <td>{loewe}</td>
        <td>{hsa}</td>
        <td>{sourceName}</td>
      </tr>
    );
  }
}

export default ResultRow;
