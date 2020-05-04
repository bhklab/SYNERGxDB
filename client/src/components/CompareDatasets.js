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
  // const datasets = [...new Set(data.map(x => x.sourceName))];
  // HARDCODED for order
  const datasets = ['MERCK', 'MIT-MELANOMA', 'NCI-ALMANAC', 'YALE-TNBC', 'DECREASE'];

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
        somers: "Somers' D = -0.0098, P-value = 0.8267",
        spearman: 'Spearman rho = 0.0118, P-value = 0.8705',
        pearson: 'Pearson r = 0.0586, P-value = 0.4175',
      },
      loewe: {
        somers: "Somers' D = 0.0296, P-value = 0.5274",
        spearman: 'Spearman rho = -0.0444, P-value = 0.5390',
        pearson: 'Pearson r = -0.0341, P-value = 0.6371',
      },
      hsa: {
        somers: "Somers' D = 0.0330, P-value = 0.4672",
        spearman: 'Spearman rho = -0.0468, P-value = 0.5171',
        pearson: 'Pearson r = -0.0144, P-value = 0.8430',
      },
    },
    'MERCK+NCI-ALMANAC': {
      bliss: {
        somers: "Somers' D = -0.0379, P-value = 0.2286",
        spearman: 'Spearman rho = 0.0537, P-value = 0.2659',
        pearson: 'Pearson r = 0.0126, P-value = 0.7938',
      },
      zip: {
        somers: "Somers' D = -0.1675, P-value = 1.16E-07",
        spearman: 'Spearman rho = 0.2458, P-value = 1.98E-07',
        pearson: 'Pearson r = 0.0524, P-value = 0.2770',
      },
      loewe: {
        somers: "Somers' D = -0.0276, P-value = 0.3546",
        spearman: 'Spearman rho = 0.0407, P-value = 0.3986',
        pearson: 'Pearson r = 0.0525, P-value = 0.2755',
      },
      hsa: {
        somers: "Somers' D = -0.0849, P-value = 0.0071",
        spearman: 'Spearman rho = 0.1265, P-value = 0.0083',
        pearson: 'Pearson r = 0.1267, P-value = 0.0082',
      },
    },
    'MERCK+YALE-TNBC': {
      bliss: {
        somers: "Somers' D = 0.0643, P-value = 0.5721",
        spearman: 'Spearman rho = -0.0719, P-value = 0.7795',
        pearson: 'Pearson r = 0.0307, P-value = 0.9049',
      },
      loewe: {
        somers: "Somers' D = -0.2631, P-value = 0.0278",
        spearman: 'Spearman rho = 0.3456, P-value = 0.1613',
        pearson: 'Pearson r = 0.5761, P-value = 0.0107',
      },
      hsa: {
        somers: "Somers' D = -0.2631, P-value = 0.0017",
        spearman: 'Spearman rho = 0.3508, P-value = 0.1545',
        pearson: 'Pearson r = 0.6244, P-value = 0.0044',
      },
    },
    'MIT-MELANOMA+NCI-ALMANAC': {
      bliss: {
        somers: "Somers' D = -0.0716, P-value = 0.0229",
        spearman: 'Spearman rho = 0.1018, P-value = 0.0251',
        pearson: 'Pearson r = 0.0415, P-value = 0.3621',
      },
      zip: {
        somers: "Somers' D = 0.2000, P-value = 1.0000",
        spearman: 'Spearman rho = -0.4285, P-value = 0.4408',
        pearson: 'Pearson r = -0.5577, P-value = 0.2895',
      },
      loewe: {
        somers: "Somers' D = -0.0111, P-value = 0.7132",
        spearman: 'Spearman rho = 0.0141, P-value = 0.7562',
        pearson: 'Pearson r = -0.0293, P-value = 0.5191',
      },
      hsa: {
        somers: "Somers' D = 0.0281, P-value = 0.3408",
        spearman: 'Spearman rho = -0.0415, P-value = 0.3619',
        pearson: 'Pearson r = -0.0318, P-value = 0.4852',
      },
    },
    'NCI-ALMANAC+YALE-TNBC': {
      bliss: {
        somers: "Somers' D = -0.1649, P-value = 0.0003",
        spearman: 'Spearman rho = 0.2427, P-value = 0.0008',
        pearson: 'Pearson r = 0.2383, P-value = 0.0010',
      },
      loewe: {
        somers: "Somers' D = -0.0551, P-value = 0.2571",
        spearman: 'Spearman rho = 0.0809, P-value = 0.2733',
        pearson: 'Pearson r = 0.0411, P-value = 0.5781',
      },
      hsa: {
        somers: "Somers' D = -0.1012, P-value = 0.02543",
        spearman: 'Spearman rho = 0.1457, P-value = 0.0475',
        pearson: 'Pearson r = 0.1056, P-value = 0.1522',
      },
    },
    'YALE-TNBC+DECREASE': {
      bliss: {
        somers: "Somers' D = N/A, P-value = N/A",
        spearman: 'Spearman rho = N/A, P-value = N/A',
        pearson: 'Pearson r = N/A, P-value = N/A',
      },
      loewe: {
        somers: "Somers' D = N/A, P-value = N/A",
        spearman: 'Spearman rho = N/A, P-value = N/A',
        pearson: 'Pearson r = N/A, P-value = N/A',
      },
      hsa: {
        somers: "Somers' D = N/A, P-value = N/A",
        spearman: 'Spearman rho = N/A, P-value = N/A',
        pearson: 'Pearson r = N/A, P-value = N/A',
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
