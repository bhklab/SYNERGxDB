/* eslint-disable react/prop-types */
import React from 'react';
import Plot from 'react-plotly.js';

import colors from '../../styles/colors';

export default class BiomarkerPlot extends React.Component {
  // Defining initial state and layout
  constructor(props) {
    super(props);

    this.state = {
      bliss:
        {
          x: [1, 2, 3],
          type: 'histogram',
          cumulative: { enabled: true },
          marker: { color: colors.color_main_2 },
        },
      loewe:
        {
          x: [1, 2, 3],
          type: 'histogram',
          cumulative: { enabled: true },
          marker: { color: colors.color_main_3 },
        },
      hsa:
        {
          x: [1, 2, 3],
          type: 'histogram',
          cumulative: { enabled: true },
          marker: { color: colors.color_main_4 },
        },
      zip:
        {
          x: [1, 2, 3],
          type: 'histogram',
          cumulative: { enabled: true },
          marker: { color: colors.color_main_5 },
        },
    };
  }

  // Methods called on loading
  componentDidMount() {

  }

  // Render this compoenent
  render() {
    const {
      bliss, loewe, hsa, zip,
    } = this.state;
    const data = [bliss, loewe, hsa, zip];
    const layout = {
      width: 320, height: 240, title: 'A Fancy Cumulative Plot',
    };
    return (
      <div className="cumulative-container">
        <Plot data={data} layout={layout} graphDiv="graph" config={{ responsive: true }} />
      </div>
    );
  }
}
