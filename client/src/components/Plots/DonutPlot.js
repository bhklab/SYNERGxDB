import * as d3 from 'd3';
import React from 'react';
import colors from '../../styles/colors';

class DonutPlot extends React.Component {

  componentDidMount() {
    const {
      keyName, plotId, dimensions, formatData, donutData
    } = this.props;
    
    const data = formatData(donutData, keyName);
    this.plotDonut(data, data.length, plotId, dimensions, keyName);
  }

  plotDonut(donutData, sum, plotId, dims, keyName) {
    // positions and dimensions
    const margin = {
      top: 20,
      right: 50,
      bottom: 90,
      left: 20,
    };


    const colorPlot = d3.scaleOrdinal(['#e69a61', '#9817ff', '#18c61a', '#33b4ff', '#c9167e', '#297853', '#d7011b', '#7456c7', '#7e6276', '#afb113', '#fd879c', '#fb78fa', '#24c373', '#45bbc5', '#766b21', '#abad93', '#c19ce3', '#fd8f11', '#2f56ff', '#307a11', '#b3483c', '#0d7396', '#94b665', '#9d4d91', '#b807c8', '#086cbf', '#a2abc5', '#a35702', '#d3084b', '#8c6148', '#fa82ce', '#71be42', '#2bc0a0', '#b64064', '#d09fa2', '#daa229', '#5a6f68', '#c1aa5f', '#8943dc', '#b72ba6', '#6e629e', '#e094bf', '#dd8df2', '#c03d0b', '#7db799', '#617046', '#ff8a78', '#1263e2', '#91aaea', '#cea37e', '#9e555c', '#67b4db', '#05767b', '#537428', '#04c553', '#88b3b7', '#ff8d52', '#8abb0b', '#9b43b9', '#c83030', '#6fbc7c', '#596c83', '#926023', '#e9958d', '#a127e3', '#027b36', '#94577d', '#7543f8', '#8257ab', '#c0ab3c', '#416ca4', '#a3b444', '#b53c7e', '#ca2064', '#64c104', '#5662c0', '#c1a0c6', '#5e56e3', '#9cb37c', '#9f573b', '#65bf64', '#7e6839', '#d6a250', '#c0384a', '#75685b', '#657105', '#b1a9a9', '#ab5025', '#ea9940', '#a1a4f9', '#a9409f', '#48745a', '#dd92d5', '#c90392', '#53bcaf', '#c298f9', '#6d668a', '#aa31c0', '#e89777', '#b5ac76', '#8b5f62', '#fb85b9', '#43763f', '#38c18a', '#8ab94c', '#f87fe4', '#e196aa', '#a74b77', '#885997', '#c9a918', '#50c237', '#d50438', '#d2a267', '#acb05e', '#c1a693', '#6d696f', '#b04950', '#ba4327', '#4f7603', '#3a7282', '#2cbada', '#ed990a', '#b24c07']);

    // Add the svg canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('fill', 'white')
      .data([donutData])
      .attr('width', dims.width + margin.left + margin.right)
      .attr('height', dims.height + margin.top + margin.bottom)
      .attr('transform',
        `translate(${ margin.left },${margin.top})`)
      .attr('id', 'pie')
      .append('g')
      .attr('transform',
        `translate(${dims.radius},${dims.radius + dims.translate})`)
        .attr('id', `g-${ keyName}`);


    const title = svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', colors.blue_main)
      .style('font-size', '24px')
      .style('font-weight', '700')
      .style('text-transform', 'capitalize')
      .attr('transform', `translate(0,5)`)
      .text(d => (keyName == "origin" ? "biopsy": keyName));


    const arc = d3.arc()
      .outerRadius(dims.radius)
      .innerRadius(dims.radius - (dims.radius / 2.87));

    const pie = d3.pie()
      .value(d => d.num);

    // tooltip
    const tooltip = d3.select(`#${plotId}`)
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('color', colors.blue_main)
      .style('padding', '2px 8px')
      .style('background', '#fff')
      .style('border-radius', '10px')
      .text('hehe'); // it changes, don't worry


    // making each slice of pie
    const arcs = svg.selectAll('g.slice')
      .data(pie)
      .enter()
      .append('svg:g')
      .attr('class', (d, i) => donutData[i].name);


    arcs.append('svg:path')
      .attr('fill', (d, i) => colorPlot(i))
      .style('opacity', 0.7)
      .attr('d', arc)
      .on('mouseover', (d) => {
        tooltip.text(`${d.data.name }: ${d3.format('.2f')((d.data.num / sum) * 100)}%`).style('visibility', 'visible');
      })
      .on('mousemove', () => {
        tooltip.style('top', `${d3.event.pageY - 10}px`).style('left', `${d3.event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });


    // legend
    for (let i = 0; i < donutData.length; i++) {
      svg.append('rect')
        .attr('x', dims.width - (dims.width / 2 + 15))
        .attr('y', i * 35 - (dims.height/2 + dims.rectY)) 
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', colorPlot(i))
        .style('opacity', 0.7);


      svg.append('text')
        .attr('x', dims.width - (dims.width / 2 - 5))
        .attr('y', i * 35 - (dims.height / 2 + dims.textY)) 
        .attr('id', `legendLabel${donutData[i].name}`)
        .style('text-anchor', 'start')
        .style('font-size', '14px')
        .style('opacity', 1)
        .attr('fill', colors.blue_main)
        .text(donutData[i].name);
    }
  }

  render() {
    return <div id={this.props.plotId} className="plot" />;
  }
}

export default DonutPlot;
