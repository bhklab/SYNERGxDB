/* eslint-disable class-methods-use-this */
import * as d3 from 'd3';
import React, { Fragment } from 'react';
// import CellSensLegends from './CellSensLegends';
// import colors from '../../styles/colors';

class SensBoxPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legendColors: {},
    };
  }

  componentDidMount() {
    const {
      data, query, plotId, synScore,
    } = this.props;
    const result = this.formatData(data, synScore);
    this.plotSensBoxPlot(result[0], result[1], result[2], plotId, result[3], result[4], synScore);
    // this.setState({legendColors: legendColors});
  }

  componentDidUpdate(prevProps) {
    // if synScore is updated
    const {
      data, query, plotId, synScore,
    } = this.props;
    if (synScore !== prevProps.synScore) {
      const result = this.formatData(data, synScore);
      d3.select('#boxplot').remove();
      this.plotSensBoxPlot(result[0], result[1], result[2], plotId, result[3], result[4], synScore);
    }
  }

  formatData(data, synScore) {
    // data is currently in a JSON array of sample, source, drugA, drugB, zip
    // make into a json object like
    // {
    //     drugA+drugB: {
    //         quartiles: {q1: 0, q3: 0},
    //         line: {min:0, max:0},
    //         whiskers: [min, med, max],
    //     }, ...
    // }
    const newData = {};
    let datasets = [];

    // putting all the zips in there first
    data.forEach((x) => {
      const combo = `${x.drugNameA} + ${x.drugNameB} / ${x.source}`;
      datasets.push(x.source);
      if (newData[combo] === undefined) {
        newData[combo] = {
          synScore: [x[synScore] == null ? 0 : x[synScore]],
          quant: {},
          line: {},
          whisk: [],
          dataset: x.source,
        };
      } else {
        newData[combo].synScore.push(x[synScore] == null ? 0 : x[synScore]);
      }
    });

    // calculate all the boxplot stuff
    // and create array of median objs for sorting
    const medScores = [];
    const minArr = [];
    const maxArr = [];
    Object.keys(newData).forEach((x) => {
      const dataSorted = newData[x].synScore.sort(d3.ascending);
      const q1 = d3.quantile(dataSorted, 0.25);
      const median = d3.quantile(dataSorted, 0.5);
      const q3 = d3.quantile(dataSorted, 0.75);
      const interQuantileRange = q3 - q1;
      const min = q1 - 1.5 * interQuantileRange;
      const max = q1 + 1.5 * interQuantileRange;
      minArr.push(min);
      maxArr.push(max);
      newData[x].quant = {
        q1,
        q3,
      };
      newData[x].line = {
        min,
        max,
      };
      newData[x].whisk = [min, median, max];
      medScores.push({
        combo: x,
        median,
      });
    });

    // sort by median decreasing, and output an array of combos to call them as the key
    medScores.sort((a, b) => b.median - a.median);

    // unique array of all datasets
    datasets = [...new Set(datasets)];

    const combos = medScores.map(x => x.combo);

    // i made all nulls = 0 earlier. If the entire array
    // is full of 0s for each combo, then don't include
    let newCombos = combos.map((c) => {
      if ((newData[c].synScore).every(x => x == 0)) {
        return null;
      }
      return c;
    });
    newCombos = newCombos.filter(x => x != null);
    const max = Math.max(...maxArr);
    const min = Math.min(...minArr);
    // return [data, combos]
    return [newData, newCombos, datasets, min, max];
  }

  plotSensBoxPlot(data, combos, datasets, plotId, min, max, synScore) {
    // positions and dimensions
    const margin = {
      top: 20,
      right: 50,
      bottom: 0,
      left: 20,
    };
    const boxHeight = 18;
    const yAxisWidth = 180;
    const xAxisHeight = 100;

    const width = 300;
    const height = combos.length * boxHeight + 100;

    // Add the svg canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('fill', 'white')
      .attr('id', 'boxplot')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${margin.left + 20},${margin.top})`);

    // x and y scales
    const xrange = d3.scaleLinear()
      .domain([min - 1, max + 1])
      .range([0, width]);

    const yrange = d3.scaleBand()
      .domain(combos)
      .range([0, combos.length * boxHeight]);

    // set axes for graph
    const xAxis = d3.axisBottom()
      .scale(xrange)
      .tickPadding(2);

    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height - xAxisHeight})`)
      .attr('fill', 'none')
      .attr('stroke', 'none')
      .attr('stroke-width', 1)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', 'black')
      .style('font-size', 11);

    const yAxis = d3.axisLeft()
      .scale(yrange)
      .tickPadding(2)
      .tickValues([]);

    // x axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 50)
      .attr('fill', 'black')
      .style('text-transform', 'uppercase')
      .text(synScore);

    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('transform', 'translate(0,0)')
      .call(yAxis);


    // adding chart group
    const chart = svg.append('g')
      .attr('id', 'chart');

    // color scale
    const color = {};
    const arrColor = ['#5fcfff', '#fca03e', '#54c9b7', '#f788c1', '#9a95de', '#f3c833', '#7456c7', '#7e6276', '#afb113'];
    datasets.forEach((x, i) => {
      color[x] = arrColor[i];
    });

    // keep track of datasets that were actually plotted
    let boxDatasets = [];

    // to make the boxplot, for each combo
    // Call by key to get the corresponding zip
    combos.forEach((c, i) => {
      // plot the horiz line
      chart.append('line')
        .attr('x1', xrange(data[c].line.min))
        .attr('x2', xrange(data[c].line.max))
        .attr('y1', yrange(c) + (boxHeight / 2))
        .attr('y2', yrange(c) + (boxHeight / 2))
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

      // plot the rect
      chart.append('rect')
        .attr('x', xrange(data[c].quant.q1))
        .attr('class', `rect${i}`)
        .attr('y', yrange(c))
        .attr('width', xrange(data[c].quant.q3) - xrange(data[c].quant.q1))
        .attr('height', boxHeight)
        .attr('fill', color[data[c].dataset])
        .attr('stroke', 'none');

      chart.selectAll(`rect${i}`)
        .data(data[c].whisk)
        .enter()
        .append('line')
        .attr('x1', d => xrange(d))
        .attr('x2', d => xrange(d))
        .attr('y1', yrange(c))
        .attr('y2', yrange(c) + (boxHeight))
        .attr('stroke', 'black');

      boxDatasets.push(data[c].dataset);
    });
    // unique the datasets
    boxDatasets = [...new Set(boxDatasets)];

    // find all the datasets that aren't in boxDatasets,
    // and remove them from the color JSON

    datasets.forEach((x) => {
      if (!boxDatasets.includes(x)) {
        delete color[x];
      }
    });
    this.props.callBack(color);
  }

  render() {
    const { legendColors } = this.state;
    return (
      <Fragment>
        <div id={this.props.plotId} className="plot" />

      </Fragment>
    );
  }
}

export default SensBoxPlot;
