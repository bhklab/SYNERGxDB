/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-properties */
/* eslint-disable class-methods-use-this */
import * as d3 from 'd3';
import React, { Fragment } from 'react';
import regression from 'regression';
import colors from '../../styles/colors';


export default class ConsistencyPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cindex: 0,
    };
  }

  componentDidMount() {
    const {
      plotId, data, datasets,
    } = this.props;
    this.plotConsistency(data, datasets, plotId);
  }

  plotConsistency(data, datasets, plotId) {
    const methods = ['ZIP', 'Bliss', 'Loewe', 'HSA'];

    // set defaults in variables so that X and Y dropdowns can access values
    let xvalue = 'Bliss';
    let yvalue = 'ZIP';

    // if all, big plot. Else, small
    let width;
    let height;
    if (plotId.includes('All')) {
      width = 700;
      height = 400;
    } else {
      width = 350;
      height = 300;
    }

    // dropdown to choose the method
    const dropdownX = d3.select(`#${plotId}`)
      .append('select')
      .attr('class', 'selectX')
      .on('change', () => {
        xvalue = dropdownX.property('value');
        // plot the scatter based on the method
        d3.select(`#scatter${plotId}`).remove();
        this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), width, height, data, datasets, plotId);
      });


    dropdownX.selectAll('option')
      .data(methods)
      .enter()
      .append('option')
      .property('selected', (d) => { // roundabout way to make a default value but ok
        if (d === xvalue) {
          return d;
        }
      })
      .attr('value', d => d)
      .text(d => d);


    const dropdownY = d3.select(`#${plotId}`)
      .append('select')
      .attr('class', 'selectY')
      .on('change', () => {
        yvalue = dropdownY.property('value');
        // plot the scatter based on the method
        d3.select(`#scatter${plotId}`).remove();
        this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), width, height, data, datasets, plotId);
      });

    dropdownY.selectAll('option')
      .data(methods)
      .enter()
      .append('option')
      .property('selected', (d) => { // roundabout way to make a default value but ok
        if (d === yvalue) {
          return d;
        }
        return null;
      })
      .attr('value', d => d)
      .text(d => d);

    // call plot at the end to plot it after the dropdowns have been rendered
    this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), width, height, data, datasets, plotId);
  }

  async findCIndex(x, y) {
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
    return data.cindex[0];
  }


  /**
     * from https://memory.psych.mun.ca/tech/js/correlation.shtml
     * calculates pearson correlation
     * @param {number[]} d1
     * @param {number[]} d2
     */
  findPearson(d1, d2) {
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
  }

  /**
     * from https://stackoverflow.com/questions/15886527/javascript-library-for-pearson-and-or-spearman-correlations
    */
  findSpearman(multiList, p1, p2) {
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
  }

  async plotScatter(xvalue, yvalue, width, height, data, datasets, plotId) {
    console.log(data);
    const margin = {
      top: 50,
      right: 170,
      bottom: 90,
      left: 180,
    };
    const colorPlot = ['#fca03e', '#5fcfff', '#f788c1', '#54c9b7', '#9a95de', '#f3c833', '#7456c7', '#7e6276', '#afb113', '#fd879c', '#fb78fa', '#24c373', '#45bbc5', '#766b21', '#abad93', '#c19ce3', '#fd8f11'];

    const colorMap = {};
    datasets.forEach((x, i) => {
      colorMap[x.name] = colorPlot[i];
    });

    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('fill', 'white')
      .attr('id', `scatter${plotId}`)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${130},${margin.top})`);


    // set range for data by domain, and scale by range
    const xrange = d3.scaleLinear()
      .domain(d3.extent(data, d => d[xvalue]))
      .range([0, width]);

    const yrange = d3.scaleLinear()
      .domain(d3.extent(data, d => d[yvalue]))
      .range([height, 0]);

    // set axes for graph
    const xAxis = d3.axisBottom()
      .scale(xrange)
      .tickPadding(2);

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
      .style('font-size', 15)
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
      .style('font-size', 14)
      .attr('stroke', 'none');

    // const dropdownYLabel = svg.append('text')
    //   .attr('fill', 'black')
    //   .attr('dy', height / 2 - 10)
    //   .attr('dx', -110)
    //   .text('Y Axis:');

    // const dropdownXLabel = svg.append('text')
    //   .attr('fill', 'black')
    //   .attr('dy', height + 68)
    //   .attr('dx', width / 2 - 80)
    //   .text('X Axis:');

    // make group for dots
    const dots = svg.selectAll('dot')
      .data(data)
      .enter();

    // get datasets plotted
    const datasetsPlotted = [];
    data.forEach((x) => {
      if (!datasetsPlotted.includes(x.sourceName)) {
        datasetsPlotted.push(x.sourceName);
      }
    });

    // add dots
    dots.append('circle')
      .attr('id', 'dot')
      .attr('r', '3px')
      .attr('fill', d => colorMap[d.sourceName])
      .attr('cx', (d, i) => xrange(d[xvalue]))
      .attr('cy', (d, i) => yrange(d[yvalue]))
      .style('opacity', 1)
      .on('mouseover', function (d, i) {
        d3.select(`${'.' + 'dot-name'}${i}`).transition().duration(300).style('opacity', '1');
        d3.select(this).style('cursor', 'pointer');
      })
      .on('mouseout', function (d, i) {
        d3.select(`${'.' + 'dot-name'}${i}`).transition().duration(300).style('opacity', '0');
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
      .attr('dy', height / 2)
      .attr('font-size', '17px')
      .style('opacity', '0')
      .attr('fill', 'black')
      .text(d => d.sampleName);


    // calculating regression
    const regressionData = data.map(item => [item[xvalue], item[yvalue]]);
    const coeffs = regression.linear(regressionData);
    const m = coeffs.equation[0];
    const b = coeffs.equation[1];

    // finding the start and end by putting the min x value and max x value into y = mx+b
    const xvalArr = data.map(item => item[xvalue]);
    const x1 = d3.min(xvalArr);
    const x2 = d3.max(xvalArr);
    const y1 = m * x1 + b;
    const y2 = m * x2 + b;

    svg.append('line')
      .attr('x1', xrange(x1))
      .attr('x2', xrange(x2))
      .attr('y1', yrange(y1))
      .attr('y2', yrange(y2))
      .attr('stroke-width', 2)
      .attr('stroke', colors.color_accent_1);

    // calculating C-Index - map json to arrays and call, pearson, spearman
    const firstArr = xvalArr;
    const secondArr = data.map(x => x[yvalue]);
    const cindex = await this.findCIndex(firstArr, secondArr);
    const pearson = this.findPearson(firstArr, secondArr);
    const spearman = this.findSpearman([firstArr, secondArr], 0, 1);

    // append stats to dom
    svg.append('text')
      .attr('dx', width + 10)
      .attr('dy', height / 3 - 20)
      .attr('font-size', () => {
        if (plotId.includes('All')) {
          return '17px';
        }
        return '13px';
      })
      .style('opacity', '1')
      .attr('fill', 'black')
      .text(d => `Concordance index: ${d3.format('.4f')(cindex)}`);

    svg.append('text')
      .attr('dx', width + 10)
      .attr('dy', height / 3)
      .attr('font-size', () => {
        if (plotId.includes('All')) {
          return '17px';
        }
        return '13px';
      })
      .style('opacity', '1')
      .attr('fill', 'black')
      .text(d => `Spearman rho: ${d3.format('.4f')(spearman)}`);

    svg.append('text')
      .attr('dx', width + 10)
      .attr('dy', height / 3 + 20)
      .attr('font-size', () => {
        if (plotId.includes('All')) {
          return '17px';
        }
        return '13px';
      })
      .style('opacity', '1')
      .attr('fill', 'black')
      .text(d => `Pearson r: ${d3.format('.4f')(pearson)}`);

    // plot colour legend
    datasetsPlotted.forEach((x, i) => {
      svg.append('rect')
        .attr('width', 11)
        .attr('height', 11)
        .attr('fill', colorMap[x])
        .attr('x', width + 10)
        .attr('y', height / 3 + 100 + (20 * i));

      svg.append('text')
        .attr('dx', width + 30)
        .attr('dy', height / 3 + 111 + (20 * i))
        .attr('font-size', '13px')
        .style('opacity', '1')
        .attr('fill', 'black')
        .text(x);
    });
  }

  render() {
    const { data, plotId } = this.props;
    return (
      <Fragment>
        {/* <h2>Consistency in Synergy Scores, <i>N</i> = {data.length}</h2> */}
        <div id={plotId} className="plot" />
      </Fragment>
    );
  }
}
