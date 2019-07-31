/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import { ComboContext } from '../Context';

// import colors from '../../styles/colors';

const StyledDiv = styled.div`
    grid-column: 1;
    height: 50%;
`;

class SingleDrugInhibitionPlot extends React.Component {
  static contextType = ComboContext

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {
        title: 'Line and Scatter Plot',
      },
    };
  }

  componentDidMount() {
    const data = [{
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
    }];
    this.setState({ data });
  }

  // Render this compoenent
  render() {
    const { data, layout } = this.state;
    return (
      <StyledDiv>
        <Plot
          graphDiv="graph"
          config={{ responsive: true }}
          data={data}
          layout={layout}
        />
      </StyledDiv>
    );
  }
}

export default SingleDrugInhibitionPlot;
