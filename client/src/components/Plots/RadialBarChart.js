import * as d3 from "d3";
import React from 'react';
import colors from '../../styles/colors';

class RadialBarChart extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            plotId
          } = this.props;
        fetch('/api/drugs/')
            .then(response => response.json())
            .then((drugData) => {
                fetch('/api/datasets')
                    .then(response => response.json())
                    .then((datasetData) => {
                        const barData = this.formatData(drugData, datasetData);
                        // this.plotRadialBarChart(barData, plotId);
                    })
                

            });        
    }

    formatData(drugData, datasetData) {
        let result = [];

        // initializing result with dataset names
        datasetData.forEach(function(x) {
            let temp = {};
            temp.name = x.name; 
            temp.num = 0;
            result.push(temp)
        })
        
        drugData.forEach(function(x) {
            let datasets = x.dataset_names.split(",");
            datasets.forEach(function(dset) {
                const ind = result.findIndex(function(item, i) {
                    return item.name === dset;
                })
                result[ind].num = result[ind].num + 1
            })
        })
        console.log(result);

        return result;
    }

    plotRadialBarChart(data, plotId) {
        //positions and dimensions
        var margin = {
            top: 20,
            right: 50,
            bottom: 90,
            left: 20
        };
            
        let width = 600;
        let height = 400;
        let radius = 230;
        

        const color = d3.scaleOrdinal(["#e69a61", "#9817ff", "#18c61a", "#33b4ff", "#c9167e", "#297853", "#d7011b", "#7456c7", "#7e6276", "#afb113", "#fd879c", "#fb78fa", "#24c373", "#45bbc5", "#766b21", "#abad93", "#c19ce3", "#fd8f11", "#2f56ff", "#307a11", "#b3483c", "#0d7396", "#94b665", "#9d4d91", "#b807c8", "#086cbf", "#a2abc5", "#a35702", "#d3084b", "#8c6148", "#fa82ce", "#71be42", "#2bc0a0", "#b64064", "#d09fa2", "#daa229", "#5a6f68", "#c1aa5f", "#8943dc", "#b72ba6", "#6e629e", "#e094bf", "#dd8df2", "#c03d0b", "#7db799", "#617046", "#ff8a78", "#1263e2", "#91aaea", "#cea37e", "#9e555c", "#67b4db", "#05767b", "#537428", "#04c553", "#88b3b7", "#ff8d52", "#8abb0b", "#9b43b9", "#c83030", "#6fbc7c", "#596c83", "#926023", "#e9958d", "#a127e3", "#027b36", "#94577d", "#7543f8", "#8257ab", "#c0ab3c", "#416ca4", "#a3b444", "#b53c7e", "#ca2064", "#64c104", "#5662c0", "#c1a0c6", "#5e56e3", "#9cb37c", "#9f573b", "#65bf64", "#7e6839", "#d6a250", "#c0384a", "#75685b", "#657105", "#b1a9a9", "#ab5025", "#ea9940", "#a1a4f9", "#a9409f", "#48745a", "#dd92d5", "#c90392", "#53bcaf", "#c298f9", "#6d668a", "#aa31c0", "#e89777", "#b5ac76", "#8b5f62", "#fb85b9", "#43763f", "#38c18a", "#8ab94c", "#f87fe4", "#e196aa", "#a74b77", "#885997", "#c9a918", "#50c237", "#d50438", "#d2a267", "#acb05e", "#c1a693", "#6d696f", "#b04950", "#ba4327", "#4f7603", "#3a7282", "#2cbada", "#ed990a", "#b24c07" ]);

        // Add the svg canvas
        var svg = d3.select("#" + plotId)
            .append("svg")
            .attr("fill", "white")
                .data(data)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")")
            .attr("id", "radialBar")
            .append("g")
                .attr("transform",
                        "translate(" + radius + "," + (radius) + ")")

        let tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip');
                      
        const PI = Math.PI,
            arcMinRadius = 10,
            arcPadding = 10,
            labelPadding = -5,
            numTicks = 10;

        let scale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) * 1.1])
            .range([0, 2 * PI]);

        let ticks = scale.ticks(numTicks).slice(0, -1);
        let keys = data.map((d, i) => d.name);
        //number of arcs
        const numArcs = keys.length;
        const arcWidth = (radius - arcMinRadius - numArcs * arcPadding) / numArcs;

        let arc = d3.arc()
            .innerRadius((d, i) => getInnerRadius(i))
            .outerRadius((d, i) => getOuterRadius(i))
            .startAngle(0)
            .endAngle((d, i) => scale(d))

        let radialAxis = svg.append('g')
            .attr('class', 'r axis')
            .selectAll('g')
            .data(data)
            .enter().append('g');

        radialAxis.append('circle')
            .attr('r', (d, i) => getOuterRadius(i) + arcPadding);

        radialAxis.append('text')
            .attr('x', labelPadding)
            .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
            .text(d => d.name);

        let axialAxis = svg.append('g')
            .attr('class', 'a axis')
            .selectAll('g')
            .data(ticks)
            .enter().append('g')
                .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

        axialAxis.append('line')
            .attr('x2', radius);

        axialAxis.append('text')
            .attr('x', radius + 10)
            .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
            .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (radius + 10) + ',0)')
            .text(d => d);

        //data arcs
        let arcs = svg.append('g')
            .attr('class', 'data')
            .selectAll('path')
            .data(data)
            .enter().append('path')
            .attr('class', 'arc')
            .style('fill', (d, i) => color(i))

        arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTween);

        arcs.on('mousemove', showTooltip)
        arcs.on('mouseout', hideTooltip)


        function arcTween(d, i) {
            let interpolate = d3.interpolate(0, d.value);
            return t => arc(interpolate(t), i);
        }

        function showTooltip(d) {
            tooltip.style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(d.value);
        }

        function hideTooltip() {
            tooltip.style('display', 'none');
        }

        function rad2deg(angle) {
            return angle * 180 / PI;
        }

        function getInnerRadius(index) {
            return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
        }

        function getOuterRadius(index) {
            return getInnerRadius(index) + arcWidth;
        }
    }
    render() { 
        return <div id={this.props.plotId} className="plot"></div> 
    }

}

export default RadialBarChart;