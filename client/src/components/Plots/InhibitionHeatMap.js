/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import { ComboContext } from '../Context';

import colors from '../../styles/colors';

const StyledDiv = styled.div`
    grid-column: 2;
    grid-row: 1/3;
`;

class InhibitionHeatMap extends React.Component {
  static contextType = ComboContext

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {
        // autosize: true,
        MaxHeight: 700,
        margin: {
          l: 45,
          r: 0,
          t: 30,
          b: 40,
        },
      },

    };
  }

  componentDidMount() {
    const { data } = this.props;
    const { cellData, drugsData } = this.context;
    const plotData = [];
    const hoverData = [];
    let currentConc;

    const xData = [];
    const yData = [];
    let xCounter = 0;
    let yCounter = 0;
    const annotationData = [];

    data.forEach((item) => {
      const hoverStr = `${item.concA} µM of ${drugsData[0].name} and ${item.concB} µM of ${drugsData[1].name}`;
      annotationData.push((100 - item.raw_matrix * 100).toFixed(2));
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
    console.log(yData);
    // const xData = [...new Set(data.map(item => item.concB))];
    // const yData = [...new Set(data.map(item => item.concA))];
    const heatMap = {
      z: plotData,
      customdata: plotData,
      text: plotData,
      type: 'heatmap',
      hoverinfo: 'text',
      hovertext: hoverData,
      // hovertemplate: `%{x} µM of ${drugsData[0].name} and %{y} µM of ${drugsData[1].name}`,
      colorscale: [[0, colors.color_main_3], [1, colors.color_main_5]],
      colorbar: {
        ypad: 0,
        title: {
          text: 'Inhibition, %',
          side: 'right',
        },
      },
      zmin: 0,
      zmax: 100,
    };
    console.log(annotationData);
    const annotations = {
      x: xData,
      y: yData,
      mode: 'text',
      text: annotationData,
      type: 'scattergl',
      textfont: {
        size: 18,
      },
      hoverinfo: 'skip',
    };
    // EXPERIMENTAL CODE
    const n = 250;
    const t = 12;
    const x = [];
    const y = [];
    const z = [];
    const text = [];
    const arr = ['A', 'T', 'G', 'C'];

    for (let j = 0; j < t; j++) {
      const ztemp = [];
      for (let i = 0; i < n; i++) {
        x.push(i);
        y.push(j);
        ztemp.push(Math.floor(Math.random() * 10));
        text.push(arr[Math.floor(Math.random() * 4)]);
      }
      z.push(ztemp);
    }
    console.log(text);

    // EXPERIMENTAL CODE

    this.setState(prevState => ({
      data: [heatMap, annotations],
      layout: {
        ...prevState.layout,
        title: cellData.name,
        xaxis: {
          title: `${drugsData[0].name} (M)`,
          // type: 'log',
        },
        yaxis: {
          title: `${drugsData[1].name} (M)`,
          // type: 'log',
        },
        annotations: [],
      },
    }));
  }

  // Render this compoenent
  render() {
    const { data, layout } = this.state;
    return (
      <StyledDiv>
        <Plot data={data} layout={layout} config={{ responsive: true }} />
      </StyledDiv>
    );
  }
}

InhibitionHeatMap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    concA: PropTypes.number.isRequired,
    concB: PropTypes.number.isRequired,
  })).isRequired,
};

export default InhibitionHeatMap;
