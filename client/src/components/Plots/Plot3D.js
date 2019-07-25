/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import colors from '../../styles/colors';

const PlotlyContainer = styled.div`
    min-height: 50vh;
`;

const types = [
  { name: 'Bliss', color: colors.color_main_2 },
  { name: 'Loewe', color: colors.color_main_1 },
  { name: 'HSA', color: colors.color_main_4 },
  { name: 'ZIP', color: colors.color_main_5 },
];


class Plot3D extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {
        title: {
          text: types[props.type - 1].name,
          size: 18,
        },
        type: 'surface',
        scene: {
        //   camera: { eye: { x: 1.87, y: 0.88, z: -0.64 } },
          xaxis: { title: `${props.drug1.name}` },
          yaxis: { title: `${props.drug2.name}` },
          zaxis: { title: types[props.type - 1].name },
        },
        // autosize: true,
        margin: {
          l: 65,
          r: 50,
          b: 65,
          t: 90,
        },
        paper_bgcolor: colors.summary_bg_trans,
        plot_bgcolor: colors.trans_color_accent_2,
      },
    };
    this.focusOnPlot = React.createRef();
  }

  // Methods called on loading
  componentDidMount() {
    const { data, type } = this.props;
    console.log(data);
    const zData = [
      [8.83, 8.89, 8.81, 8.87],
      [8.89, 8.94, 8.85, 8.94],
      [8.84, 8.9, 8.82, 8.92],
      [8.79, 8.85, 8.79, 8.9],
    ];
    const xData = [...new Set(data.map(item => item.concA))];
    const yData = [...new Set(data.map(item => item.concB))];
    const dataZ = [{
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
        x: 95,
      },
    }];

    this.setState({ data: dataZ });
    this.refs.focusOnPlot.focus();
  }

  componentDidUpdate(prevProps) {
    const { data, type } = this.props;
    // Always check if new props are different before updating state to avoid infinite loops
    if (type !== prevProps.type) {
      const zData = [
        [8.83, 8.89, 8.81, 8.87],
        [8.89, 8.94, 8.85, 8.94],
        [8.84, 8.9, 8.82, 8.92],
        [8.79, 8.85, 8.79, 8.9],
      ];
      const xData = [...new Set(data.map(item => item.concA))];
      const yData = [...new Set(data.map(item => item.concB))];

      const dataZ = [{
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
          x: 95,
        },
      }];
      this.setState({ data: dataZ });
      this.refs.focusOnPlot.focus();
      console.log(this.refs);
    }
  }

  // Render this compoenent
  render() {
    const { data, layout } = this.state;
    return (
      <Fragment>
        <PlotlyContainer className="cumulative-container">
          <Plot
            graphDiv="graph"
            config={{ responsive: true }}
            data={data}
            layout={layout}
          />
        </PlotlyContainer>
        <div><span ref={this.focusOnPlot}>F</span></div>
      </Fragment>
    );
  }
}

Plot3D.propTypes = {
  type: PropTypes.number
    .isRequired,
  drug1: PropTypes.shape({
    name: PropTypes.string,
    idDrug: PropTypes.number,
  }).isRequired,
  drug2: PropTypes.shape({
    name: PropTypes.string,
    idDrug: PropTypes.number,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    concA: PropTypes.number.isRequired,
    concB: PropTypes.number.isRequired,
  }))
    .isRequired,
};

export default Plot3D;
