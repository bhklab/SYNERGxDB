import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import QueryCard from './UtilComponents/QueryCard';
import SensHeatMap from './Plots/SensHeatMap';
import SensBoxPlot from './Plots/SensBoxPlot';
// import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

const SensitivityDiv = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;
  display: inline-block;
  
  #sensHeatMap {
    overflow-x: scroll;
    width:600px;
    position:absolute;
    margin-left:150px;
    float:left;
  }

  #sensBoxPlot {
    width:300px;
    position:absolute;
    margin-left:720px;
  }


  #leftAxis {
    float:left;
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

  render() {
    const { data, sample, drugId1, drugId2, dataset, } = this.state;
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
                <SensHeatMap
                  data={data}
                  query={query}
                  plotId="sensHeatMap"
                />
                <SensBoxPlot
                  data={data}
                  query={query}
                  plotId="sensBoxPlot"
                />
            </Fragment>
          )}
        </SensitivityDiv>
      </main>
    );
  }
}
export default Sensitivity;
