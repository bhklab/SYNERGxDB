/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, {
  Component, Fragment, useState, useEffect,
} from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import * as d3 from 'd3';
import colors from '../styles/colors';
import ConsistencyDsetPlot from './Plots/ConsistencyDsetPlot';


const StyledWrapper = styled.div`
  width: 100%;
  background:white;
  padding:30px;
  margin-top: 120px;
  
  span {
    line-height: 2em;
  }

  h1 {
    margin-top: 1rem;
  }

  .consistencyGrid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: 0;
    min-width: 0;
    .consistencyDsetContainer {
      // flex: 1 45%;
      width: 49%;
    }
    margin-bottom:30px;
  }

  .selectDset {
    float: left;
    position: absolute;
  }
  

`;

const formatData = (data) => {
  const datasets = [...new Set(data.map(x => x.sourceName))];
  const dsetData = {};
  datasets.forEach((x) => {
    dsetData[x] = [];
  });
  data.forEach((x) => {
    dsetData[x.sourceName].push(x);
  });

  // dsetData format: { MERCK: [], MELANOMA: [], ...}

  // getting pairs of datasets
  const x = datasets;
  let y = datasets;
  const result = {};
  const pairs = [];
  y = y.slice(1);
  x.forEach((item) => {
    y.forEach((item2) => {
      result[`${item}+${item2}`] = {};
      pairs.push([item, item2]);
    });
    y = y.slice(1);
  });

  pairs.forEach((pair) => {
    // get the intersect of samples between datasets for each pair
    const combosA = dsetData[pair[0]].map(n => n.idCombo_Design);
    const combosB = dsetData[pair[1]].map(n => n.idCombo_Design);
    let combos = combosA.filter((n) => {
      if (combosB.indexOf(n) !== -1) return true;
      return false;
    });
    // combos = the intersection of combos
    combos = [...new Set(combos)];

    // getting points from those combos
    // { combo: [{point1}, {point2}], ...}
    const pointsA = dsetData[pair[0]].filter(n => combos.includes(n.idCombo_Design));
    const pointsB = dsetData[pair[1]].filter(n => combos.includes(n.idCombo_Design));

    // getting json of points by combo
    const comboMap = {};
    combos.forEach((n) => {
      comboMap[n] = [];
    });
    pointsA.forEach((n) => {
      comboMap[n.idCombo_Design].push(n);
    });
    pointsB.forEach((n) => {
      comboMap[n.idCombo_Design].push(n);
    });

    // making into easier format
    // {zip: [{x: 0, y: 0, combo: ""}, {}, ...], bliss: ...}
    const scores = ['zip', 'bliss', 'loewe', 'hsa'];
    const pairData = {};
    scores.forEach((n) => {
      pairData[n] = [];
    });

    Object.keys(comboMap).forEach((n) => {
      // determining x or y axis - pair[0] is x, 1 is y
      if (comboMap[n][0].sourceName === pair[0]) {
        scores.forEach((s) => {
          pairData[s].push({
            x: comboMap[n][0][s],
            y: comboMap[n][1][s],
            combo: n,
          });
        });
      } else {
        scores.forEach((s) => {
          pairData[s].push({
            x: comboMap[n][1][s],
            y: comboMap[n][0][s],
            combo: n,
          });
        });
      }
    });

    result[`${pair[0]}+${pair[1]}`] = pairData;
  });

  // get all combinations that have 0 data
  const emptyCombos = [];
  Object.keys(result).forEach((n) => {
    // if any have no data, remove
    if (result[n].zip.length === 0) {
      delete result[n];
      emptyCombos.push(n);
    }
  });

  // HARDCODED: stats
  const stats = {
    'MERCK+MIT-MELANOMA': {
      bliss: {
        cindex: 0.5049,
        spearman: 0.0120,
        pearson: 0.0587,
      },
      loewe: {
        cindex: 0.4852,
        spearman: -0.0446,
        pearson: -0.0342,
      },
      hsa: {
        cindex: 0.4835,
        spearman: -0.0469,
        pearson: -0.0143,
      },
    },
    'MERCK+NCI-ALMANAC': {
      bliss: {
        cindex: 0.6856,
        spearman: 0.5270,
        pearson: 0.5432,
      },
      zip: {
        cindex: 0.7018,
        spearman: 0.5716,
        pearson: 0.0803,
      },
      loewe: {
        cindex: 0.6524,
        spearman: 0.4444,
        pearson: 0.4413,
      },
      hsa: {
        cindex: 0.6255,
        spearman: 0.3691,
        pearson: 0.3802,
      },
    },
    'MERCK+YALE-TNBC': {
      bliss: {
        cindex: 0.4678,
        spearman: -0.0719,
        pearson: 0.0307,
      },
      loewe: {
        cindex: 0.6316,
        spearman: 0.3456,
        pearson: 0.5761,
      },
      hsa: {
        cindex: 0.6316,
        spearman: 0.3509,
        pearson: 0.6244,
      },
    },
    'MIT-MELANOMA+NCI-ALMANAC': {
      bliss: {
        cindex: 0.4763,
        spearman: -0.0708,
        pearson: -0.0911,
      },
      zip: {
        cindex: 0.0000,
        spearman: -0.3195,
        pearson: 0.0177,
      },
      loewe: {
        cindex: 0.4633,
        spearman: -0.1111,
        pearson: -0.1357,
      },
      hsa: {
        cindex: 0.4488,
        spearman: -0.1535,
        pearson: -0.1301,
      },
    },
    'NCI-ALMANAC+YALE-TNBC': {
      bliss: {
        cindex: 0.4684,
        spearman: -0.0940,
        pearson: -0.1367,
      },
      loewe: {
        cindex: 0.5771,
        spearman: 0.2304,
        pearson: 0.2531,
      },
      hsa: {
        cindex: 0.5721,
        spearman: 0.2035,
        pearson: 0.2080,
      },
    },
    'YALE-TNBC+DECREASE': {
      bliss: {
        cindex: 0.0000,
        spearman: 0.0000,
        pearson: 0.0000,
      },
      loewe: {
        cindex: 0.0000,
        spearman: 0.0000,
        pearson: 0.0000,
      },
      hsa: {
        cindex: 0.0000,
        spearman: 0.0000,
        pearson: 0.0000,
      },
    },
  };

  return { result, emptyCombos, stats };
};

