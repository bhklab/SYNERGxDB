/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import ReactLoading from 'react-loading';
import Select from 'react-select';
import QueryCard from './UtilComponents/QueryCard';
import SensHeatMap from './Plots/SensHeatMap';
import SensBoxPlot from './Plots/SensBoxPlot';
import CellSensLegends from './Plots/CellSensLegends';
import SensAxisLegend from './Plots/SensAxisLegend';
import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

const SensitivityDiv = styled.div`
  width: 100%;
  height: ${props => props.height + 150}px;
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

  #leftAxisLegend {
    width: 50%;
    float: left;
  }

  .plotWrapper {
    overflow-y: hidden;
    overflow-x: hidden;
    height:${props => props.height + 50}px;
    position:absolute;
    float:left;
    width:1030px;
  }

  .loading-container {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .select {
    width: 30%;
    float: right;
  }
  .top-container {
    height: 70px;
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
      drugId1: '',
      drugId2: '',
      drugName1: null,
      drugName2: null,
      sample: '',
      dataset: '',
      legendColors: {},
      height: '500',
      loading: true,
      synScore: 'zip',
    };
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;
    this.setState({
      sample, drugId1, drugId2, dataset,
    });
    let url = '/api/combos/heatmap';
    if (drugId1) url = url.concat(`?drugId1=${drugId1}`);
    if (drugId2) url = url.concat(`&drugId2=${drugId2}`);

    fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.setState({ data, loading: false });
      }).catch((err) => {
        console.log(err);
      });

    fetch(`api/drugs/${drugId1}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ drugName1: data[0].name });
      }).catch((err) => {
        console.log(err);
      });

    if (drugId2) {
      fetch(`api/drugs/${drugId2}`)
        .then(response => response.json())
        .then((data) => {
          this.setState({ drugName2: data[0].name });
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  callBackLegendColor = (data) => {
    this.setState({ legendColors: data });
  }

  heightCallback = (height) => {
    this.setState({ height });
  }

  onSelectChange = (e) => {
    this.setState({ synScore: e.value });
  }

  render() {
    const {
      data, sample, drugId1, drugId2, drugName1,
      drugName2, dataset, legendColors, loading, height, synScore,
    } = this.state;
    const options = [{ value: 'zip', label: 'ZIP' },
      { value: 'bliss', label: 'Bliss' },
      { value: 'loewe', label: 'Loewe' },
      { value: 'hsa', label: 'HSA' }];

    const query = [drugId1, drugId2];
    return (
      <main>
        {!drugId1 && !drugId2 ? null : (
          <QueryCard
            drugId1={drugId1}
            drugId2={drugId2}
            dataset={dataset}
            sample={sample}
          />
        )}

        <SensitivityDiv className="sensitivity-div" height={height}>
          {loading ? (
            <div className="loading-container">
              <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
            </div>
          ) : (
            <Fragment>
              <div className="top-container">
                {!drugName2 ? null : (
                  <SensAxisLegend
                    query={[drugName1, drugName2]}
                    plotId="leftAxisLegend"
                  />
                )}
                <div className="select">
                  <Select
                    options={options}
                    defaultValue={options[0]}
                    onChange={this.onSelectChange}
                  />
                </div>
              </div>
              <div className="plotWrapper">
                <SensHeatMap
                  data={data}
                  query={query}
                  plotId="sensHeatMap"
                  synScore={synScore}
                  heightCallback={this.heightCallback}
                />
                <SensBoxPlot
                  data={data}
                  query={query}
                  synScore={synScore}
                  callBack={this.callBackLegendColor}
                  plotId="sensBoxPlot"
                />
              </div>
            </Fragment>
          )}
          {Object.keys(legendColors).length === 0 ? null : (
            <CellSensLegends
              legendColors={legendColors}
              synScore={synScore}
              plotId="legend"
            />
          )}
        </SensitivityDiv>
      </main>
    );
  }
}
export default Sensitivity;
