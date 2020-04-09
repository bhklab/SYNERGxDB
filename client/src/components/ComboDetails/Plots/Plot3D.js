/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import colors from '../../../styles/colors';
import { ComboContext } from '../Context/ComboContext';

const PlotlyContainer = styled.div`
    min-height: 450px;
`;

const types = [
  { name: 'Bliss', color: colors.color_main_2, accessor: 'bliss_matrix' },
  { name: 'Loewe', color: colors.color_main_1, accessor: 'loewe_matrix' },
  { name: 'HSA', color: colors.color_main_4, accessor: 'hsa_matrix' },
  { name: 'ZIP', color: colors.color_main_5, accessor: 'zip_matrix' },
];


class Plot3D extends React.Component {
  static contextType = ComboContext

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {},
      display: false,
    };
  }

  // Methods called on loading
  componentDidMount() {
    this.updatePlotData();
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props;
    // Always check if new props are different before updating state to avoid infinite loops
    if (type !== prevProps.type) {
      this.updatePlotData();
    }
  }

  checkDataValidity(xData, yData) {
    if (xData.length < 2 || (xData.length === 2 && xData[0] === 0)) {
      this.setState({ display: false });
      return false;
    }
    if (yData.length < 2 || (yData.length === 2 && yData[0] === 0)) {
      this.setState({ display: false });
      return false;
    }
    this.setState({ display: true });
    return true;
  }

  updatePlotData() {
    const {
      data, type,
    } = this.props;
    const { drugsData } = this.context;
    const xData = [...new Set(data.map(item => item.concB))];
    const yData = [...new Set(data.map(item => item.concA))];

    // Checks if the data enough to render a 3D plot
    if (this.checkDataValidity(xData, yData)) {
      const zData = [];
      let currentConc;
      data.forEach((item) => {
        if (item.concA === currentConc) {
          zData[zData.length - 1].push(item[types[type - 1].accessor] * 100);
        } else {
          zData.push([item[types[type - 1].accessor] * 100]);
          currentConc = item.concA;
        }
      });
      const plotData = [{
        x: xData,
        y: yData,
        z: zData,
        type: 'surface',
        contours: {
          z: {
            show: true,
            usecolormap: true,
            highlightcolor: '#42f462',
            project: { z: true },
          },
        },
        colorscale: [[0, `${colors.color_accent_1}`], [1, `${types[type - 1].color}`]],
        colorbar: {
          exponentformat: 'E',
        },
      }];
      const layout = {
        margin: {
          l: 0,
          r: 0,
          t: 0,
          b: 0,
        },
        title: {
          text: types[type - 1].name,
          size: 18,
        },
        scene: {
          camera: {
            eye: { x: -1.75, y: -1.75, z: 0.25 },
          },
          domain: {
            x: [0, 2],
          },
          xaxis: {
            title: `${drugsData[0].name}`,
            type: 'log',
            tickmode: 'array',
            tickvals: xData,
            ticktext: xData,
            // showticklabels: false,
            showspikes: false,
          },
          yaxis: {
            title: `${drugsData[1].name}`,
            type: 'log',
            tickmode: 'array',
            tickvals: yData,
            ticktext: yData,
            // showticklabels: false,
            showspikes: false,
          },
          zaxis: { title: types[type - 1].name },
        },
        autosize: true,
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
      };
      this.setState({ data: plotData, layout });
    }
  }

  // Render this compoenent
  render() {
    const { data, layout, display } = this.state;
    return display ? (
      <PlotlyContainer>
        <Plot
          graphDiv="graph"
          config={{ responsive: true }}
          data={data}
          layout={layout}
        />
      </PlotlyContainer>
    ) : null;
  }
}

Plot3D.propTypes = {
  type: PropTypes.number
    .isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    concA: PropTypes.number.isRequired,
    concB: PropTypes.number.isRequired,
  }))
    .isRequired,
};

export default Plot3D;
