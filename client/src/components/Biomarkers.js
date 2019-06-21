import React, { Component } from 'react';
// import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';


const Biomarker = (props) => {
  const {
    tissue, sampleName, drugNameA, drugNameB, zip, bliss, loewe, hsa, sourceName,
  } = props.synergyResult;
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
};

export default Biomarker;
