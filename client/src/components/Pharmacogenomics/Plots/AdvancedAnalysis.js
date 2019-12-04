/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import regression from 'regression';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

import colors from '../../../styles/colors';


const PlotlyContainer = styled.div`
    height: 450px;
    width: 100%;
    display: flex;
    flex-direction: column; 
`;
const StyledExpressionProfile = styled.div`
width: 50%;
    min-width: 300px;
    display: flex
    justify-content: space-between;
    height: 450px;
`;

class ExpressionProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      layout: null,
    };
  }

  render() {
    const data = [];
    const layout = {};
    return (
      <StyledExpressionProfile>
        <PlotlyContainer>
          <Plot
            data={data}
            layout={layout}
            graphDiv="graph"
            config={{
              responsive: true,
              displayModeBar: false,
            }}
          />
        </PlotlyContainer>
      </StyledExpressionProfile>
    );
  }
}

ExpressionProfile.propTypes = {
//   selectedBiomarker: PropTypes.string.isRequired,
//   biomarkerData: PropTypes.arrayOf(PropTypes.object).isRequired,
//   dimensions: PropTypes.objectOf(PropTypes.number).isRequired,
//   xRange: PropTypes.arrayOf(PropTypes.number).isRequired,
//   yRange: PropTypes.arrayOf(PropTypes.number).isRequired,
//   defaultThreshold: PropTypes.number.isRequired,
//   updateThreshold: PropTypes.func.isRequired,
//   selectedScore: PropTypes.string.isRequired,
};


export default ExpressionProfile;
