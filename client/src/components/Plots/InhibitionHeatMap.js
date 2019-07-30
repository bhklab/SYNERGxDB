/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import { ComboContext } from '../Context';

// import colors from '../../styles/colors';

const StyledDiv = styled.div`
    grid-column: 2;
    grid-row: 1/3;
`;

class InhibitionHeatMap extends React.Component {
  static contextType = ComboContext

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {
        autosize: true,
        height: 700,
      },
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const { cellData } = this.context;
    console.log(this.context);
    const plotData = [];
    let currentConc;
    data.forEach((item) => {
      if (item.concA === currentConc) {
        plotData[plotData.length - 1].push(100 - item.raw_matrix * 100);
      } else {
        plotData.push([100 - item.raw_matrix * 100]);
        currentConc = item.concA;
      }
    });
    this.setState(prevState => ({
      data: [{
        z: plotData,
        type: 'heatmap',
      }],
      layout: {
        ...prevState.layout,
        title: cellData.name,
      },
    }));
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
  data: PropTypes.arrayOf(PropTypes.shape({
    concA: PropTypes.number.isRequired,
    concB: PropTypes.number.isRequired,
  }))
    .isRequired,
};

InhibitionHeatMap.contextType = ComboContext;

export default InhibitionHeatMap;
