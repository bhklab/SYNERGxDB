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
  padding:20px;
  margin-top: 120px;

  .consistencyGrid {
    display: flex;
    flex-wrap: wrap;
    min-height: 0;
    min-width: 0;
    .consistencyDsetContainer {
      // flex: 1 45%;
      width: 45%;
    }
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

  // hardcoding stats
  const stats = {
    'MERCK+MIT-MELANOMA': {
      cindex: 0.5049,
      spearman: 0.0120,
      pearson: 0.0587,
    },
    'MERCK+NCI-ALMANAC': {
      cindex: 0.6856,
      spearman: 0.5270,
      pearson: 0.5432,
    },
    'MERCK+YALE-TNBC': {
      cindex: 0.4678,
      spearman: -0.0719,
      pearson: 0.0307,
    },
    'MIT-MELANOMA+NCI-ALMANAC': {
      cindex: 0.4763,
      spearman: -0.0708,
      pearson: -0.0911,
    },
    'NCI-ALMANAC+YALE-TNBC': {
      cindex: 0.4684,
      spearman: -0.0940,
      pearson: -0.1367,
    },
    'YALE-TNBC+DECREASE': {
      cindex: 0.0000,
      spearman: 0.0000,
      pearson: 0.0000,
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

  return (
    <Fragment>
      <StyledWrapper className="wrapper">
        <div className="selectDset" />
        {state.loading ? (
          <div className="loading-container">
            <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
          </div>
        ) : (
          <div className="consistencyGrid">
            {Object.keys(state.data).map((x, i) => (
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
