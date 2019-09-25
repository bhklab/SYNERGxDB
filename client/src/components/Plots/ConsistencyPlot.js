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
        console.log(data)
        this.plotConsistency(data, plotId);
    }

    plotConsistency(data, plotId) {
        const methods = ["ZIP", "Bliss" ,"Loewe", "HSA"]

        // set defaults in variables so that X and Y dropdowns can access values
        let xvalue = "Bliss"
        let yvalue = "ZIP"

        // dropdown to choose the method
        let dropdownX = d3.select(`#${plotId}`)
            .append('select')
            .attr('class','select')
            .on('change', () => {
                xvalue = d3.select(".select").property('value')

                // plot the scatter based on the method
                this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), data, plotId)
            })

        dropdownX.selectAll('option')
            .data(methods)
            .enter()
            .append('option')
                .text(function (d) { return d; });

        let dropdownY = d3.select(`#${plotId}`)
            .append('select')
            .attr('class','select')
            .on('change', () => {
                yvalue = d3.select(".select").property('value')

                // plot the scatter based on the method
                this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), data, plotId)
            })

        dropdownY.selectAll('option')
            .data(methods)
            .enter()
            .append('option')
                .text(function (d) { return d; });
       
    }

    plotScatter(xvalue, yvalue, data, plotId) {
        let margin = {
            top: 20,
            right: 50,
            bottom: 90,
            left: 70
        };

        let width = 800;
        let height = 400;

        let svg = d3.select(`#${plotId}`)
            .append("svg")
            .attr("fill", "white")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .attr("id", "scatter")
            .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        
        //set range for data by domain, and scale by range
        let xrange = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d[xvalue]; }))
            .range([0, width]);
    
        let yrange = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d[yvalue]; }))
            .range([height, 0]);
        
    }

    render() {
        return <div id={this.props.plotId} className="plot"></div> 
    }
}