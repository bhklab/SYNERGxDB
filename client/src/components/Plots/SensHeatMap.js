/* eslint-disable class-methods-use-this */
import * as d3 from 'd3';
import React, { Fragment } from 'react';
// import colors from '../../styles/colors';

class SensHeatMap extends React.Component {
  componentDidMount() {
    const {
      data, query, plotId, heightCallback, synScore,
    } = this.props;
    const result = this.formatData(data, query, synScore);

    // return [data, combos, samples, datasets, query]
    this.plotSensHeatMap(result[0], result[1], result[2], result[3], result[4], plotId, synScore);
  }

  componentDidUpdate(prevProps) {
    // if synScore is updated
    const {
      data, query, plotId, heightCallback, synScore,
    } = this.props;
    if (synScore !== prevProps.synScore) {
      const result = this.formatData(data, query, synScore);
      d3.select('#heatmap').remove();
      d3.select('#leftAxisLegendSvg').remove();
      this.plotSensHeatMap(result[0], result[1], result[2], result[3], result[4], plotId, synScore);
    }
  }

  formatData(data, query, synScore) {
    // data is currently in a JSON array of sample, source, drugA, drugB, zip
    // make into a json object like
    // {
    //     drugA+drugB: {
    //         zip: [...zip scores],
    //         median: 0,
    //         samples: {
    //             sample1: zip1,
    //             sample2: zip2...
    //         },
    //         dataset: ""
    //     }, ...
    // }
    const newData = {};
    let allSamples = [];
    let queryCombo = [];
    let datasets = [];
    data.forEach((x) => {
      const combo = `${x.drugNameA} + ${x.drugNameB}/${x.source}`;
      if (x.idDrugA === parseInt(query[0]) && x.idDrugB === parseInt(query[1])) {
        queryCombo = [x.drugNameA, x.drugNameB];
      }
      datasets.push(x.source);
      if (newData[combo] === undefined) { // TODO: fix drug A + B, B + A
        newData[combo] = {
          synScore: [x[synScore] === null ? 0 : x[synScore]],
          median: 0,
          samples: {},
          dataset: x.source,
        };
      } else {
        newData[combo].synScore.push(x[synScore] === null ? 0 : x[synScore]);
      }
      newData[combo].samples[x.sample] = x[synScore];
      allSamples.push(x.sample);
    });

    // unique array of all samples
    allSamples = [...new Set(allSamples)];

    // unique array of all datasets
    datasets = [...new Set(datasets)];

    // median function
    const median = (arr) => {
      const mid = Math.floor(arr.length / 2);
      const nums = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    // calculate median so it isn't 0 anymore
    // and create array of median objs for sorting
    const medScores = [];
    Object.keys(newData).forEach((x) => {
      const medianValue = median(newData[x].synScore);
      newData[x].median = medianValue;
      medScores.push({
        combo: x,
        median: medianValue,
      });
    });

    // sort by median decreasing, and output an array of combos to call them as the key
    medScores.sort((a, b) => b.median - a.median);
    const combos = medScores.map(x => x.combo);

    // sort by first row samples decreasing and output an array of samples to call them as the key
    // get first row and create array of zip objs for sorting
    const firstRow = newData[combos[0]];
    const firstScores = [];
    Object.keys(firstRow.samples).forEach((x) => {
      firstScores.push({
        sample: x,
        synScore: firstRow.samples[x],
      });
    });

    // sort by zip decreasing, output an array of samples to call them as the key
    firstScores.sort((a, b) => b.synScore - a.synScore);

    // for all the samples that are in allSamples but not in the first row samples,
    // add to the end of the first row samples array (have a zip of null)
    let samples = firstScores.map(x => x.sample);
    const diff = allSamples.filter(x => !samples.includes(x));
    samples = samples.concat(diff);

    // i made all nulls = 0 earlier. If the entire array
    // is full of 0s for each combo, then don't include
    let newCombos = combos.map((c) => {
      if (Object.values(newData[c].samples).every(x => !x)) {
        return null;
      }
      return c;
    });
    newCombos = newCombos.filter(x => x != null);

    // same for samples = remove samples with zip null
    let newSamples = samples.map((s) => {
      const samplesScores = Object.values(newData).map(x => x.samples[s]);
      if (samplesScores.every(x => !x)) {
        return null;
      }
      return s;
    });
    newSamples = newSamples.filter(x => x != null);

    return [newData, newCombos, newSamples, datasets, queryCombo];

    // to make the heatmap, for each combo, nested for each sample.
    // Call by key to get the corresponding zip
  }

  plotSensHeatMap(data, combos, samples, datasets, queryCombo, plotId, synScore) {
    // positions and dimensions
    const margin = {
      top: 20,
      right: 50,
      bottom: 0,
      left: 0,
    };

    const yAxisWidth = 180; const
      xAxisHeight = 100;

    const width = 1500;
    const height = combos.length * 18 + 100;
    this.props.heightCallback(height);

    // document.getElementsByClassName('sensitivity-div').style.height(height)

    // Add the svg canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('fill', 'white')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'heatmap')
      .append('g')
      .attr('transform',
        `translate(${margin.left + 10},${margin.top})`);

    const leftAxis = d3.select('#leftAxis')
      .append('svg')
      .attr('fill', 'white')
      .attr('width', yAxisWidth)
      .attr('id', 'leftAxisLegendSvg')
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(0,${margin.top})`);

    // Build X scales and axis:
    const yrange = d3.scaleBand()
      .domain(combos)
      .range([0, combos.length * 18]);

    const yAxis = d3.axisLeft()
      .scale(yrange)
      .tickPadding(2)
      .tickFormat((d) => {
        const ind = d.indexOf('/');
        return d.substring(0, ind);
      })
      .tickSizeOuter(0);

    // Add the Y Axis
    leftAxis.append('g')
      .attr('class', 'x axis')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('transform', `translate(${yAxisWidth},0)`)
      .call(yAxis)
      .selectAll('text')
      .attr('fill', (d) => {
        if (d.includes(queryCombo[0]) && d.includes(queryCombo[1])) {
          return '#b63333';
        }
        if (d.includes(queryCombo[0])) {
          return '#d49d3d';
        }
        if (d.includes(queryCombo[1])) {
          return '#5dadca';
        }

        return 'black';
      })
      .style('font-size', 11)
      .style('font-weight', (d) => {
        if (d.includes(queryCombo[0]) && d.includes(queryCombo[1])) {
          return 'bold';
        }
        return 'none';
      })
      .attr('stroke', 'none');


    // adding chart group - it scrolls
    const chart = svg.append('g')
      .attr('id', 'chart')
      .attr('transform', 'translate(0,0)');

    // color scale
    // let color = {};
    // array of colours to use
    // const arrColorStart = ['#5fcfff', '#77c379', '#9a95de'],
    // arrColorEnd = ['#fca03e', '#de5757', '#f3c833'];

    // datasets.forEach((x,i) => {
    //     color[x] = d3.scaleLinear()
    //                 .domain([-1,1])
    //                 .range([arrColorStart[i],arrColorEnd[i]])

    // })

    // let color = d3.scaleLinear()
    //                 .domain([-1,1])
    //                 .range(['#5fcfff','#fca03e'])

    const color = d3.scaleLinear()
      .domain([-15, 15])
      .range(['#de5757', '#5fcfff']);

    // to make the heatmap, forEach combos, nested forEach samples.
    // Call by key to get the corresponding zip
    combos.forEach((c, i) => {
      samples.forEach((s, j) => {
        chart.append('rect')
          .attr('x', j * ((width) / samples.length))
          .attr('y', i * 18)
          .attr('width', (width) / samples.length)
          .attr('height', 18)
          .attr('class', 'cell')
          .style('fill', () => {
            const temp = data[c].samples[s];
            if (temp === undefined) {
              return '#fff';
            }
            if (!temp) {
              return '#fff';
            }
            if (temp > 15) {
              return color(15);
            }
            if (temp < -15) {
              return color(-15);
            }
            return color(temp);
          });
      });
    });

    // x and y scales
    const xrange = d3.scaleBand()
      .domain(samples)
      .range([0, width])
      .padding(0.01);

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
      .style('font-size', 11)
      .attr('x', -10)
      .attr('y', -1)
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-70)')
      .attr('stroke', 'none');
  }

  render() {
    return (
      <Fragment>
        <div id="leftAxis" />
        <div id={this.props.plotId} className="plot" />


      </Fragment>
    );
  }
}

export default SensHeatMap;
