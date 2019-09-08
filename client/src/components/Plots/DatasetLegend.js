import * as d3 from 'd3';
import React from 'react';
import colors from '../../styles/colors';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    span {
        font-size:85%;
    }
    br {
        line-height:0px !important;
    }

`;
class DatasetLegend extends React.Component {

    componentDidMount() {
        const {data, datasetData, plotId} = this.props;
        this.plotLegend(data, datasetData, plotId);
    }

    plotLegend(data, datasetData, plotId) {
        // formatting the sums
        for (let i = 0; i < data.length; i++) {
            // find the dataset name in datasetData to get the ns
            const ind = datasetData.findIndex(item => item.name === data[i].name);
            data[i].nCombos = datasetData[ind].nCombos
            data[i].nDatapoints = datasetData[ind].nDatapoints
            data[i].nExperiments = datasetData[ind].nExperiments
        }
        
        // getting an array of dataset to sort alphabetically
        const datasets = []
        data.forEach((val) => {
            datasets.push(val.name)
        })
        datasets.sort();

        const width = 1050;
        const height = 110;
        const svg = d3.select(`#${plotId}`)
            .append('svg')
            .attr('fill', 'white')
            .attr('width', width)
            .attr('height', height)
            .attr('id', 'legend')
            .append('g')

        for (let i = 0; i < datasets.length; i++) {
            // find the name in the array
            const ind = data.findIndex(item => item.name === datasets[i]);

            svg.append('rect')
                .attr('x', i * 150)
                .attr('y', 10) 
                .attr('width', 15)
                .attr('height', 15)
                .style('fill', function() {return data[ind].color})
                .style('opacity', 0.7);

            svg.append('foreignObject')
                .attr('x', 20 + (i * 150))
                .attr('y', 10) 
                .attr('id', `legendLabel${data[ind].name}`)
                .style('text-anchor', 'start')
                .style("text-align", "left")
                .style('font-size', 14)
                .style("text-transform", "normal")
                .style('opacity', 1)
                .attr('fill', colors.blue_main)
                .attr("width", 180)
                .attr("height", 70)
                .html(function() {return data[ind].name + "<span>" +
                    "<br> Combos: " + d3.format(",")(data[ind].nCombos)  + "</br>" + 
                    "Experiments: " + d3.format(",") (data[ind].nExperiments) + 
                    "<br> Datapoints: " + d3.format(",")(data[ind].nDatapoints) + "</br>" + 
                    "</span>"
                });
            }
    }

    render() {
        return <StyledWrapper>
            <div id={this.props.plotId} className="plot" />
        </StyledWrapper>;
    }
    
}

export default DatasetLegend;