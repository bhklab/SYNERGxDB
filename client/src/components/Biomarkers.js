/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import ReactLoading from 'react-loading';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import ExpressionProfile from './Plots/ExpressionProfile';
import QueryCard from './UtilComponents/QueryCard';
import BiomarkerBoxPlot from './Plots/BiomarkerBoxPlot';
import LoadingComponent from './UtilComponents/Loading';

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

const CustomSlider = withStyles({
  root: {
    color: colors.color_main_2,
    height: 8,
  },
})(Slider);

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
    min-width: 300px;
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
      biomarkerData: null,
      selectedBiomarker: null,
      loadingTable: true,
      loadingGraph: true,
      xRange: null,
      yRange: null,
      defaultThreshold: null,
      customThreshold: null,
      confirmedThreshold: null,
      selectedScore: 'zip',
      lisfOfBiomarkers: [],
    };
    // this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { selectedScore } = this.state;
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      drugId1, drugId2, dataset,
    } = requestParams;
    let url = `/api/biomarkers/synergy?type=${selectedScore}`;
    if (drugId1) url = url.concat(`&drugId1=${drugId1}`);
    if (drugId2) url = url.concat(`&drugId2=${drugId2}`);
    if (dataset) url = url.concat(`&dataset=${dataset}`);

    fetch(url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          lisfOfBiomarkers: data,
          selectedBiomarker: data[0].gene,
          loadingTable: false,
        });
        this.getPlotData(data[0].gene);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingTable: false });
      });
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
          console.log(data);
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
          console.log(cellLineExpressionData);
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
      let xRange;
      if (rangeFPKM) {
        xRange = [
          lowestFPKM - rangeFPKM * paddingPercent,
          highestFPKM + rangeFPKM * paddingPercent,
        ];
      } else {
        xRange = [-1, 1];
      }
      const rangeSynScore = highestSynScore - lowestSynScore;
      const yRange = [
        lowestSynScore - rangeSynScore * paddingPercent,
        highestSynScore + rangeSynScore * paddingPercent,
      ];


      const synScoreArray = Object.values(synergyObj).map(item => item.zip);
      synScoreArray.sort((a, b) => a - b);
      const defaultThreshold = calculateThreshold(synScoreArray);


      this.setState({
        loadingGraph: false,
        biomarkerData: synergyObj,
        xRange,
        yRange,
        defaultThreshold,
        synScoreArray,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      this.setState({ loadingGraph: false });
    }
  }

  render() {
    const {
      loadingTable, biomarkerData, selectedBiomarker, xRange,
      yRange, defaultThreshold, customThreshold, confirmedThreshold,
      synScoreArray, selectedScore, lisfOfBiomarkers, loadingGraph,
    } = this.state;
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;

    const columns = [{
      Header: 'Gene Symbol',
      accessor: 'gene',
    }, {
      Header: 'Compound A',
      accessor: 'drugA',
    }, {
      Header: 'Compound B',
      accessor: 'drugB',
    }, {
      Header: `C-index (${selectedScore})`,
      accessor: 'concordanceIndex',
      filterable: false,
    }, {
      Header: `P-value (${selectedScore})`,
      accessor: 'pValue',
      filterable: false,
    }];


    // let marks;
    // console.log(loadingTable);
    // if (!loadingTable) {
    //   marks = Object.values(biomarkerData).map(item => ({ value: item.zip, label: item.zip }));
    //   console.log(Math.round(yRange[0] * 100) / 100);
    // }
    console.log(loadingGraph);
    return (
      <main>
        <QueryCard
          drugId1={drugId1}
          drugId2={drugId2}
          dataset={dataset}
          sample={sample}
        />
        <StyledBiomarkers>
          <ReactTable
            loading={loadingTable}
            LoadingComponent={LoadingComponent}
            data={lisfOfBiomarkers}
            columns={columns}
            className="-highlight"
            defaultPageSize={10}
            filterable
          />
          { !loadingGraph ? (
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
                  <CustomSlider
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
          ) : (
            <div className="loading-container">
              <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
            </div>
          )}
        </StyledBiomarkers>
      </main>
    );
  }
}
export default Biomarkers;
