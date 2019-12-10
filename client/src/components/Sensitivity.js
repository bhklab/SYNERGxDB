import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import QueryCard from './UtilComponents/QueryCard';
import SensHeatMap from './Plots/SensHeatMap';
import SensBoxPlot from './Plots/SensBoxPlot';
import CellSensLegends from './Plots/CellSensLegends';
// import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

const SensitivityDiv = styled.div`
  width: 100%;
  height: 800px;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;
  display: inline-block;
  
  #sensHeatMap {
    overflow-x: scroll;
    width:500px;
    // position:absolute;
    position:relative;
    // margin-left:185px;
    float:left;
  }

  #sensBoxPlot {
    width:250px;
    margin-left:660px;
    position:absolute;
    float:left;
  }

  #legend {
    position:absolute;
    float:right;
    width:100px;
    margin-left:1000px;
    margin-top: 200px;
  }

  #leftAxis {
    float:left;
  }

  .plotWrapper {
    overflow-y: scroll;
    height:760px;
    position:absolute;
    float:left;
    width:1030px;
  }
`;


class Sensitivity extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
  }

  constructor() {
    super();
    this.state = {
      data: [],
      drugId1:"",
      drugId2:"",
      sample:"",
      dataset:"",
      legendColors:{},
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;
    this.setState({sample: sample, drugId1: drugId1, drugId2: drugId2, dataset: dataset})
    fetch(`/api/combos/heatmap?drugId1=${drugId1}&drugId2=${drugId2}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({data: data})
      });
  }

  callBackLegendColor = (data) => {
    this.setState({legendColors: data})
  }

  render() {
    const { data, sample, drugId1, drugId2, dataset, legendColors} = this.state;
    const query = [drugId1, drugId2];
    return (
      <main>
        {drugId1 == "" && drugId2 == "" ? null : (
          <QueryCard
            drugId1={drugId1}
            drugId2={drugId2}
            dataset={dataset}
            sample={sample}
          />
        )}
        
        <SensitivityDiv>
          {data.length == 0 ? null : (
            <Fragment>
              <div className="plotWrapper">
                <SensHeatMap
                  data={data}
                  query={query}
                  plotId="sensHeatMap"
                />
                <SensBoxPlot
                  data={data}
                  query={query}
                  callBack={this.callBackLegendColor}
                  plotId="sensBoxPlot"
                />
              </div>
            </Fragment>
          )}
          {Object.keys(legendColors).length == 0 ? null : (
              <CellSensLegends 
                  legendColors={legendColors}
                  plotId='legend'
              />
          )}
        </SensitivityDiv>
      </main>
    );
  }
}
export default Sensitivity;
