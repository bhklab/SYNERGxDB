/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import Slider from '@material-ui/core/Slider';
// import ReactTable from 'react-table';
// import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

import ExpressionProfile from './Plots/ExpressionProfile';
import QueryCard from './QueryCard';
import BiomarkerBoxPlot from './Plots/BiomarkerBoxPlot';

// used to align plot and slider (in px)
const dimensions = {
  left: 55,
  top: 30,
  bottom: 55,
};

const StyledBiomarkers = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;
  
`;

const StyledExpressionProfile = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  div.slider {
    height: 450px;
    padding-top: ${dimensions.top}px;
    padding-bottom: ${dimensions.bottom}px
    padding-right: 8px;
    padding-left: 2px;
  }

  .expression-profile {
    width: 50%;
    min-width: 400px;
    display: flex
    justify-content: space-between;
    height: 450px;
  }
`;

const calculateThreshold = (synScoreArray) => {
  if (synScoreArray) {
    const output = synScoreArray.length % 2 !== 0 ? synScoreArray[(synScoreArray.length - 1) / 2]
      : (synScoreArray[synScoreArray.length / 2] + synScoreArray[synScoreArray.length / 2 - 1]) / 2;
    return output;
  }
  return null;
};


class Biomarkers extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
  }

  constructor() {
    super();
    this.state = {
      // biomarkerData: [],
      biomarkerData: null,
      selectedBiomarker: null,
      loading: true,
      xRange: null,
      yRange: null,
      defaultThreshold: null,
      customThreshold: null,
      confirmedThreshold: null,
    };
    // this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const gene = 'ARL13A';
    // const gene = 'A2M';
    this.setState({ selectedBiomarker: gene });
    this.getPlotData(gene);
  }


  async getPlotData(gene) {
    try {
      const { location } = this.props;
      const requestParams = queryString.parse(location.search);
      const {
        sample, drugId1, drugId2, dataset,
      } = requestParams;
      let queryParams = '?';
      let biomarkerParams = `?gene=${gene}`;

      if (sample) {
        queryParams = queryParams.concat(`&sample=${sample}`);
        biomarkerParams = biomarkerParams.concat(`&sample=${sample}`);
      }
      if (dataset) queryParams = queryParams.concat(`&dataset=${dataset}`);
      if (drugId1) queryParams = queryParams.concat(`&drugId1=${drugId1}`);
      if (drugId2) queryParams = queryParams.concat(`&drugId2=${drugId2}`);

      const synergyObj = {};

      // API call to retrieve all relevant synergy scores
      await fetch('/api/combos'.concat(queryParams), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then((data) => {
          data.sort((a, b) => a.idSample - b.idSample);
          // Doesn't take into account significance of the data
          // Duplicated data should be filtered based on significance, use C-index
          data.forEach((score) => {
            if (!synergyObj[score.idSample]) {
              synergyObj[score.idSample] = {
                zip: score.zip,
                bliss: score.bliss,
              };
            }
          });
        });

      // API call to retrieve all fpkm expression levels
      await fetch('/api/biomarkers/association'.concat(biomarkerParams), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(response => response.json())
        .then((cellLineExpressionData) => {
          // Doesn't take into account significance of the data
          // Duplicated data should be filtered based on significance, use C-index
          cellLineExpressionData.forEach((item) => {
            if (synergyObj[item.idSample]) {
              synergyObj[item.idSample].fpkm = item.fpkm;
              synergyObj[item.idSample].cellName = item.name;
            }
          });
          // Loops through synergyObj and deletes incomplete key value pair
          // if it has incomplete data
          Object.entries(synergyObj).forEach((item) => {
            if (item[1].fpkm === undefined) delete synergyObj[item[0]];
          });
        });

      // ***************************
      // Sets plot range
      // ***************************
      const paddingPercent = 0.05;
      let lowestFPKM = 0;
      let highestFPKM = 0;
      let lowestSynScore = 0;
      let highestSynScore = 0;
      Object.values(synergyObj).forEach((item) => {
        if (item.fpkm < lowestFPKM) lowestFPKM = item.fpkm;
        if (item.fpkm > highestFPKM) highestFPKM = item.fpkm;
        if (item.zip < lowestSynScore) lowestSynScore = item.zip;
        if (item.zip > highestSynScore) highestSynScore = item.zip;
      });
      const rangeFPKM = highestFPKM - lowestFPKM;
      const xRange = [
        lowestFPKM - rangeFPKM * paddingPercent,
        highestFPKM + rangeFPKM * paddingPercent,
      ];
      const rangeSynScore = highestSynScore - lowestSynScore;
      const yRange = [
        lowestSynScore - rangeSynScore * paddingPercent,
        highestSynScore + rangeSynScore * paddingPercent,
      ];


      const synScoreArray = Object.values(synergyObj).map(item => item.zip);
      synScoreArray.sort((a, b) => a - b);
      const defaultThreshold = calculateThreshold(synScoreArray);


      this.setState({
        loading: false, biomarkerData: synergyObj, xRange, yRange, defaultThreshold, synScoreArray,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      loading, biomarkerData, selectedBiomarker, xRange,
      yRange, defaultThreshold, customThreshold, confirmedThreshold,
      synScoreArray,
    } = this.state;
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;
    // const columns = [{
    //   Header: 'Gene Symbol',
    //   accessor: 'gene', // String-based value accessors!
    // }, {
    //   Header: 'One-way ANOVA P',
    //   accessor: 'p',
    // }, {
    //   Header: 'Source',
    //   accessor: 'name',
    // }];


    // let marks;
    // console.log(loading);
    // if (!loading) {
    //   marks = Object.values(biomarkerData).map(item => ({ value: item.zip, label: item.zip }));
    //   console.log(Math.round(yRange[0] * 100) / 100);
    // }

    return (
      <main>
        <QueryCard
          drugId1={drugId1}
          drugId2={drugId2}
          dataset={dataset}
          sample={sample}
        />
        <StyledBiomarkers>
          {/* <ReactTable
              data={results}
              columns={columns}
              className="-highlight"
              showPagination={false}
              defaultPageSize={10}
              loading={loading}
              sortable={false}
              getTdProps={(state, rowInfo) => ({
                onClick: (e, handleOriginal) => {
                  handleSelect(rowInfo.index);
                  // IMPORTANT! React-Table uses onClick internally to trigger
                  // events like expanding SubComponents and pivots.
                  // By default a custom 'onClick' handler will override this functionality.
                  // If you want to fire the original onClick handler, call the
                  // 'handleOriginal' function.
                  if (handleOriginal) {
                    handleOriginal();
                  }
                },
                style: {
                background: rowInfo.index === selectedBiomarker ? colors.summary_bg : 'transparent',
                },
              })
              }
            /> */}
          { !loading ? (
            <StyledExpressionProfile>
              <div className="expression-profile">
                <ExpressionProfile
                  biomarkerData={biomarkerData}
                  selectedBiomarker={selectedBiomarker}
                  dimensions={dimensions}
                  xRange={xRange}
                  yRange={yRange}
                  threshold={customThreshold !== null ? customThreshold : defaultThreshold}
                />
                <div className="slider">
                  <Slider
                    orientation="vertical"
                    defaultValue={customThreshold || defaultThreshold}
                    min={Math.round(yRange[0] * 100) / 100}
                    max={Math.round(yRange[1] * 100) / 100}
                    aria-labelledby="vertical-discrete-slider-restrict"
                    step={Math.round(((yRange[1] - yRange[0]) / 100) * 100) / 100}
                    valueLabelDisplay="auto"
                    onChange={(e, value) => this.setState({ customThreshold: value })}
                    onChangeCommitted={(e, value) => this.setState({ confirmedThreshold: value })}
                  />
                </div>
              </div>
              <BiomarkerBoxPlot
                threshold={confirmedThreshold !== null ? confirmedThreshold : defaultThreshold}
                data={synScoreArray}
                dimensions={dimensions}
              />
            </StyledExpressionProfile>
          ) : null}
        </StyledBiomarkers>
      </main>
    );
  }
}
export default Biomarkers;
