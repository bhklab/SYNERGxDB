/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
// import styled from 'styled-components';

// import colors from '../../styles/colors';


class Plot3D extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      layout: {
        title: 'Example Plot',
        scene: {
        //   camera: { eye: { x: 1.87, y: 0.88, z: -0.64 } },
          xaxis: { title: 'Drug1 undefined' },
          yaxis: { title: 'Drug2 undefined' },
          zaxis: { title: 'Type undefined' },
        },
        autosize: true,
        margin: {
          l: 65,
          r: 50,
          b: 65,
          t: 90,
        },

      },
    };
  }

  // Methods called on loading
  componentDidMount() {
    const { data } = this.props;
    console.log(data);
    const zData = [
      [8.83, 8.89, 8.81, 8.87, 8.9, 8.87],
      [8.89, 8.94, 8.85, 8.94, 8.96, 8.92],
      [8.84, 8.9, 8.82, 8.92, 8.93, 8.91],
      [8.79, 8.85, 8.79, 8.9, 8.94, 8.92],
      [8.79, 8.88, 8.81, 8.9, 8.95, 8.92],
      [8.8, 8.82, 8.78, 8.91, 8.94, 8.92],
      [8.75, 8.78, 8.77, 8.91, 8.95, 8.92],
      [8.8, 8.8, 8.77, 8.91, 8.95, 8.94],
      [8.74, 8.81, 8.76, 8.93, 8.98, 8.99],
      [8.89, 8.99, 8.92, 9.1, 9.13, 9.11],
      [8.97, 8.97, 8.91, 9.09, 9.11, 9.11],
      [9.04, 9.08, 9.05, 9.25, 9.28, 9.27],
      [9, 9.01, 9, 9.2, 9.23, 9.2],
      [8.99, 8.99, 8.98, 9.18, 9.2, 9.19],
      [8.93, 8.97, 8.97, 9.18, 9.2, 9.18],
    ];
    const dataZ = [{
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
    }];

    this.setState({ data: dataZ });
  }

  // Render this compoenent
  render() {
    const { data, layout } = this.state;
    return (
      <div className="cumulative-container">
        <Plot
          graphDiv="graph"
          config={{ responsive: true }}
          data={data}
          layout={layout}
        />
      </div>
    );
  }
}

Plot3D.propTypes = {
  drug1: PropTypes.shape({
    name: PropTypes.string,
    idDrug: PropTypes.number,
  }).isRequired,
  drug2: PropTypes.shape({
    name: PropTypes.string,
    idDrug: PropTypes.number,
  }).isRequired,
  data: PropTypes.arrayOf(PropTypes.array)
    .isRequired,
};

export default Plot3D;
