import * as d3 from 'd3';
import React, {Fragment} from 'react';
// import colors from '../../styles/colors';

class CellSensLegends extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            legendColors, plotId
        } = this.props;
        this.plotLegends(legendColors, plotId);
    }

    plotLegends(legendColors, plotId) {
        // positions and dimensions
        const margin = {
            top: 20,
            right: 50,
            bottom: 0,
            left: 20,
        };
        const boxHeight = 18;
        const yAxisWidth = 180, xAxisHeight = 100;

        let width = 100;
        let height = 200;

        // Add the svg canvas
        const svg = d3.select(`#${plotId}`)
            .append('svg')
            .attr('fill', 'white')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('id', 'boxplot')
                .attr('transform',
                    `translate(${margin.left + 20},${margin.top})`);

        let zip = svg.append('g')
        
            let zipColors = ['#5fcfff','#de5757']; 
            let gradient = zip.append('defs')
                .append('linearGradient')
                .attr('id', 'grad')
                .attr('x1', '0%')
                .attr('x2', '0%')
                .attr('y1', '0%')
                .attr('y2', '100%');

                gradient.selectAll('stop')
                    .data(zipColors)
                    .enter()
                    .append('stop')
                    .style('stop-color', function(d){ return d; })
                    .attr('offset', function(d,i){
                    return 100 * (i / (zipColors.length - 1)) + '%';
                    })

            zip.append('text')
                .attr('dx', 15)
                .attr('dy', 0)
                .attr('fill', 'black')
                .attr('font-size', 13)
                .style('font-weight', 'bold')
                .text('ZIP')

            zip.append('rect')
                .attr('x', 10)
                .attr('y', 10)
                .attr('width', 30)
                .attr('height', 100)
                .style('fill', 'url(#grad)');
            
            

            zip.selectAll('zipLeg')
                .data([1,0,-1])
                .enter()
                .append('text')
                    .attr('dx', 45)
                    .attr('dy', (d,i) => i * 43 + 21)
                    .attr('fill', 'black')
                    .attr('font-size', 12)
                    .text((d) => d)

        // dataset legend for boxplot
        let box = svg.append('g')
            .attr('transform', 'translate(0,130)');

        let boxLegend = box.selectAll('boxLeg')
            .data(Object.keys(legendColors))
            .enter();
            
            boxLegend.append('rect')
                .attr('x', 0)
                .attr('y', (d,i) => i * 20)
                .attr('fill', (d) => legendColors[d])
                .attr('width', 15)
                .attr('height', 15);

            boxLegend.append('text')
                .attr('dx', 20)
                .attr('dy', (d,i) => i * 21 + 11)
                .attr('fill', 'black')
                .attr('font-size', 12)
                .text((d) => d)

        
    }

    render() {
        return (
            <div id={this.props.plotId} className="plot" />
        );
    }
}

export default CellSensLegends;
