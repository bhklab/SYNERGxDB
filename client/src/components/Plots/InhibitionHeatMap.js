/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import { ComboContext } from '../Context/ComboContext';

import colors from '../../styles/colors';

const StyledDiv = styled.div`
    grid-column: 2;
    grid-row: 1/3;
    .js-plotly-plot {
      height: 100%;
    }
`;


const standarizeData = (num) => {
  if (num !== null) {
    const output = num * 100;
    if (output > 100) return '100';
    if (output < 0) return '0';
    return output.toFixed(2);
  }
  return '-';
};

class ViabilityHeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {
        autosize: true,
        margin: {
          l: 75,
          r: 0,
          t: 30,
          b: 50,
        },
      },

    };
  }


  componentDidMount() {
    const { synergyData } = this.context;
    const { cellData, drugsData } = this.context;
    const plotData = [];
    const hoverData = [];
    let currentConc;

    const xData = [];
    const yData = [];
    let xCounter = 0;
    let yCounter = 0;
    const annotationData = [];

    synergyData.forEach((item) => {
      const hoverStr = `${item.concA} µM of ${drugsData[0].name} and ${item.concB} µM of ${drugsData[1].name}`;
      annotationData.push(standarizeData(item.raw_matrix));
      if (item.concA === currentConc) {
        plotData[plotData.length - 1].push(100 - item.raw_matrix * 100);
        hoverData[hoverData.length - 1].push(hoverStr);
        xCounter++;
        xData.push(xCounter);
        yData.push(yCounter - 1);
      } else {
        plotData.push([100 - item.raw_matrix * 100]);
        hoverData.push([hoverStr]);
        currentConc = item.concA;
        xCounter = 0;
        yCounter++;
        xData.push(xCounter);
        yData.push(yCounter - 1);
      }
    });
    const heatMap = {
      z: plotData,
      customdata: plotData,
      text: plotData,
      type: 'heatmap',
      hoverinfo: 'text',
      hovertext: hoverData,
      colorscale: [[0, colors.red_color_accent], [1, colors.color_main_3]],
      reversescale: true,
      colorbar: {
        tickcolor: colors.color_main_1,
        tickfont: {
          family: 'Nunito Sans, sans-serif',
          color: colors.color_main_1,
          size: 13,
        },
        tickvals: [0, 20, 40, 60, 80, 100],
        ticktext: [100, 80, 60, 40, 20, 0],
        ypad: 0,
        title: {
          text: 'Viability, %',
          side: 'right',
          font: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 16,
          },
        },
      },
      zmin: 0,
      zmax: 100,
    };
    const annotations = {
      x: xData,
      y: yData,
      mode: 'text',
      text: annotationData,
      type: 'scattergl',
      font: {
        family: 'Nunito Sans, sans-serif',
        color: colors.color_main_1,
        size: 18,
      },
      hoverinfo: 'skip',
    };

    this.setState(prevState => ({
      data: [heatMap, annotations],
      layout: {
        ...prevState.layout,
        title: {
          text: cellData.name,
          font: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 18,
          },
        },
        xaxis: {
          fixedrange: true,
          title: {
            text: `${drugsData[1].name} (µM)`,
            font: {
              family: 'Nunito Sans, sans-serif',
              color: colors.color_main_1,
              size: 16,
            },
          },
          tickmode: 'array',
          tickvals: [...new Set(xData)],
          ticktext: [...new Set(synergyData.map(item => item.concB))],
          tickfont: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 13,
          },
        },
        yaxis: {
          fixedrange: true,
          title: {
            text: `${drugsData[0].name} (µM)`,
            font: {
              family: 'Nunito Sans, sans-serif',
              color: colors.color_main_1,
              size: 16,
            },
          },
          tickmode: 'array',
          tickvals: [...new Set(yData)],
          ticktext: [...new Set(synergyData.map(item => item.concA))],
          tickfont: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 13,
          },
        },
      },
    }));
  }

  static contextType = ComboContext

  // Render this compoenent
  render() {
    const { data, layout } = this.state;
    return (
      <StyledDiv>
        <Plot
          data={data}
          layout={layout}
          config={{
            responsive: true,
            displayModeBar: false,
          }}
        />
      </StyledDiv>
    );
  }
}

export default ViabilityHeatMap;
