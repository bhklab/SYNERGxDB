import * as d3 from 'd3';
import React, {Fragment} from 'react';
// import colors from '../../styles/colors';

class SensHeatMap extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            data, query, plotId
        } = this.props;
        const result = this.formatData(data, query);
        this.plotSensHeatMap(result[0], result[1], result[2], result[3], plotId);
    }

    formatData(data, query) {
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
        let newData = {};
        let allSamples = [];
        let queryCombo = '';
        data.forEach((x) => {
            const combo = `${x.drugNameA} + ${x.drugNameB}`;
            if (x.idDrugA == query[0] && x.idDrugB == query[1]) {
                queryCombo = combo;
            }
            if (newData[combo] === undefined) {
                newData[combo] = {
                    zip: [x.zip == null ? 0 : x.zip],
                    median: 0,
                    samples: {},
                    dataset: x.source,
                };
            } else {
                newData[combo].zip.push(x.zip == null ? 0 : x.zip);                
            }
            newData[combo].samples[x.sample] = x.zip;
            allSamples.push(x.sample);
        })

        // unique array of all samples
        allSamples = [...new Set(allSamples)];
        
        // median function
        const median = arr => {
            const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
            return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
        };

        // calculate median so it isn't 0 anymore
        // and create array of median objs for sorting
        let medZips = []
        Object.keys(newData).forEach((x) => {
            let medianValue = median(newData[x].zip)
            newData[x].median = medianValue;
            medZips.push({
                'combo': x,
                'median': medianValue,
            })
        })
        
        // sort by median increasing, and output an array of combos to call them as the key
        medZips.sort((a,b) => {
            return a.median - b.median;
        });
        const combos = medZips.map((x) => x.combo);

        // sort by first row samples decreasing and output an array of samples to call them as the key
            // get first row and create array of zip objs for sorting
            const firstRow = newData[combos[0]];
            let firstZips = [];
            Object.keys(firstRow.samples).forEach((x) => {
                firstZips.push({
                    'sample': x,
                    'zip': firstRow.samples[x]
                })
            })

            // sort by zip decreasing, output an array of samples to call them as the key
            firstZips.sort((a,b) => {
                return b.zip - a.zip;
            })

            // for all the samples that are in allSamples but not in the first row samples,
            // add to the end of the first row samples array (have a zip of null)
            let samples = firstZips.map((x) => x.sample);
            const diff = allSamples.filter(x => !samples.includes(x));
            samples = samples.concat(diff);
        
        // i made all nulls = 0 earlier. If the entire array
        // is full of 0s for each combo, then don't include
        let newCombos = combos.map((c) => {
            if (Object.values(newData[c].samples).every((x) => !x)) {
                return null;
            } else {
                return c
            }
        })
        newCombos = newCombos.filter(function (x) {
            return x != null;
        });
        // same for samples = remove samples with zip null
        let newSamples = samples.map((s) => {
            let samplesZip = Object.values(newData).map((x) => x.samples[s]);
            if (samplesZip.every((x) => !x)) {
                return null;
            } else {
                return s
            }
        })
        newSamples = newSamples.filter(function (x) {
            return x != null;
        });

        // return [data, combos, samples]
        return [newData, newCombos, newSamples, queryCombo]

        // to make the heatmap, for each combo, nested for each sample. 
        // Call by key to get the corresponding zip
    }

    plotSensHeatMap(data, combos, samples, queryCombo, plotId) {
        // positions and dimensions
        const margin = {
            top: 20,
            right: 50,
            bottom: 0,
            left: 20,
        };

        const yAxisWidth = 180, xAxisHeight = 100;

        let width = 1500;
        let height = combos.length * 18 + 100;

        const leftAxis = d3.select(`#leftAxis`)
            .append('svg')
            .attr('fill', 'white')
            .attr('width', yAxisWidth)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform',
                `translate(0,${margin.top})`);

        // Build X scales and axis:
        let yrange = d3.scaleBand()
            .domain(combos)
            .range([ combos.length * 18, 0 ])
            .padding(0.01);

        const yAxis = d3.axisLeft()
            .scale(yrange)
            .tickPadding(2);

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
                if (d === queryCombo) {
                    return 'orange';
                } else {
                    return 'black';
                }
            })
            .style('font-size', 11)
            .style('font-weight', (d) => {
                if (d === queryCombo) {
                    return 'bold';
                } else {
                    return 'none';
                }
            })
            .attr('stroke', 'none');

        // Add the svg canvas
        const svg = d3.select(`#${plotId}`)
            .append('svg')
            .attr('fill', 'white')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .attr('id', 'heatmap')
            .append('g')
            .attr('transform',
                `translate(${margin.left + 20},${margin.top})`);

        // adding chart group - it scrolls
        let chart = svg.append('g')
            .attr('id', 'chart')

        // color scale
        let color = d3.scaleLinear()
            .domain([-1,1])
            .range(['#5fcfff', '#fca03e'])

        // to make the heatmap, forEach combos, nested forEach samples. 
        // Call by key to get the corresponding zip
        combos.forEach((c, i) => {
            samples.forEach((s, j) => {
                chart.append("rect")
                    .attr("x", j * ((width)/samples.length))
                    .attr("y", i * 18)
                    .attr("width", (width)/samples.length )
                    .attr("height", 18)
                    .attr("class", "cell")
                    .style("fill", () => {
                        const temp = data[c].samples[s];
                        if (temp == undefined) {
                            return "#fff";
                        } else if (!temp) {
                            return "#fff"
                        } else {
                            return color(temp);
                        }
                    })
            })
        })

        // x and y scales
        let xrange = d3.scaleBand()
            .domain(samples)
            .range([ 0, width])
            .padding(0.01);

        // set axes for graph
        const xAxis = d3.axisBottom()
            .scale(xrange)
            .tickPadding(2);

        // Add the X Axis
        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(0,${height-xAxisHeight})`)
            .attr('fill', 'none')
            .attr('stroke', 'none')
            .attr('stroke-width', 1)
            .call(xAxis)
            .selectAll('text')
            .attr('fill', 'black')
            .style('font-size', 11)
            .attr('x',-5)
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-45)')
            .attr('stroke', 'none');
    }

    render() {
        return (
            <Fragment>
                <div id="leftAxis"></div>
                <div id={this.props.plotId} className="plot" />
            </Fragment>
        );
    }
}

export default SensHeatMap;