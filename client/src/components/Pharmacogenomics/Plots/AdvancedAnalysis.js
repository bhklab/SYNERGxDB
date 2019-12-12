/* eslint-disable no-restricted-properties */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import regression from 'regression';

import colors from '../../../styles/colors';

const plotDimensions = {
  top: 30,
  bottom: 55,
};


const PlotlyContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  // padding: 20px 0; 
`;
const StyledExpressionProfile = styled.div`
  width: 100%;
  min-width: 300px;
  display: flex
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-self: left;
  padding-top: calc(${plotDimensions.top}px - 3px);
  padding-bottom: calc(${plotDimensions.bottom}px - 3px);
  margin-left: 15px;
  div {
    padding: 5px;
    border: 3px solid ${colors.color_main_1};
  }
`;
async function findCIndex(x, y) {
  if (x.length < 2 || y.length < 2) {
    return null;
  }
  try {
    const response = await fetch('http://52.138.39.182/ocpu/library/wCI/R/paired.concordance.index/json', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prediction: x,
        observation: y,
        CPP: false,
      }),
    });
    const data = await response.json();
    return data.cindex[0].toFixed(3);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
}

const findPearson = (xCoor, yCoor) => {
  const { min, pow, sqrt } = Math;
  const add = (a, b) => a + b;
  const n = min(xCoor.length, yCoor.length);
  if (n === 0) {
    return 0;
  }
  const [x, y] = [xCoor.slice(0, n), yCoor.slice(0, n)];
  const [sum1, sum2] = [x, y].map(l => l.reduce(add));
  const [pow1, pow2] = [x, y].map(l => l.reduce((a, b) => a + pow(b, 2), 0));
  const mulSum = x.map((number, i) => number * y[i]).reduce(add);
  const dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n));
  if (dense === 0) {
    return 0;
  }
  return ((mulSum - (sum1 * sum2 / n)) / dense).toFixed(3);
};

const findSpearman = (multiList, p1, p2) => {
  const N = multiList[p1].length;
  const order = [];
  let sum = 0;

  for (let i = 0; i < N; i += 1) {
    order.push([multiList[p1][i], multiList[p2][i]]);
  }
  order.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < N; i += 1) {
    order[i].push(i + 1);
  }
  order.sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < N; i += 1) {
    order[i].push(i + 1);
  }
  for (let i = 0; i < N; i += 1) {
    sum += Math.pow((order[i][2]) - (order[i][3]), 2);
  }

  const r = 1 - (6 * sum / (N * (N * N - 1)));
  if (!r) return 0;
  return r.toFixed(3);
};

class AdvancedAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      layout: null,
      cIndex: null,
      pearsonR: null,
      spearmanRho: null,
    };
  }

  // Methods called on loading
  componentDidMount() {
    this.updatePlotData();
  }

  componentDidUpdate(prevProps) {
    const { selectedBiomarker, selectedScore, biomarkerData } = this.props;
    if (selectedBiomarker !== prevProps.selectedBiomarker
      || selectedScore !== prevProps.selectedScore) {
      this.updatePlotData();
    }
    if (biomarkerData !== prevProps.biomarkerData) {
      this.updatePlotData();
    }
  }

  async updatePlotData() {
    const {
      biomarkerData, dimensions, xRange, yRange, selectedScore, accessor,
    } = this.props;
    // calculates coefficients for best fit line

    const regressionData = biomarkerData.map(item => [item[accessor], item[selectedScore]]);
    const bestFitCoefficients = regression.linear(regressionData);
    const xCoordinates = biomarkerData.map(item => item[accessor]);
    const yCoordinates = biomarkerData.map(item => item[selectedScore]);

    const datapoints = {
      x: xCoordinates,
      y: yCoordinates,
      name: 'Cell line',
      marker: {
        color: colors.color_main_2,
        size: 7,
      },
      showlegend: false,
      mode: 'markers',
      type: 'scatter',
      hoverinfo: 'text',
      hovertext: biomarkerData.map(item => `${item[accessor]} (${item.cellName})`),
    };
    const data = [datapoints];
    // Renders best fit line using previously calculated coefficients
    const bestFitLine = {
      x: xRange,
      y: [
        xRange[0] * bestFitCoefficients.equation[0] + bestFitCoefficients.equation[1],
        xRange[1] * bestFitCoefficients.equation[0] + bestFitCoefficients.equation[1],
      ],
      mode: 'lines',
      type: 'scatter',
      showlegend: false,
      marker: {
        color: colors.color_main_5,
      },
      hoverinfo: 'none',
    };
    data.unshift(bestFitLine);

    const layout = {
      height: 600,
      autosize: true,
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
      hovermode: 'closest',
      xaxis: {
        title: {
          text: accessor.toUpperCase(),
          font: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 16,
          },
        },
        color: colors.color_main_1,
        tickcolor: colors.color_main_1,
        linecolor: colors.color_main_1,
        range: xRange,
        fixedrange: true,
        mirror: true,
        font: {
          size: 16,
          color: colors.nav_links,
          family: 'Raleway',
        },
        linewidth: 3,
      },
      yaxis: {
        title: {
          text: selectedScore.toUpperCase(),
          font: {
            family: 'Nunito Sans, sans-serif',
            color: colors.color_main_1,
            size: 16,
          },
        },
        color: colors.color_main_1,
        tickcolor: colors.color_main_1,
        linecolor: colors.color_main_1,
        range: yRange,
        fixedrange: true,
        mirror: true,
        linewidth: 3,
        tickfont: {
          family: 'Nunito Sans, sans-serif',
          color: colors.color_main_1,
          size: 13,
        },
      },
    };
    const cIndex = await findCIndex(xCoordinates, yCoordinates);
    const pearsonR = findPearson(xCoordinates, yCoordinates);
    const spearmanRho = findSpearman([xCoordinates, yCoordinates], 0, 1);
    this.setState({
      data,
      layout,
      cIndex,
      pearsonR,
      spearmanRho,
    });
  }

  render() {
    const {
      data, layout, cIndex, pearsonR, spearmanRho,
    } = this.state;
    const {
      drug1, drug2, selectedBiomarker, selectedScore, biomarkerData,
    } = this.props;

    let displayData;
    if (data) {
      displayData = data;
    }
    return (
      <StyledExpressionProfile>
        <PlotlyContainer>
          <Plot
            data={displayData}
            layout={layout}
            graphDiv="graph"
            config={{
              responsive: true,
              displayModeBar: false,
            }}
          />
        </PlotlyContainer>
        <StyledInfo>
          <div>
            <h4>
            Compound A:
              {' '}
              {drug1}
            </h4>
            <h4>
            Compound B:
              {' '}
              {drug2}
            </h4>
            <h4>
            Synergy Score:
              {' '}
              {selectedScore.toUpperCase()}
              {' '}
            x
              {' '}
              {selectedBiomarker}
            </h4>
            <h4>
            Tested in
              {' '}
              {biomarkerData ? biomarkerData.length : '0'}
              {' '}
            cell lines
            </h4>
          </div>
          {cIndex ? (
            <div className="stats">
              <h4>
            C-Index =
                {' '}
                {cIndex}
              </h4>
              <h4>
            Pearson r =
                {' '}
                {pearsonR}
              </h4>
              <h4>
            Spearman rho =
                {' '}
                {spearmanRho}
              </h4>
            </div>
          ) : null
        }
        </StyledInfo>
      </StyledExpressionProfile>
    );
  }
}

AdvancedAnalysis.propTypes = {
  selectedBiomarker: PropTypes.string.isRequired,
  biomarkerData: PropTypes.arrayOf(PropTypes.object).isRequired,
  dimensions: PropTypes.objectOf(PropTypes.number).isRequired,
  xRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  yRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedScore: PropTypes.string.isRequired,
  drug1: PropTypes.string.isRequired,
  drug2: PropTypes.string.isRequired,
  accessor: PropTypes.string.isRequired,
};


export default AdvancedAnalysis;
