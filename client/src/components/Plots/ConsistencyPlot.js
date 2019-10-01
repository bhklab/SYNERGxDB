import * as d3 from 'd3';
import React from 'react';
import colors from '../../styles/colors';


export default class ConsistencyPlot extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      plotId, data,
    } = this.props;
    this.plotConsistency(data, plotId);
  }

  plotConsistency(data, plotId) {
    const methods = ['ZIP', 'Bliss', 'Loewe', 'HSA'];

    // set defaults in variables so that X and Y dropdowns can access values
    let xvalue = 'Bliss';
    let yvalue = 'ZIP';
    const width = 800;
    const height = 400;

    // dropdown to choose the method
    const dropdownX = d3.select(`#${plotId}`)
      .append('select')
      .attr('class', 'selectX')
      .on('change', () => {
        xvalue = dropdownX.property('value');
        // plot the scatter based on the method
        d3.select('#scatter').remove();
        this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), width, height, data, plotId);
      });

    dropdownX.selectAll('option')
      .data(methods)
      .enter()
      .append('option')
      .property('selected', (d) => { // roundabout way to make a default value but ok
        if (d == xvalue) {
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
        d3.select('#scatter').remove();
        this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), width, height, data, plotId);
      });

    dropdownY.selectAll('option')
      .data(methods)
      .enter()
      .append('option')
      .property('selected', (d) => { // roundabout way to make a default value but ok
        if (d == yvalue) {
          return d;
        }
      })
      .attr('value', d => d)
      .text(d => d);

    // call plot at the end to plot it after the dropdowns have been rendered
    this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), width, height, data, plotId);
  }

  plotScatter(xvalue, yvalue, width, height, data, plotId) {
    const margin = {
      top: 50,
      right: 100,
      bottom: 90,
      left: 70,
    };

    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('fill', 'white')
      .attr('id', 'scatter')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);


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
      .attr('transform', `translate(0,${height})`)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', 'black')
      .style('font-size', 14)
      .attr('stroke', 'none');

    // make group for dots
    const dots = svg.selectAll('dot')
      .data(data)
      .enter();

    // add dots
    dots.append('circle')
      .attr('id', 'dot')
      .attr('r', '3px')
      .attr('fill', `${colors.blue_main}`)
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
      .attr('dx', width)
      .attr('dy', height / 2)
      .attr('font-size', '13px')
      .style('opacity', '0')
      .attr('fill', 'black')
      .text(d => d.sampleName);
  }

  render() {
    return <div id={this.props.plotId} className="plot" />;
  }
}
