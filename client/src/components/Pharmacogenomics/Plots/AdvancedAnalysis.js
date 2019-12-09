/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import regression from 'regression';

import colors from '../../../styles/colors';


const PlotlyContainer = styled.div`
    height: 450px;
    width: 100%;
    display: flex;
    flex-direction: column; 
`;
const StyledExpressionProfile = styled.div`
    max-width: 600px;
    width: 100%;
    min-width: 300px;
    display: flex
    justify-content: space-between;
    height: 450px;
`;

class AdvancedAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      layout: null,
    };
  }

  // Methods called on loading
  componentDidMount() {
    this.updatePlotData();
  }

  componentDidUpdate(prevProps) {
    const { selectedBiomarker, selectedScore, biomarkerData } = this.props;
    if (selectedBiomarker !== prevProps.selectedBiomarker
      || selectedScore !== prevProps.selectedScore) {
      this.updatePlotData();
    }
    if (biomarkerData !== prevProps.biomarkerData) {
      this.updatePlotData();
    }
  }


  updatePlotData() {
    const {
      biomarkerData, selectedBiomarker, dimensions, xRange, yRange, selectedScore,
      drug1, drug2, accessor,
    } = this.props;
    // calculates coefficients for best fit line

    const regressionData = biomarkerData.map(item => [item[accessor], item[selectedScore]]);
    const bestFitCoefficients = regression.linear(regressionData);

    const datapoints = {
      x: biomarkerData.map(item => item[accessor]),
      y: biomarkerData.map(item => item[selectedScore]),
      name: 'Cell line',
      marker: {
        color: colors.color_main_2,
        size: 7,
      },
      showlegend: false,
      mode: 'markers',
      type: 'scatter',
      hoverinfo: 'text',
      hovertext: biomarkerData.map(item => `${item[accessor]} (${item.cellName})`),
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
      height: 450,
      autosize: true,
      title: {
        text: `Drug ${drug1} + ${drug2} ${selectedScore.toUpperCase()} x ${selectedBiomarker}`,
        font: {
          family: 'Nunito Sans, sans-serif',
          color: colors.color_main_1,
          size: 18,
        },
      },
      font: {
        size: 16,
        color: colors.nav_links,
        family: 'Raleway',
      },
      margin: {
        l: dimensions.left,
        r: 10,
        t: dimensions.top,
        b: dimensions.bottom,
      },
      hovermode: 'closest',
      xaxis: {
        title: {
          text: accessor.toUpperCase(),
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
          text: selectedScore.toUpperCase(),
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
    };
    this.setState({ data, layout });
  }

  render() {
    const {
      data, layout,
    } = this.state;

    let displayData;
    if (data) {
      displayData = data;
    }
    return (
      <StyledExpressionProfile>
        <PlotlyContainer>
          <Plot
            data={displayData}
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

AdvancedAnalysis.propTypes = {
  selectedBiomarker: PropTypes.string.isRequired,
  biomarkerData: PropTypes.arrayOf(PropTypes.object).isRequired,
  dimensions: PropTypes.objectOf(PropTypes.number).isRequired,
  xRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  yRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedScore: PropTypes.string.isRequired,
  drug1: PropTypes.string.isRequired,
  drug2: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
};


export default AdvancedAnalysis;
