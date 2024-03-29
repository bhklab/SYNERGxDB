import * as d3 from 'd3';
import React from 'react';
// import colors from '../../styles/colors';

class BarChart extends React.Component {
  componentDidMount() {
    const {
      plotId, formatData, drugsData, datasetData,
    } = this.props;
    // const data = formatData(drugsData, datasetData);
    const names = ['STANFORD', 'YALE-TNBC', 'MIT-MELANOMA', 'NCI-ALMANAC',
      'CLOUD', 'YALE-PDAC', 'MERCK', 'DECREASE', 'VISAGE'];
    const nums = [1818, 130, 108, 101, 55, 41, 38, 33, 2];
    this.plotBarChart(names, nums, plotId);
  }


  // eslint-disable-next-line class-methods-use-this
  plotBarChart(names, nums, plotId) {
    // positions and dimensions
    const margin = {
      top: 20,
      right: 50,
      bottom: 90,
      left: 70,
    };

    const width = 800;
    const height = 400;
    names.unshift('');
    nums.unshift(0);

    // additional array for line break/exaggerated values
    const numsBroken = [];
    nums.forEach((x) => {
      // if 10 < x < 800, then return x
      // if x === 0, return x
      // if 0 < x < 10, return 10
      // if x > 800, return x/5
      numsBroken.push((x < 800 && x > 10 ? x : (x > 800 ? x / 5 : (x === 0 ? x : 10))));
    });

    const color = d3.scaleOrdinal(['#e69a61', '#9817ff', '#18c61a', '#33b4ff', '#c9167e', '#297853', '#d7011b', '#7456c7', '#7e6276', '#afb113', '#fd879c', '#fb78fa', '#24c373', '#45bbc5', '#766b21', '#abad93', '#c19ce3', '#fd8f11', '#2f56ff', '#307a11', '#b3483c', '#0d7396', '#94b665', '#9d4d91', '#b807c8', '#086cbf', '#a2abc5', '#a35702', '#d3084b', '#8c6148', '#fa82ce', '#71be42', '#2bc0a0', '#b64064', '#d09fa2', '#daa229', '#5a6f68', '#c1aa5f', '#8943dc', '#b72ba6', '#6e629e', '#e094bf', '#dd8df2', '#c03d0b', '#7db799', '#617046', '#ff8a78', '#1263e2', '#91aaea', '#cea37e', '#9e555c', '#67b4db', '#05767b', '#537428', '#04c553', '#88b3b7', '#ff8d52', '#8abb0b', '#9b43b9', '#c83030', '#6fbc7c', '#596c83', '#926023', '#e9958d', '#a127e3', '#027b36', '#94577d', '#7543f8', '#8257ab', '#c0ab3c', '#416ca4', '#a3b444', '#b53c7e', '#ca2064', '#64c104', '#5662c0', '#c1a0c6', '#5e56e3', '#9cb37c', '#9f573b', '#65bf64', '#7e6839', '#d6a250', '#c0384a', '#75685b', '#657105', '#b1a9a9', '#ab5025', '#ea9940', '#a1a4f9', '#a9409f', '#48745a', '#dd92d5', '#c90392', '#53bcaf', '#c298f9', '#6d668a', '#aa31c0', '#e89777', '#b5ac76', '#8b5f62', '#fb85b9', '#43763f', '#38c18a', '#8ab94c', '#f87fe4', '#e196aa', '#a74b77', '#885997', '#c9a918', '#50c237', '#d50438', '#d2a267', '#acb05e', '#c1a693', '#6d696f', '#b04950', '#ba4327', '#4f7603', '#3a7282', '#2cbada', '#ed990a', '#b24c07']);

    // Add the svg canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('fill', 'white')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'Bar')
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);

    // calculating max for data
    const maxNum = Math.max.apply(null, numsBroken);

    // set range for data by domain, and scale by range
    const xrange = d3.scaleLinear()
      .domain([0, names.length])
      .range([0, width]);

    const yrange = d3.scaleLinear()
      .domain([0, maxNum + 50])
      .range([height, 0]);

    // set axes for graph
    const xAxis = d3.axisBottom()
      .scale(xrange)
      .tickPadding(2)
      .tickFormat((d, i) => names[i])
      .tickValues(d3.range(names.length));

    const yAxis = d3.axisLeft()
      .scale(yrange)
      .tickSize(5)
      .ticks(8);
    // .tickFormat(d3.format("s"));

    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y-axis')
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

    // making tick break
    svg.selectAll('.tick')
      .attr('class', (d, i) => `tick y${i}`);

    svg.select('.y7')
      .select('line')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('x1', -20)
      .attr('x2', 20)
      .attr('y1', -15)
      .attr('y2', -10);

    svg.select('.y7')
      .append('line')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .attr('x1', -20)
      .attr('x2', 20)
      .attr('y1', -5)
      .attr('y2', 0);


    svg.select('.y8 text')
      .text('2000');

    svg.select('.y7 text')
      .text('');


    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', 'black')
      .style('font-size', 14)
      .attr('stroke', 'none')
      .attr('text-anchor', 'end')
      .attr('dx', 10)
      .attr('dy', 15)
      .attr('transform', 'rotate(-20)');


    // adding chart group
    const chart = svg.append('g')
      .attr('transform', 'translate(0,0)')
      .attr('id', 'chart');

    // adding each bar
    const bars = chart.selectAll('.bar')
      .data(numsBroken)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('width', 50)
      .attr('x', (d, i) => xrange(i) - 25)
      .attr('y', d => yrange(d))
      .style('fill', (d, i) => color(i))
      .attr('height', d => height - yrange(d))
      .on('mouseover', function (d, i) {
        d3.select(this).transition()
          .duration(300).style('opacity', 0.6);
        d3.select(`#${names[i]}vertnum`).transition()
          .duration(300).style('opacity', 1);
        d3.select(this).style('cursor', 'pointer');
      })
      .on('mouseout', function (d, i) {
        d3.select(this).transition()
          .duration(300).style('opacity', 1);
        d3.select(`#${names[i]}vertnum`).transition()
          .duration(300).style('opacity', 0);
        d3.select(this).style('cursor', 'default');
      });

    // bars.transition()
    // .duration(800)
    // .ease(d3.easeLinear)
    // .attr('height',function(d){ return height - yrange(d);})
    // .attr('y', function(d){ return yrange(d)})


    // appending text on hover
    for (let i = 1; i < nums.length; i++) {
      svg.append('text')
        .attr('x', xrange(i))
        .attr('y', `${yrange(numsBroken[i]) - 10}px`)
        .attr('id', `${names[i]}vertnum`)
        .style('text-anchor', 'middle')
        .style('font-size', '13px')
        .attr('fill', 'black')
        .style('opacity', 0)
        .text(nums[i].toLocaleString());
    }
  }

  render() {
    return <div id={this.props.plotId} className="plot" />;
  }
}

export default BarChart;