const CompareDatasets = () => {
  const [state, setState] = useState({
    data: {},
    emptyCombos: [],
    stats: {},
    loading: true,
  });
  const [selected, setSelected] = useState('bliss');

  useEffect(() => {
    setState({
      data: {},
      emptyCombos: [],
      stats: {},
      loading: true,
    });
    fetch('/api/datasets/comparison', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        const { result, emptyCombos, stats } = formatData(data);
        setState({
          data: result,
          emptyCombos,
          stats,
          loading: false,
        });
      });

    const methods = ['ZIP', 'Bliss', 'Loewe', 'HSA'];
    // dropdown to choose the method
    const dropdown = d3.select('.selectDset')
      .append('select')
      .on('change', () => {
        setSelected(dropdown.property('value').toLowerCase());
      });

    dropdown.selectAll('option')
      .data(methods)
      .enter()
      .append('option')
      .property('selected', (d) => { // roundabout way to make a default value but ok
        if (d.toLowerCase() === selected) {
          return d;
        }
      })
      .attr('value', d => d)
      .text(d => d);
  }, []);

  // HARDCODED: order
  const order = ['MERCK+NCI-ALMANAC', 'MIT-MELANOMA+NCI-ALMANAC', 'MERCK+MIT-MELANOMA', 'NCI-ALMANAC+YALE-TNBC', 'MERCK+YALE-TNBC', 'YALE-TNBC+DECREASE'];
  return (
    <Fragment>
      <StyledWrapper className="wrapper">
        <h1>Comparison across datasets</h1>
        <div className="selectDset" />
        {state.loading ? (
          <div className="loading-container">
            <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
          </div>
        ) : (
          <div className="consistencyGrid">
            {order.map((x, i) => (
              <Fragment key={x}>
                {state.data[x][selected].every(n => n.x === null) || state.data[x][selected].every(n => n.y === null) ? null : (
                  <div className="consistencyDsetContainer">
                    <ConsistencyDsetPlot
                      plotId={`consistencyDsetPlot${i}`}
                      data={state.data[x]}
                      score={selected}
                      dsets={x}
                      stats={state.stats[x]}
                      single={Object.keys(state.data).length === 1}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )}
        <span>
          Tuples (sample, drug A, drug B) in the CLOUD, STANFORD, VISAGE, YALE-PDAC datasets do not overlap among the datasets.
          {' '}
          <br />
          As well, these dataset combinations had no data available:
          {' '}
          <br />
          {state.emptyCombos.join(', ')}
          .
        </span>

      </StyledWrapper>
      <footer>
        <div className="footer-wrapper">
          <p>Copyright © 2019. All rights reserved</p>
        </div>
      </footer>
    </Fragment>
  );
};


export default CompareDatasets;
