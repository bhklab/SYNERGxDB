/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import { ComboContext } from '../Context';

// import colors from '../../styles/colors';

const StyledDiv = styled.div`
    grid-column: 1;
    height: 250px;
`;

class SingleDrugInhibitionPlot extends React.Component {
  static contextType = ComboContext

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {
        title: 'Line and Scatter Plot',
        autosize: true,
        height: 250,
        xaxis: {
          type: 'log',
        },
        yaxis: {
          title: 'Inhibition',
        },
      },
    };
  }

  componentDidMount() {
    const { synergyData } = this.context;
    console.log(this.context);
    const data = [{
      type: 'scatter',
      x: [1, 2, 3, 4, 5],
      y: [4, 6, 2, 7, 8],
      line: { shape: 'spline', smoothing: 1.3 },
    }];
    const inhibData = synergyData.filter(item => item.concA === 0).map(item => 100 - item.raw_matrix * 100);
    console.log(inhibData);
    this.setState({ data });
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

export default SingleDrugInhibitionPlot;
