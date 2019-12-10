import * as d3 from 'd3';
import React, {Fragment} from 'react';
import CellSensLegends from './CellSensLegends';
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
            data, query, plotId
        } = this.props;
        const result = this.formatData(data, query);
        const legendColors = this.plotSensBoxPlot(result[0], result[1], result[2], plotId);
        this.setState({legendColors: legendColors});
    }

    formatData(data, query) {
        // data is currently in a JSON array of sample, source, drugA, drugB, zip
        // make into a json object like
        // {
        //     drugA+drugB: {
        //         quartiles: {q1: 0, q3: 0},
        //         line: {min:0, max:0},
        //         whiskers: [min, med, max],
        //     }, ...
        // }
        let newData = {};
        let datasets = [];

        // putting all the zips in there first
        data.forEach((x) => {
            const combo = `${x.drugNameA} + ${x.drugNameB} / ${x.source}`;
            datasets.push(x.source)
            if (newData[combo] === undefined) {
                newData[combo] = {
                    zip: [x.zip == null ? 0 : x.zip],
                    quant: {},
                    line: {},
                    whisk: [],
                    dataset: x.source,
                };
            } else {
                newData[combo].zip.push(x.zip == null ? 0 : x.zip);                
            }
        })
        
        // calculate all the boxplot stuff
        // and create array of median objs for sorting
        let medZips = []
        Object.keys(newData).forEach((x) => {
            const data_sorted = newData[x].zip.sort(d3.ascending);
            const q1 = d3.quantile(data_sorted, .25);
            const median = d3.quantile(data_sorted, .5);
            const q3 = d3.quantile(data_sorted, .75);
            const interQuantileRange = q3 - q1;
            const min = q1 - 1.5 * interQuantileRange;
            const max = q1 + 1.5 * interQuantileRange;
            newData[x].quant = {
                'q1': q1,
                'q3': q3
            };
            newData[x].line = {
                'min': min,
                'max': max,
            };
            newData[x].whisk = [min, median, max];
            medZips.push({
                'combo': x,
                'median': median,
            })
        })
        
        // sort by median increasing, and output an array of combos to call them as the key
        medZips.sort((a,b) => {
            return a.median - b.median;
        });

        // unique array of all datasets
        datasets = [...new Set(datasets)];

        const combos = medZips.map((x) => x.combo);
        
        // i made all nulls = 0 earlier. If the entire array
        // is full of 0s for each combo, then don't include
        let newCombos = combos.map((c) => {
            if ((newData[c].zip).every((x) => x == 0)) {
                return null;
            } else {
                return c
            }
        })
        newCombos = newCombos.filter(function (x) {
            return x != null;
        });

        // return [data, combos]
        return [newData, newCombos, datasets];
    }

    plotSensBoxPlot(data, combos, datasets, plotId) {
        // positions and dimensions
        const margin = {
            top: 20,
            right: 50,
            bottom: 0,
            left: 20,
        };
        const boxHeight = 18;
        const yAxisWidth = 180, xAxisHeight = 100;

        let width = 300;
        let height = combos.length * boxHeight + 100;

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

        // x and y scales
        let xrange = d3.scaleLinear()
            .domain([-1,1])
            .range([0, width])

        let yrange = d3.scaleBand()
            .domain(combos)
            .range([0, combos.length * boxHeight])

        // set axes for graph
        const xAxis = d3.axisBottom()
            .scale(xrange)
            .tickPadding(2);

        // Add the X Axis
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height-xAxisHeight})`)
            .attr('fill', 'none')
            .attr('stroke', 'none')
            .attr('stroke-width', 1)
            .call(xAxis)
            .selectAll('text')
            .attr('fill', 'black')
            .style('font-size', 11)

        const yAxis = d3.axisLeft()
            .scale(yrange)
            .tickPadding(2)
            .tickValues([]);

        // Add the Y Axis
        svg.append('g')
            .attr('class', 'y axis')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('transform', `translate(0,0)`)
            .call(yAxis)
            

        // adding chart group
        let chart = svg.append('g')
            .attr('id', 'chart')

        // color scale
        let color = {};
        let arrColor = ['#5fcfff','#fca03e','#77c379', '#de5757', '#9a95de', '#f3c833'];
        datasets.forEach((x,i) => {
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
                .attr('y1', yrange(c) + (boxHeight/2))
                .attr('y2', yrange(c) + (boxHeight/2))
                .attr('stroke', 'black')
                .attr('stroke-width', 1)

            // plot the rect
            chart.append('rect')
                .attr('x', xrange(data[c].quant.q1)) 
                .attr('class', `rect${i}`)
                .attr('y', yrange(c))
                .attr('width', xrange(data[c].quant.q3)-xrange(data[c].quant.q1))
                .attr('height', boxHeight)
                .attr('fill', color[data[c].dataset])
                .attr('stroke', 'none')
            
            chart.selectAll(`rect${i}`)
                .data(data[c].whisk)
                .enter()
                    .append('line')
                    .attr('x1', (d) => xrange(d))
                    .attr('x2', (d) => xrange(d))
                    .attr('y1', yrange(c))
                    .attr('y2', yrange(c) + (boxHeight))
                    .attr('stroke', 'black')
                    
            boxDatasets.push(data[c].dataset);
        })
        // unique the datasets
        boxDatasets = [...new Set(boxDatasets)]

        // find all the datasets that aren't in boxDatasets, 
        // and remove them from the color JSON

        datasets.forEach((x) => {
            if (!boxDatasets.includes(x)) {
                delete color[x];
            }
        })
        return color;
    }

    render() {
        const {legendColors} = this.state;
        return (
            <Fragment>
                <div id={this.props.plotId} className="plot" />
                {Object.keys(legendColors).length == 0 ? null : (
                    <CellSensLegends 
                        legendColors={legendColors}
                        plotId='legend'
                    />
                )}
                
            </Fragment>
        );
    }
}

export default SensBoxPlot;
