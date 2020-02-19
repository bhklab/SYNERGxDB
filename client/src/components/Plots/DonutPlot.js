/* eslint-disable func-names */
import * as d3 from 'd3';
import React from 'react';
import colors from '../../styles/colors';

class DonutPlot extends React.Component {
  componentDidMount() {
    const {
      keyName, plotId, dimensions, formatData, donutData, legendCallBack,
    } = this.props;

    const data = formatData(donutData, keyName);
    const sum = data.reduce((count, item) => count + item.num,0);
    this.plotDonut(data, sum, plotId, dimensions, keyName, legendCallBack);
  }

  plotDonut(donutData, sum, plotId, dims, keyName) {
    
    // finding the null and removing
    const nullInd = donutData.findIndex((x) => x.name === "NULL")
    if (nullInd !== -1) {

      donutData.splice(nullInd, 1)
    }

    // positions and dimensions
    const margin = {
      top: 20,
      right: 60,
      bottom: 90,
      left: 20,
    };

    if (['Combinations', 'Measurements', 'Experiments'].includes(keyName)) {
      margin.right = 130;
    }

    // zips two arrays together, sorts increasing
    function zip(a, b) {
      const zipped = [];

      // zip
      for (let i = 0; i < a.length; i += 1) {
        zipped.push({ a: a[i], b: b[i] });
      }

      zipped.sort((x, y) => ((x.a < y.a) ? -1 : 1));

      const c = [];
      const d = [];

      for (let i = 0; i < zipped.length; i += 1) {
        c[i] = zipped[i].a;
        d[i] = zipped[i].b;
      }
      return [c, d];
    }

    const dataSorted = zip(donutData.map(x => x.name), donutData.map(x => x.num));
    const names = dataSorted[0];
    const nums = dataSorted[1];

    const colorPlot = d3.scaleOrdinal(['#e69a61', '#9817ff', '#18c61a', '#33b4ff', '#c9167e', '#297853', '#d7011b', '#fd879c', '#7e6276', '#afb113', '#7456c7', '#fb78fa', '#24c373', '#45bbc5', '#766b21', '#abad93', '#c19ce3', '#fd8f11', '#2f56ff', '#307a11', '#b3483c', '#0d7396', '#94b665', '#9d4d91', '#b807c8', '#086cbf', '#a2abc5', '#a35702', '#d3084b', '#8c6148', '#fa82ce', '#71be42', '#2bc0a0', '#b64064', '#d09fa2', '#daa229', '#5a6f68', '#c1aa5f', '#8943dc', '#b72ba6', '#6e629e', '#e094bf', '#dd8df2', '#c03d0b', '#7db799', '#617046', '#ff8a78', '#1263e2', '#91aaea', '#cea37e', '#9e555c', '#67b4db', '#05767b', '#537428', '#04c553', '#88b3b7', '#ff8d52', '#8abb0b', '#9b43b9', '#c83030', '#6fbc7c', '#596c83', '#926023', '#e9958d', '#a127e3', '#027b36', '#94577d', '#7543f8', '#8257ab', '#c0ab3c', '#416ca4', '#a3b444', '#b53c7e', '#ca2064', '#64c104', '#5662c0', '#c1a0c6', '#5e56e3', '#9cb37c', '#9f573b', '#65bf64', '#7e6839', '#d6a250', '#c0384a', '#75685b', '#657105', '#b1a9a9', '#ab5025', '#ea9940', '#a1a4f9', '#a9409f', '#48745a', '#dd92d5', '#c90392', '#53bcaf', '#c298f9', '#6d668a', '#aa31c0', '#e89777', '#b5ac76', '#8b5f62', '#fb85b9', '#43763f', '#38c18a', '#8ab94c', '#f87fe4', '#e196aa', '#a74b77', '#885997', '#c9a918', '#50c237', '#d50438', '#d2a267', '#acb05e', '#c1a693', '#6d696f', '#b04950', '#ba4327', '#4f7603', '#3a7282', '#2cbada', '#ed990a', '#b24c07']);

    // Add the svg canvas
    const svg = d3.select(`#${plotId}`)
      .append('svg')
      .attr('fill', 'white')
      .data([donutData])
      .attr('width', dims.width + margin.left + margin.right)
      .attr('height', dims.height + margin.top + margin.bottom)
      .attr('transform',
        `translate(${margin.left},${margin.top})`)
      .attr('id', 'pie')
      .append('g')
      .attr('transform',
        `translate(${dims.radius},${dims.radius + dims.translate})`)
      .attr('id', `g-${keyName}`);


    const title = svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', colors.blue_main)
      .style('font-size', '24px')
      .style('font-weight', '700')
      .style('text-transform', 'capitalize')
      .attr('transform', 'translate(0,5)')
      .text(() => (keyName === 'origin' ? 'biopsy' : keyName));

    // subtitle for N
    if (['Combinations', 'Measurements', 'Experiments'].includes(keyName)) {
      title.attr('transform', 'translate(0,0)');
      const subtitle = svg.append('foreignObject')
        .attr('fill', colors.blue_main)
        .style('font-size', '18px')
        .style('font-weight', '700')
        .style('text-transform', 'capitalize')
        .attr('x', -90)
        .attr('y', 5)
        .attr('width', 180)
        .attr('height', 30)
        .html(() => {
          if (keyName === "Combinations") {
            return `<i>N</i> = 14,536`
          } else if (keyName === "Experiments") {
            return `<i>N</i> = 477,389`
          } else if (keyName === "Measurements") {
            return `<i>N</i> = 5,996,090`
          } else {
            return `<i>N</i> = ${sum.toLocaleString()}`
          }
        });
    }

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

    const colorMap = [];
    arcs.append('svg:path')
      .attr('fill', (d, i) => {
        if (['Combinations', 'Measurements', 'Experiments'].includes(keyName)) {
          const ind = colorMap.findIndex(item => item.name === d.data.name);
          if (ind === -1) {
            colorMap.push({
              name: d.data.name,
              num: d.data.num,
              color: colorPlot(i),
            });
          } else {
            colorMap[ind][keyName] = d.data.num;
          }
        } else {
          colorMap.push({
            name: d.data.name,
            num: d.data.num,
            color: colorPlot(i),
          });
        }

        return colorPlot(i);
      })
      .style('opacity', 0.7)
      .attr('d', arc);

    function arcTween(newAngle) {
      return function (d) {
        const interpolate = d3.interpolate(d.endAngle, newAngle);
        return function (t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      };
    }
    arcs.transition()
      .ease(d3.easeLinear)
      .duration(500)
      .attrTween('d', arcTween);


    arcs.on('mouseover', (d) => {
      tooltip.text(`${d.data.name}: ${d3.format('.2f')((d.data.num / sum) * 100)}%`).style('visibility', 'visible');
    })
      .on('mousemove', () => {
        tooltip.style('top', `${d3.event.pageY - 10}px`).style('left', `${d3.event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // passing the color map back to Datasets.js to create the legend in a separate component
    this.props.legendCallBack(colorMap);
    console.log(colorMap)

    if (!['Combinations', 'Measurements', 'Experiments'].includes(keyName)) {
      // legend
      for (let i = 0; i < names.length; i += 1) {
        svg.append('rect')
          .attr('x', dims.width - (dims.width / 2 + 30))
          .attr('y', i * 30 - (dims.height / 2 + dims.rectY))
          .attr('width', 15)
          .attr('height', 15)
          .style('fill', () => {
            const ind = colorMap.findIndex(item => item.name === names[i]);
            return colorMap[ind].color;
          })
          .style('opacity', 0.7);


        svg.append('foreignObject')
          .attr('x', dims.width - (dims.width / 2 + 10))
          .attr('y', i * 30 - (dims.height / 2 + dims.textY))
          .attr('id', `legendLabel${donutData[i].name}`)
          .style('text-anchor', 'start')
          .style('text-align', 'left')
          .style('font-size', () => { if (keyName === 'tissue') { return 13; } return 14; })
          .style('text-transform', () => { if (keyName === 'tissue') { return 'uppercase'; } return 'normal'; })
          .style('opacity', 1)
          .attr('fill', colors.blue_main)
          .attr('width', 180)
          .attr('height', 30)
      .html(() => { if (keyName) { return `${names[i]}, ${names[i] === 'upper digestive tract' ? '<br>' : ''}<i>N</i> = ${nums[i]}`; } return names[i]; });
      }
    }
  }

  render() {
    return <div id={this.props.plotId} className="plot" />;
  }
}

export default DonutPlot;
