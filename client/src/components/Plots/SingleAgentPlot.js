/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ComboContext } from '../Context/ComboContext';
import colors from '../../styles/colors';

const StyledDiv = styled.div`
    width: 50%;
`;

const standarizeData = (num) => {
  let output = num;
  if (output > 100) output = 100;
  if (output < 0) output = 0;
  return output;
};

// This plot is just a prototype (viability data has to be found)
class SingleAgentPlot extends React.Component {
  static contextType = ComboContext

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {},
    };
  }

  componentDidMount() {
    const { drugA } = this.props;
    const { synergyData, cellData, drugsData } = this.context;
    const monoDrugData = synergyData.filter(item => (drugA ? item.concB === 0 : item.concA === 0));
    monoDrugData.shift();
    const inhibData = monoDrugData.map(item => standarizeData(item.raw_matrix * 100));
    const concData = monoDrugData.map(item => (drugA ? item.concA : item.concB));
    const drugName = drugA ? drugsData[0].name : drugsData[1].name;
    const hoverData = monoDrugData.map(item => `${standarizeData(item.raw_matrix * 100).toFixed(2)}% viability (${drugA ? item.concA : item.concB} µM ${drugName})`);
    const data = [{
      type: 'scatter',
      x: concData,
      y: inhibData,
      line: {
        color: colors.color_main_1,
        shape: 'spline',
        smoothing: 1.3,
      },
      hoverinfo: 'text',
      hovertext: hoverData,
    }];
    const layout = {
      title: {
        text: `${cellData.name} treated with ${drugName}`,
        font: {
          family: 'Nunito Sans, sans-serif',
          color: colors.color_main_1,
          size: 18,
        },
      },
      autosize: true,
      height: 250,
      margin: {
        l: 50,
        r: 0,
        t: 30,
        b: 55,
      },
      xaxis: {
        title: {
          text: 'Concentration (µM)',
          font: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 16,
          },
        },
        color: colors.color_main_1,
        tickcolor: colors.color_main_1,
        linecolor: colors.color_main_1,
        fixedrange: true,
        type: 'log',
        tickmode: 'array',
        tickvals: concData,
        ticktext: concData,
        tickfont: {
          family: 'Nunito Sans, sans-serif',
          color: colors.color_main_1,
          size: 13,
        },
      },
      yaxis: {
        title: {
          text: 'Viablity (%)',
          font: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 16,
          },
        },
        color: colors.color_main_1,
        tickcolor: colors.color_main_1,
        linecolor: colors.color_main_1,
        range: [0, 105],
        fixedrange: true,
        tickfont: {
          family: 'Nunito Sans, sans-serif',
          color: colors.color_main_1,
          size: 13,
        },
      },
    };
    this.setState({ data, layout });
  }

  // Render this compoenent
  render() {
    const { data, layout } = this.state;
    return (
      <StyledDiv>
        <Plot
          graphDiv="graph"
          config={{
            responsive: true,
            displayModeBar: false,
          }}
          data={data}
          layout={layout}
        />
      </StyledDiv>
    );
  }
}

SingleAgentPlot.propTypes = {
  drugA: PropTypes.bool.isRequired,
};

export default SingleAgentPlot;
