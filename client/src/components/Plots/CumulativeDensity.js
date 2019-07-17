import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

import colors from '../../styles/colors';

const generateDataset = (factor) => {
  const output = [];
  for (let i = 0; i < 500; i++) {
    output[i] = Math.random() * factor;
  }
  return output;
};

class CumulativeDensity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bliss: {},
      loewe: {},
      hsa: {},
      zip: {},
      layout: {
        height: 450,
        paper_bgcolor: colors.trans_color_main_3,
        plot_bgcolor: colors.trans_color_main_3,
        yaxis: { title: 'Cumulative density' },
        xaxis: { title: 'Synergy Score (Cell Lines, N=undefined)' },
        barmode: 'overlay',
        font: {
          size: 16,
          color: '#000000',
          family: 'Raleway',
        },
        title: {
          text: `${props.drug1} * ${props.drug2}`,
          size: 18,
        },
      },
    };
  }

  // Methods called on loading
  componentDidMount() {
    this.setState({
      bliss: {
        x: generateDataset(1),
        name: 'Bliss',
        opacity: 0.5,
        type: 'histogram',
        cumulative: { enabled: true },
        marker: { color: colors.color_main_2 },
      },
      blissMarker: {
        x: [0.5],
        y: [250],
        showlegend: false,
        marker: { color: colors.color_main_2, size: 15 },
        mode: 'markers',
        type: 'scatter',
      },
      loewe:
        {
          x: generateDataset(0.5),
          name: 'Loewe',
          opacity: 0.5,
          type: 'histogram',
          cumulative: { enabled: true },
          marker: { color: colors.color_main_3 },
        },
      loeweMarker: {
        x: [0.25],
        y: [250],
        showlegend: false,
        marker: { color: colors.color_main_3, size: 15 },
        mode: 'markers',
        type: 'scatter',
      },
      hsa:
        {
          x: generateDataset(1.8),
          name: 'HSA',
          type: 'histogram',
          opacity: 0.5,
          cumulative: { enabled: true },
          marker: { color: colors.color_main_4 },
        },
      hsaMarker: {
        x: [0.9],
        y: [250],
        showlegend: false,
        marker: { color: colors.color_main_4, size: 15 },
        mode: 'markers',
        type: 'scatter',
      },
      zip:
        {
          x: generateDataset(1.3),
          type: 'histogram',
          name: 'ZIP',
          opacity: 0.5,
          cumulative: { enabled: true },
          marker: { color: colors.color_main_5 },
        },
      zipMarker: {
        x: [0.65],
        y: [250],
        showlegend: false,
        marker: { color: colors.color_main_5, size: 15 },
        mode: 'markers',
        type: 'scatter',
      },
    });
  }

  // Render this compoenent
  render() {
    const {
      bliss, loewe, hsa, zip, blissMarker, loeweMarker, hsaMarker, zipMarker, layout,
    } = this.state;
    const data = [bliss, blissMarker, loewe, loeweMarker, hsa, hsaMarker, zipMarker, zip];
    return (
      <div className="cumulative-container">
        <Plot data={data} layout={layout} graphDiv="graph" config={{ responsive: true }} />
      </div>
    );
  }
}

CumulativeDensity.propTypes = {
  drug1: PropTypes.string.isRequired,
  drug2: PropTypes.string.isRequired,
};

export default CumulativeDensity;