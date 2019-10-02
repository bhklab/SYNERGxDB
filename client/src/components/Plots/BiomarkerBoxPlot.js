import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import colors from '../../styles/colors';

const StyledContainer = styled.div`
  width: 50%;
`;

export default class BiomarkerBoxPlot extends React.Component {
  // Defining initial state and layout
  constructor(props) {
    super(props);

    this.state = {
      boxHigh: null,
      boxLow: null,
      layout: {
        height: 450,
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        yaxis: { title: 'FPKM' },
        xaxis: { title: 'Interaction Type' },
        showlegend: false,
        font: {
          size: 16,
          color: colors.nav_links,
          family: 'Nunito Sans',
        },
        title: {
          text: 'One-way ANOVA, p-val=',
          size: 18,
        },
      },
    };
  }

  // Methods called on loading
  componentDidMount() {
    const dataProcessed = [0, 1, 2, 5, 6, 8, 12];
    this.setState({
      boxHigh: {
        y: [0, 2, 2, 3, 5, 6, 6, 7],
        type: 'box',
        name: 'Synergy, N='.concat(dataProcessed.length),
        marker: { color: colors.color_main_4 },
      },
      boxLow: {
        y: dataProcessed,
        type: 'box',
        name: 'Moderate, N='.concat(dataProcessed.length),
        marker: { color: colors.color_main_2 },
      },
    });
  }

  // Render this compoenent
  render() {
    const {
      boxHigh, boxLow, layout,
    } = this.state;
    return (
      <StyledContainer>
        <Plot
          data={[boxHigh, boxLow]}
          layout={layout}
          graphDiv="graph"
          className="biomarkerPlot"
          config={{
            responsive: true,
            displayModeBar: false,
          }}
        />
      </StyledContainer>
    );
  }
}
