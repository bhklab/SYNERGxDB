/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import regression from 'regression';

import colors from '../../styles/colors';


const PlotlyContainer = styled.div`
    min-height: 450px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column; 
`;

class ExpressionProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      layout: null,
    };
  }

  // Methods called on loading
  componentDidMount() {
    const {
      biomarkerData, selectedBiomarker, dimensions, xRange, yRange,
    } = this.props;

    console.log(biomarkerData);
    // calculates coefficients for best fit line
    const regressionData = Object.values(biomarkerData).map(item => [item.fpkm, item.zip]);
    const bestFitCoefficients = regression.linear(regressionData);

    const datapoints = {
      x: Object.values(biomarkerData).map(item => item.fpkm),
      y: Object.values(biomarkerData).map(item => item.zip),
      name: 'Cell line',
      marker: {
        color: colors.color_main_2,
        size: 7,
      },
      showlegend: false,
      mode: 'markers',
      type: 'scatter',
      hoverinfo: 'text',
      hovertext: Object.values(biomarkerData).map(item => `${item.fpkm} (${item.cellName})`),
    };
    const data = [datapoints];
    // Renders best fit line using previously calculated coefficients
    const bestFitLine = {
      x: xRange,
      y: [
        xRange[0] * bestFitCoefficients.equation[0] + bestFitCoefficients.equation[1],
        xRange[1] * bestFitCoefficients.equation[0] + bestFitCoefficients.equation[1],
      ],
      mode: 'lines',
      type: 'scatter',
      showlegend: false,
      marker: {
        color: colors.color_main_5,
      },
      hoverinfo: 'none',
    };
    data.unshift(bestFitLine);
    const layout = {
      title: {
        text: `ZIP x ${selectedBiomarker}`,
        font: {
          family: 'Nunito Sans, sans-serif',
          color: colors.color_main_1,
          size: 18,
        },
      },
      margin: {
        l: 50,
        r: 10,
        t: dimensions.top,
        b: dimensions.bottom,
      },
      autosize: true,
      height: 450,
      hovermode: 'closest',
      xaxis: {
        title: {
          text: 'FPKM',
          font: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 16,
          },
        },
        color: colors.color_main_1,
        tickcolor: colors.color_main_1,
        linecolor: colors.color_main_1,
        range: xRange,
        fixedrange: true,
        mirror: true,
        font: {
          size: 16,
          color: colors.nav_links,
          family: 'Raleway',
        },
        linewidth: 3,
      },
      yaxis: {
        title: {
          text: 'Synergy Score',
          font: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 16,
          },
        },
        color: colors.color_main_1,
        tickcolor: colors.color_main_1,
        linecolor: colors.color_main_1,
        range: yRange,
        fixedrange: true,
        mirror: true,
        linewidth: 3,
        tickfont: {
          family: 'Nunito Sans, sans-serif',
          color: colors.color_main_1,
          size: 13,
        },
      },
      font: {
        size: 16,
        color: colors.nav_links,
        family: 'Raleway',
      },
    };
    this.setState({ data, layout });
  }

  render() {
    const {
      data, layout,
    } = this.state;
    return (
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
    );
  }
}

ExpressionProfile.propTypes = {
  selectedBiomarker: PropTypes.string.isRequired,
  biomarkerData: PropTypes.objectOf(PropTypes.object).isRequired,
  dimensions: PropTypes.objectOf(PropTypes.number).isRequired,
  xRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  yRange: PropTypes.arrayOf(PropTypes.number).isRequired,
};


export default ExpressionProfile;
