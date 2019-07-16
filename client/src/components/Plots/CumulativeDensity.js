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
        xaxis: { title: 'Synergy Score (Cell Lines, N=60)' },
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
      loewe:
        {
          x: generateDataset(0.5),
          name: 'Loewe',
          opacity: 0.5,
          type: 'histogram',
          cumulative: { enabled: true },
          marker: { color: colors.color_main_3 },
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
      zip:
        {
          x: generateDataset(1.3),
          type: 'histogram',
          name: 'ZIP',
          opacity: 0.5,
          cumulative: { enabled: true },
          marker: { color: colors.color_main_5 },
        },
    });
  }

  // Render this compoenent
  render() {
    const {
      bliss, loewe, hsa, zip, layout,
    } = this.state;
    const data = [bliss, loewe, hsa, zip];
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
