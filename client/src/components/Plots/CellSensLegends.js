/* eslint-disable class-methods-use-this */
import * as d3 from 'd3';
import React, { Fragment } from 'react';
// import colors from '../../styles/colors';

class CellSensLegends extends React.Component {
  componentDidMount() {
    const {
      legendColors, plotId, synScore,
    } = this.props;
    this.plotLegends(legendColors, plotId, synScore);
  }

  componentDidUpdate(prevProps) {
    // if synScore is updated
    const {
      legendColors, synScore, plotId,
    } = this.props;
    if (synScore !== prevProps.synScore) {
      d3.select('#boxplotLegendSvg').remove();
      this.plotLegends(legendColors, plotId, synScore);
    }
  }

  plotLegends(legendColors, plotId, synScore) {
    console.log(synScore);
    // positions and dimensions
    const margin = {
      top: 20,
      right: 50,
      bottom: 0,
      left: 20,
    };
    const boxHeight = 18;
    const yAxisWidth = 180; const
      xAxisHeight = 100;

    const width = 100;
    const height = 300;

    // Add the svg canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('fill', 'white')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('id', 'boxplotLegendSvg')
      .append('g')
      .attr('transform',
        `translate(${margin.left + 20},${margin.top})`);

    const score = svg.append('g');

    const scoreColors = ['#5fcfff', '#de5757'];
    const gradient = score.append('defs')
      .append('linearGradient')
      .attr('id', 'grad')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    gradient.selectAll('stop')
      .data(scoreColors)
      .enter()
      .append('stop')
      .style('stop-color', d => d)
      .attr('offset', (d, i) => `${100 * (i / (scoreColors.length - 1))}%`);

    score.append('text')
      .attr('dx', 15)
      .attr('dy', 0)
      .attr('fill', 'black')
      .attr('font-size', 13)
      .style('text-transform', 'uppercase')
      .style('font-weight', 'bold')
      .text(synScore);

    score.append('rect')
      .attr('x', 10)
      .attr('y', 10)
      .attr('width', 30)
      .attr('height', 100)
      .style('fill', 'url(#grad)');


    score.selectAll('scoreLeg')
      .data([15, 0, -15])
      .enter()
      .append('text')
      .attr('dx', 45)
      .attr('dy', (d, i) => i * 43 + 21)
      .attr('fill', 'black')
      .attr('font-size', 12)
      .text(d => d);

    // dataset legend for boxplot
    const box = svg.append('g')
      .attr('transform', 'translate(0,130)');

    const boxLegend = box.selectAll('boxLeg')
      .data(Object.keys(legendColors))
      .enter();

    boxLegend.append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 20)
      .attr('fill', d => legendColors[d])
      .attr('width', 15)
      .attr('height', 15);

    boxLegend.append('text')
      .attr('dx', 20)
      .attr('dy', (d, i) => i * 21 + 11)
      .attr('fill', 'black')
      .attr('font-size', 12)
      .text(d => d);
  }

  render() {
    return (
      <div id={this.props.plotId} className="plot" />
    );
  }
}

export default CellSensLegends;
