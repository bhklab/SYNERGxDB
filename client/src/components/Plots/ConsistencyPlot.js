import * as d3 from 'd3';
import React from 'react';
import colors from '../../styles/colors';
import ocpu from 'opencpu'

export default class ConsistencyPlot extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            plotId, data,
        } = this.props;
        this.plotConsistency(data, plotId);
    }

    plotConsistency(data, plotId) {
        const methods = ["ZIP", "Bliss" ,"Loewe", "HSA"]

        // set defaults in variables so that X and Y dropdowns can access values
        let xvalue = "Bliss"
        let yvalue = "ZIP"
        let width = 800;
        let height = 400;

        // dropdown to choose the method
        let dropdownX = d3.select(`#${plotId}`)
            .append('select')
            .attr('class','selectX')
            .on('change', () => {
                xvalue = dropdownX.property('value')
                // plot the scatter based on the method
                d3.select("#scatter").remove()
                this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), width, height, data, plotId)
            })

        dropdownX.selectAll('option')
            .data(methods)
            .enter()
            .append('option')
                .property("selected", function(d) { //roundabout way to make a default value but ok
                    if (d == xvalue) {
                        return d
                    }
                })
                .attr("value",function (d) { return d; })
                .text(function (d) { return d; });
              


        let dropdownY = d3.select(`#${plotId}`)
            .append('select')
            .attr('class','selectY')
            .on('change', () => {
                yvalue = dropdownY.property('value')
                // plot the scatter based on the method
                d3.select("#scatter").remove()
                this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), width, height, data, plotId)
            })

        dropdownY.selectAll('option')
            .data(methods)
            .enter()
            .append('option')
                .property("selected", function(d) { //roundabout way to make a default value but ok
                    if (d == yvalue) {
                        return d
                    }
                })
                .attr("value",function (d) { return d; })
                .text(function (d) { return d; });

        // call plot at the end to plot it after the dropdowns have been rendered
        this.plotScatter(xvalue.toLowerCase(), yvalue.toLowerCase(), width, height, data, plotId)
    }

    findCIndex(x,y) {
        console.log(x, y)
        // ocpu.rCall("library/base/R")
        // fetch('./R_functions/c_index.R')
        //     .then((r) => r.text())
        //     .then(text  => {
        //         console.log(text);
        //     })  

    }
    

    /**
     * from https://memory.psych.mun.ca/tech/js/correlation.shtml
     * calculates pearson correlation
     * @param {number[]} d1
     * @param {number[]} d2
     */
    findPearson(d1, d2) {
        let { min, pow, sqrt } = Math
        let add = (a, b) => a + b
        let n = min(d1.length, d2.length)
        if (n === 0) {
            return 0
        }
        [d1, d2] = [d1.slice(0, n), d2.slice(0, n)]
        let [sum1, sum2] = [d1, d2].map(l => l.reduce(add))
        let [pow1, pow2] = [d1, d2].map(l => l.reduce((a, b) => a + pow(b, 2), 0))
        let mulSum = d1.map((n, i) => n * d2[i]).reduce(add)
        let dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n))
        if (dense === 0) {
            return 0
        }
        return (mulSum - (sum1 * sum2 / n)) / dense
    }

    /** 
     * from https://stackoverflow.com/questions/15886527/javascript-library-for-pearson-and-or-spearman-correlations
    */
    findSpearman (multiList, p1, p2) {
        var N=multiList[p1].length;
        var order=[];
        var sum=0;
    
        for(var i = 0;i<N;i++){
            order.push([multiList[p1][i], multiList[p2][i]]);
        }

        order.sort(function(a,b){
            return a[0]-b[0]
        });

        for(var i = 0;i<N;i++){
            order[i].push(i+1);
        }

        order.sort(function(a,b){
            return a[1]-b[1]
        });

        for(var i = 0;i<N;i++){
            order[i].push(i+1);
        }
        for(var i = 0;i<N;i++){
            sum+=Math.pow((order[i][2])-(order[i][3]), 2);

        }

        var r=1-(6*sum/(N*(N*N-1)));

        return r;
    }

    plotScatter(xvalue, yvalue, width, height, data, plotId) {
        let margin = {
            top: 50,
            right: 120,
            bottom: 90,
            left: 70
        };

        let svg = d3.select(`#${plotId}`)
            .append("svg")
            .attr("fill", "white")
                .attr("id", "scatter")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
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

        //set axes for graph
        let xAxis = d3.axisBottom()
            .scale(xrange)
            .tickPadding(2)

        let yAxis = d3.axisLeft()
            .scale(yrange)
            .tickSize(5)

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .call(yAxis)
            .selectAll("text")
            .attr("fill", "black")
            .style("font-size", 15)
            .attr("stroke", "none");

        svg.selectAll(".tick")
            .select("text")
            .attr("fill", "black")
            .attr("stroke", "none")

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," +  height + ")")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .call(xAxis)
            .selectAll("text")
                .attr("fill", "black")
                .style("font-size", 14)
                .attr("stroke", "none")
 
        // make group for dots
        let dots = svg.selectAll("dot")
            .data(data)
            .enter();

        // add dots
        dots.append("circle")
            .attr("id", "dot")
            .attr("r", "3px")
            .attr("fill", `${colors.blue_main}`)
            .attr("cx", function(d, i) {return xrange(d[xvalue]);})
            .attr("cy", function(d, i) {return yrange(d[yvalue]);})
            .style("opacity", 1)
            .on("mouseover", function(d,i) {
                    d3.select("." + "dot-name" + i).transition().duration(300).style("opacity", "1");
                    d3.select(this).style("cursor", "pointer"); 
            })
            .on("mouseout", function(d,i) {
                    d3.select("." + "dot-name" + i).transition().duration(300).style("opacity", "0");
                    d3.select(this).style("cursor", "default"); 
                })

        // add tooltips for dots
        let tooltips = svg.append("g")
            .selectAll("text")
            .data(data)
            .enter();
        
        //Name Tooltip
        tooltips.append("text")
            .attr("class", function(d,i) {return "dot-name" + i})
            .attr("dx", width)
            .attr("dy", height/2)
            .attr("font-size", "13px")
            .style("opacity", "0")
            .attr("fill", "black")
            .text(function(d) {return d.sampleName})
  
        // calculating C-Index - map json to arrays and call, pearson, spearman
        const firstArr = data.map(x => x[xvalue])
        const secondArr = data.map(x => x[yvalue])
        let cInd = this.findCIndex(firstArr, secondArr)
        let pearson = this.findPearson(firstArr, secondArr)
        let spearman = this.findSpearman([firstArr, secondArr], 0, 1)
        console.log("pearson: ", pearson, " spearman: ", spearman)

        // append stats to dom
        svg.append("text")
            .attr("dx", width)
            .attr("dy", height/3)
            .attr("font-size", "13px")
            .style("opacity", "1")
            .attr("fill", "black")
            .text(function(d) {return "Pearson: " + d3.format(".4f")(pearson)})

        svg.append("text")
            .attr("dx", width)
            .attr("dy", height/3 + 20)
            .attr("font-size", "13px")
            .style("opacity", "1")
            .attr("fill", "black")
            .text(function(d) {return "Spearman: " + d3.format(".4f")(spearman)})
                
    }

    render() {
        return <div id={this.props.plotId} className="plot"></div> 
    }
}