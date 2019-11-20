/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import regression from 'regression';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

import colors from '../../styles/colors';

const CustomSlider = withStyles({
  root: {
    color: colors.color_main_2,
    height: 8,
  },
})(Slider);


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
      customThreshold: null,
    };
  }

  // Methods called on loading
  componentDidMount() {
    this.updatePlotData();
  }

  componentDidUpdate(prevProps) {
    const { selectedBiomarker, selectedScore } = this.props;
    if (selectedBiomarker !== prevProps.selectedBiomarker
      || selectedScore !== prevProps.selectedScore) {
      this.updatePlotData();
    }
  }


  updatePlotData() {
    const {
      biomarkerData, selectedBiomarker, dimensions, xRange, yRange, selectedScore,
    } = this.props;
    // calculates coefficients for best fit line

    const regressionData = Object.values(biomarkerData)
      .map(item => [item.fpkm, item[selectedScore]]);
    const bestFitCoefficients = regression.linear(regressionData);

    const datapoints = {
      x: Object.values(biomarkerData).map(item => item.fpkm),
      y: Object.values(biomarkerData).map(item => item[selectedScore]),
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
      height: 450,
      autosize: true,
      title: {
        text: `${selectedScore.toUpperCase()} x ${selectedBiomarker}`,
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
    };
    this.setState({ data, layout, customThreshold: null });
  }

  render() {
    const {
      data, layout, customThreshold,
    } = this.state;
    const { defaultThreshold } = this.props;
    const { xRange, yRange, updateThreshold } = this.props;

    const threshold = customThreshold !== null ? customThreshold : defaultThreshold;
    const thresholdLine = {
      x: xRange,
      y: [
        threshold,
        threshold,
      ],
      mode: 'lines',
      type: 'scatter',
      showlegend: false,
      marker: {
        color: 'black',
      },
      hoverinfo: 'none',
    };
    let displayData;
    if (data) {
      displayData = [...data, thresholdLine];
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
        <div className="slider">
          <CustomSlider
            orientation="vertical"
            value={threshold}
            min={Math.round(yRange[0] * 100) / 100}
            max={Math.round(yRange[1] * 100) / 100}
            aria-labelledby="vertical-discrete-slider-restrict"
            step={Math.round(((yRange[1] - yRange[0]) / 100) * 100) / 100}
            valueLabelDisplay="auto"
            onChange={(e, value) => this.setState({ customThreshold: value })}
            onChangeCommitted={(e, value) => updateThreshold(e, value)}
          />
        </div>
      </StyledExpressionProfile>
    );
  }
}

ExpressionProfile.propTypes = {
  selectedBiomarker: PropTypes.string.isRequired,
  biomarkerData: PropTypes.objectOf(PropTypes.object).isRequired,
  dimensions: PropTypes.objectOf(PropTypes.number).isRequired,
  xRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  yRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  defaultThreshold: PropTypes.number.isRequired,
  updateThreshold: PropTypes.func.isRequired,
  selectedScore: PropTypes.string.isRequired,
};


export default ExpressionProfile;
