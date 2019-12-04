import * as d3 from 'd3';
import React from 'react';
// import colors from '../../styles/colors';

class SensHeatMap extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            data, plotId
        } = this.props;
        const result = this.formatData(data);
        // this.plotSensHeatMap(result[0], result[1], result[2], plotId);
    }

    formatData(data) {
        // data is currently in a JSON array of sample, source, drugA, drugB, zip
        // make into a json object like
        // {
        //     drugA+drugB: {
        //         zip: [...zip scores], 
        //         median: 0, 
        //         samples: {
        //             sample1: zip1, 
        //             sample2: zip2...
        //         }
        //     }, ...
        // }
        let newData = {};
        let allSamples = [];
        data.forEach((x) => {
            const combo = `${x.drugNameA} + ${x.drugNameB}`;
            if (newData[combo] === undefined) {
                newData[combo] = {
                    zip: [x.zip == null ? 0 : x.zip],
                    median: 0,
                    samples: {}
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
        // and create array of objs for sorting
        let medZips = []
        Object.keys(newData).forEach((x) => {
            let medianValue = median(newData[x].zip)
            newData[x].median = medianValue;
            medZips.push({
                "combo": x,
                "median": medianValue,
            })
        })
        console.log(newData);
        
        // sort by median increasing, and output an array of combos to call them as the key
        medZips.sort(function (a, b) {
            return a.median - b.median;
        });
        const combos = medZips.map((x) => x.combo);
        console.log(combos)

        // sort by first row samples decreasing and output an array of samples to call them as the key
            // for all the samples that are in allSamples but not in the first row samples,
            // add to the end of the first row samples array (have a zip of 0)

        // return [data, combos, samples]

        // to make the heatmap, for each combo, nested for each sample. 
        // Call by key to get the corresponding zip
    }

    plotSensHeatMap(data, plotId) {
        // positions and dimensions
        const margin = {
        top: 20,
        right: 50,
        bottom: 90,
        left: 70,
        };

        const width = 600;
        const height = 900;

        // formatting data
        const numSamples = data.shift().numSamples;
        const numCombos = data.shift().numCombos;
        console.log(data)

        // Add the svg canvas
        const svg = d3.select(`#${plotId}`)
        .append('svg')
        .attr('fill', 'white')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('id', 'heatmap')
        .append('g')
        .attr('transform',
            `translate(${margin.left},${margin.top})`);

        // adding chart group
        const chart = svg.append('g')
        .attr('id', 'chart')
        .attr('transform', `translate(100,0)`);

        // to make the heatmap, forEach combos, nested forEach samples. 
        // Call by key to get the corresponding zip


    }

    render() {
        return <div id={this.props.plotId} className="plot" />;
    }
}

export default SensHeatMap;
