/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-properties */
/* eslint-disable class-methods-use-this */
import * as d3 from 'd3';
import React, { useEffect, Fragment } from 'react';
import regression from 'regression';
import colors from '../../styles/colors';

const ConsistencyDsetPlot = (props) => {
  const {
    data, score, dsets, plotId, single,
  } = props;

  const findCIndex = async (x, y) => {
    try {
      const response = await fetch('/api/wCI', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prediction: x,
          observation: y,
        }),
      });
      const resData = await response.json();
      return resData.cindex[0];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return null;
    }
  };


  /**
     * from https://memory.psych.mun.ca/tech/js/correlation.shtml
     * calculates pearson correlation
     * @param {number[]} d1
     * @param {number[]} d2
     */
  const findPearson = (d1, d2) => {
    const { min, pow, sqrt } = Math;
    const add = (a, b) => a + b;
    const n = min(d1.length, d2.length);
    if (n === 0) {
      return 0;
    }
    [d1, d2] = [d1.slice(0, n), d2.slice(0, n)];
    const [sum1, sum2] = [d1, d2].map(l => l.reduce(add));
    const [pow1, pow2] = [d1, d2].map(l => l.reduce((a, b) => a + pow(b, 2), 0));
    const mulSum = d1.map((n, i) => n * d2[i]).reduce(add);
    const dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n));
    if (dense === 0) {
      return 0;
    }
    return (mulSum - (sum1 * sum2 / n)) / dense;
  };

  /**
     * from https://stackoverflow.com/questions/15886527/javascript-library-for-pearson-and-or-spearman-correlations
    */
  const findSpearman = (multiList, p1, p2) => {
    const N = multiList[p1].length;
    const order = [];
    let sum = 0;

    for (let i = 0; i < N; i++) {
      order.push([multiList[p1][i], multiList[p2][i]]);
    }

    order.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < N; i++) {
      order[i].push(i + 1);
    }

    order.sort((a, b) => a[1] - b[1]);

    for (let i = 0; i < N; i++) {
      order[i].push(i + 1);
    }
    for (let i = 0; i < N; i++) {
      sum += Math.pow((order[i][2]) - (order[i][3]), 2);
    }

    const r = 1 - (6 * sum / (N * (N * N - 1)));

    return r;
  };

  const plotScatter = async (data, plotId, dsets, single, score) => {
    const pair = [dsets.substr(0, dsets.indexOf('+')), dsets.substr(dsets.indexOf('+') + 1, dsets.length)];
    const margin = {
      top: 50,
      right: 100,
      bottom: 90,
      left: 160,
    };
    let width = 350;
    let height = 300;

    if (single) {
      margin.right = 230;
      margin.left = 150;
      width = 700;
      height = 400;
    }

    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('fill', 'white')
      .attr('id', `scatter${plotId}`)
      .attr('class', 'scatter')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);


    // set range for data by domain, and scale by range
    const xrange = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, width]);

    const yrange = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([height, 0]);

    // set axes for graph
    const xAxis = d3.axisBottom()
      .scale(xrange)
      .tickPadding(2)
      .tickFormat(d => d3.format('.1f')(d));

    const yAxis = d3.axisLeft()
      .scale(yrange)
      .tickSize(5);

    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .call(yAxis)
      .selectAll('text')
      .attr('fill', 'black')
      .attr('font-size', () => {
        if (plotId.includes('All')) {
          return '15px';
        }
        return '13px';
      })
      .attr('stroke', 'none');

    svg.selectAll('.tick')
      .select('text')
      .attr('fill', 'black')
      .attr('stroke', 'none');

    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      // .attr('x', 0)
      // .attr('y', yrange(0))
      .attr('transform', `translate(0,${height})`)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', 'black')
      .attr('font-size', () => {
        if (plotId.includes('All')) {
          return '14px';
        }
        return '13px';
      })
      .attr('stroke', 'none');

    const yAxisLabel = svg.append('text')
      .attr('fill', 'black')
      .attr('dy', height / 2 - 10)
      .attr('dx', -40)
      .style('text-anchor', 'end')
      .style('font-size', '13px')
      .text(pair[1]);

    const xAxisLabel = svg.append('text')
      .attr('fill', 'black')
      .attr('dy', height + 40)
      .attr('dx', width / 2 - 100)
      .style('font-size', '13px')
      .text(pair[0]);

    // title
    if (!plotId.includes('All')) {
      svg.append('text')
        .attr('dx', width / 2)
        .attr('dy', -20)
        .attr('font-size', '16px')
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .style('opacity', '1')
        .attr('fill', 'black')
        .text(`${pair[0]} vs ${pair[1]}, N = ${data.filter(n => n.x !== null && n.y !== null).length}`);
    }
    // make group for dots
    const dots = svg.selectAll('dot')
      .data(data)
      .enter();

    // add dots
    dots.filter(d => d.x != null && d.y != null)
      .append('circle')
      .attr('id', 'dot')
      .attr('r', '3px')
      .attr('fill', colors.blue_main)
      .attr('cx', d => xrange(d.x))
      .attr('cy', d => yrange(d.y))
      .style('opacity', 1)
      .on('mouseover', (d, i) => {
        d3.select(`${'.dot-name'}${i}`).transition().duration(300).style('opacity', '1');
        d3.select(this).style('cursor', 'pointer');
      })
      .on('mouseout', (d, i) => {
        d3.select(`${'.dot-name'}${i}`).transition().duration(300).style('opacity', '0');
        d3.select(this).style('cursor', 'default');
      });

    // add tooltips for dots
    const tooltips = svg.append('g')
      .selectAll('text')
      .data(data)
      .enter();

    // Name Tooltip
    tooltips.append('text')
      .attr('class', (d, i) => `dot-name${i}`)
      .attr('dx', width + 5)
      .attr('dy', height / 2 + 50)
      .attr('font-size', 13)
      .style('opacity', '0')
      .attr('fill', 'black')
      .text(d => d.sample);


    // calculating regression
    const regressionData = data.map(item => [item.x, item.y]);
    const coeffs = regression.linear(regressionData);
    const m = coeffs.equation[0];
    const b = coeffs.equation[1];

    // finding the start and end by putting the min x value and max x value into y = mx+b
    // making sure the line doesn't go over bounds
    const xvalArr = data.map(item => item.x);
    const x1 = Math.max(d3.min(xvalArr), d3.extent(data, d => d.x)[0]);
    const x2 = Math.min(d3.max(xvalArr), d3.extent(data, d => d.x)[1]);
    const y1 = Math.max(m * x1 + b, d3.extent(data, d => d.y)[0]);
    const y2 = Math.min(m * x2 + b, d3.extent(data, d => d.y)[1]);
    // const x1 = d3.min(xvalArr);
    // const x2 = d3.max(xvalArr);
    // const y1 = m * x1 + b;
    // const y2 = m * x2 + b;

    svg.append('line')
      .attr('x1', xrange(x1))
      .attr('x2', xrange(x2))
      .attr('y1', yrange(y1))
      .attr('y2', yrange(y2))
      .attr('stroke-width', 2)
      .attr('stroke', colors.color_accent_1);


    let pearson; let spearman; let cindex; let somers;

    // if consistency plot or comparison
    if (props.stats === undefined) {
      // calculating C-Index - map json to arrays and call, pearson, spearman
      const firstArr = xvalArr;
      const secondArr = data.map(n => n.y);
      pearson = findPearson(firstArr, secondArr);
      spearman = firstArr.length === 1 ? 0 : findSpearman([firstArr, secondArr], 0, 1);
      cindex = firstArr.length === 1 ? 0 : await findCIndex(firstArr, secondArr);
    } else {
      const firstArr = xvalArr;
      const secondArr = data.map(n => n.y);
      ({ pearson, somers, spearman } = props.stats[score]);
    }

    // append stats to dom
    svg.append('text')
      .attr('dx', () => {
        if (single) {
          return width + 10;
        }
        return width / 2 + 10;
      })
      .attr('dy', () => {
        if (single) {
          return height / 3 - 20;
        }
        return height + 40;
      })
      .attr('font-size', () => {
        if (single) {
          return '17px';
        }
        return 12;
      })
      .style('opacity', '1')
      .attr('fill', 'black')
      .text(() => {
        if (typeof cindex === 'number') {
          return `Concordance index: ${d3.format('.4f')(cindex)}`;
        }
        if (props.stats !== undefined) {
          return somers;
        }
        return `Concordance index: ${cindex}`;
      });

    svg.append('text')
      .attr('dx', () => {
        if (single) {
          return width + 10;
        }
        return width / 2 + 10;
      })
      .attr('dy', () => {
        if (single) {
          return height / 3;
        }
        return height + 60;
      })
      .attr('font-size', () => {
        if (single) {
          return '17px';
        }
        return 12;
      })
      .style('opacity', '1')
      .attr('fill', 'black')
      .text(() => {
        if (typeof spearman === 'number') {
          return `Spearman rho: ${d3.format('.4f')(spearman)}`;
        }
        if (props.stats !== undefined) {
          return spearman;
        }
        return `Spearman rho: ${spearman}`;
      });

    svg.append('text')
      .attr('dx', () => {
        if (single) {
          return width + 10;
        }
        return width / 2 + 10;
      })
      .attr('dy', () => {
        if (single) {
          return height / 3 + 20;
        }
        return height + 80;
      })
      .attr('font-size', () => {
        if (single) {
          return '17px';
        }
        return 12;
      })
      .style('opacity', '1')
      .attr('fill', 'black')
      .text(() => {
        if (typeof pearson === 'number') {
          return `Pearson r: ${d3.format('.4f')(pearson)}`;
        }
        if (props.stats !== undefined) {
          return pearson;
        }
        return `Pearson r: ${pearson}`;
      });
  };

  useEffect(() => {
    // if all, big plot. Else, small
    d3.select(`#scatter${plotId}`).remove();
    plotScatter(data[score], plotId, dsets, single, score);
  }, [score]);


  return (
    <Fragment>
      <div id={plotId} className="plot" />
    </Fragment>
  );
};

export default ConsistencyDsetPlot;
