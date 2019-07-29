/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import colors from '../../styles/colors';

const StyledDiv = styled.div`
    grid-column: 2;
    grid-row: 1/3;
`;

class InhibitionHeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {},
    };
  }

  componentDidMount() {
    this.setState({
      data: [{
        z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
        type: 'heatmap',
      }],
      layout: {
        title: 'Heatmap',
        with: 700,
        height: 700,
      },
    });
  }

  // Render this compoenent
  render() {
    const { data, layout } = this.state;
    return (
      <StyledDiv>
        <Plot data={data} layout={layout} />
      </StyledDiv>
    );
  }
}

InhibitionHeatMap.propTypes = {
};

export default InhibitionHeatMap;
