import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import colors from '../../styles/colors';

const StyledContainer = styled.div`
  width: 50%;
  min-width: 400px
  height: 450x;
  padding-right: 34px;
`;

class BiomarkerBoxPlot extends React.Component {
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
        xaxis: { title: 'Groups' },
        showlegend: false,
        font: {
          size: 16,
          color: colors.nav_links,
          family: 'Nunito Sans',
        },
      },
    };
    this.calculateBoxData = this.calculateBoxData.bind(this);
  }

  // Methods called on loading
  componentDidMount() {
    const { calculateBoxData } = this;
    const { data, threshold } = this.props;
    calculateBoxData(data, threshold);
  }

  componentDidUpdate(prevProps) {
    const { data, threshold } = this.props;
    if (threshold !== prevProps.threshold) {
      const { calculateBoxData } = this;
      calculateBoxData(data, threshold);
    }
  }

  calculateBoxData(sortArr, threshold) {
    const { dimensions } = this.props;
    const boxData = [];
    for (let i = 0; i < sortArr.length; i += 1) {
      if (sortArr[i] >= threshold) {
        boxData.push(sortArr.slice(0, i));
        boxData.push(sortArr.slice(i, sortArr.length));
        break;
      }
    }
    this.setState({
      layout: {
        height: 450,
        autoresize: true,
        showlegend: false,
        font: {
          size: 16,
          color: colors.nav_links,
          family: 'Raleway',
        },
        margin: {
          l: dimensions.left,
          r: 10,
          t: dimensions.top,
          b: dimensions.bottom,
        },
        xaxis: {
          title: {
            text: 'Groups',
            font: {
              family: 'Nunito Sans, sans-serif',
              color: colors.color_main_1,
              size: 16,
            },
          },
          color: colors.color_main_1,
          tickcolor: colors.color_main_1,
          linecolor: colors.color_main_1,
          mirror: true,
          font: {
            size: 16,
            color: colors.nav_links,
            family: 'Raleway',
          },
          linewidth: 3,
        },
        yaxis: {
          color: colors.color_main_1,
          tickcolor: colors.color_main_1,
          linecolor: colors.color_main_1,
          showticklabels: false,
          mirror: true,
          linewidth: 3,
          tickfont: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 13,
          },
        },
      },
      boxHigh: {
        y: boxData[1],
        type: 'box',
        name: 'High, N='.concat(boxData[1].length),
        marker: { color: colors.color_main_2 },
      },
      boxLow: {
        y: boxData[0],
        type: 'box',
        name: 'Low, N='.concat(boxData[0].length),
        marker: { color: colors.color_main_5 },
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
export default BiomarkerBoxPlot;

BiomarkerBoxPlot.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  threshold: PropTypes.number.isRequired,
  dimensions: PropTypes.objectOf(PropTypes.number).isRequired,
};