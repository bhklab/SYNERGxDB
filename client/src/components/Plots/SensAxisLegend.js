import * as d3 from 'd3';
import React, { Fragment } from 'react';
// import colors from '../../styles/colors';

class CellSensLegends extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      query, plotId,
    } = this.props;
    this.plotLegend(query, plotId);
  }

  plotLegend(query, plotId) {
    // axis legend colours
    const legText = [
      `Yellow: combos including only ${query[0]}`,
      `Blue: combos including only ${query[1]}`,
      `Red: combos including both ${query[0]} and ${query[1]}`,
    ];
    const legColors = [
      '#d49d3d', '#5dadca', '#b63333',
    ];

    const legend = d3.select(`#${plotId}`).append('svg')
      .attr('fill', 'white')
      .attr('width', 300)
      .attr('height', 70)
      .append('g')
      .selectAll('axisLegend')
      .data(legText)
      .enter()
      .append('text')
      .attr('x', 0)
      .attr('y', (d, i) => i * 20 + 20)
      .attr('font-size', 12)
      .attr('fill', (d, i) => legColors[i])
      .text(d => d);
  }

  render() {
    return (
      <div id={this.props.plotId} className="plot" />
    );
  }
}

export default CellSensLegends;
