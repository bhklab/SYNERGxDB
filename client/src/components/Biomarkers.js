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
import transitions from '../styles/transitions';

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

const ButtonContainer = styled.div`
  display: flex;

  button {
    font-size: 1.5em;
    background: ${colors.nav_links};
    border: 1px solid ${colors.nav_links};
    padding: 10px 20px;
    margin: 10px 0;
    color: #ffffff;
    transition: ${transitions.main_trans};
    outline-style: none;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    flex-grow: 1;
  
    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${colors.button_hover};
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transform-origin: 0 50%;
      transform-origin: 0 50%;
      -webkit-transition-property: transform;
      transition-property: transform;
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
    }
  
    &:hover,
    &:focus,
    &.active-score {
      color: white;
      
      border: 1px solid ${colors.nav_links};
      cursor:pointer;

      &:before {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }
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
      sample: null,
      drugId1: null,
      drugId2: null,
      dataset: null,
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
      zipBiomarkers: null,
      blissBiomarkers: null,
      hsaBiomarkers: null,
      loeweBiomarkers: null,
      biomarkerGeneStorage: {},
    };
    this.handleSelectScore = this.handleSelectScore.bind(this);
    this.getBiomarkerTableData = this.getBiomarkerTableData.bind(this);
    this.getPlotData = this.getPlotData.bind(this);
    this.retrieveGeneData = this.retrieveGeneData.bind(this);
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
    const { getBiomarkerTableData } = this;
    const { selectedScore } = this.state;
    getBiomarkerTableData(selectedScore);
  }

  // retrieves list of SIGNIFICANT biomarkers over API and updates biomarker gene
  getBiomarkerTableData(score) {
    const {
      drugId1, drugId2, dataset,
    } = this.state;
    let url = `/api/biomarkers/synergy?type=${score}`;
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
        switch (score) {
          case 'zip':
            this.setState({ zipBiomarkers: data });
            break;
          case 'bliss':
            this.setState({ blissBiomarkers: data });
            break;
          case 'hsa':
            this.setState({ hsaBiomarkers: data });
            break;
          case 'loewe':
            this.setState({ loeweBiomarkers: data });
            break;
          default:
            break;
        }
        this.setState({
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

  // Updates state with data that is needed to render expression profile plot,
  // box plot and slider for a given gene
  async getPlotData(gene) {
    try {
      const { retrieveGeneData } = this;
      const synergyObj = await retrieveGeneData(gene);
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

  // eturn data that is needed for expression profile and box plot
  async retrieveGeneData(gene) {
    const {
      sample, drugId1, drugId2, dataset, biomarkerGeneStorage,
    } = this.state;
    // Checks if biomarker gene data has already been retrieved over API
    if (biomarkerGeneStorage[gene]) {
      return biomarkerGeneStorage[gene];
    }
    try {
      // Retrieves data from the API and stores it in the state
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
      this.setState({ biomarkerGeneStorage: { ...biomarkerGeneStorage, [gene]: synergyObj } });
      return synergyObj;
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  handleSelectScore(score) {
    const { getBiomarkerTableData, getPlotData } = this;
    const {
      zipBiomarkers, blissBiomarkers, loeweBiomarkers, hsaBiomarkers,
    } = this.state;
    this.setState({ selectedScore: score });
    if (score === 'zip' && zipBiomarkers) {
      this.setState({ selectedBiomarker: zipBiomarkers[0].gene });
      getPlotData(zipBiomarkers[0].gene);
      return;
    }
    if (score === 'bliss' && blissBiomarkers) {
      this.setState({ selectedBiomarker: blissBiomarkers[0].gene });
      getPlotData(blissBiomarkers[0].gene);
      return;
    }
    if (score === 'loewe' && loeweBiomarkers) {
      this.setState({ selectedBiomarker: loeweBiomarkers[0].gene });
      getPlotData(loeweBiomarkers[0].gene);
      return;
    }
    if (score === 'hsa' && hsaBiomarkers) {
      this.setState({ selectedBiomarker: hsaBiomarkers[0].gene });
      getPlotData(hsaBiomarkers[0].gene);
      return;
    }
    this.setState({ loadingTable: true });
    getBiomarkerTableData(score);
  }

  render() {
    const { handleSelectScore } = this;
    const {
      loadingTable, biomarkerData, selectedBiomarker, xRange,
      yRange, defaultThreshold, customThreshold, confirmedThreshold,
      synScoreArray, selectedScore, zipBiomarkers, blissBiomarkers,
      hsaBiomarkers, loeweBiomarkers, loadingGraph,
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
      Header: 'Dataset',
      accessor: 'dataset',
    }, {
      Header: `P-value (${selectedScore})`,
      accessor: 'pValue',
      filterable: false,
    }, {
      Header: `C-index (${selectedScore})`,
      accessor: 'concordanceIndex',
      filterable: false,
    }];

    let tableData = [];
    switch (selectedScore) {
      case 'zip':
        tableData = zipBiomarkers;
        break;
      case 'bliss':
        tableData = blissBiomarkers;
        break;
      case 'loewe':
        tableData = loeweBiomarkers;
        break;
      case 'hsa':
        tableData = hsaBiomarkers;
        break;
      default:
        break;
    }

    return (
      <main>
        <QueryCard
          drugId1={drugId1}
          drugId2={drugId2}
          dataset={dataset}
          sample={sample}
        />
        <StyledBiomarkers>
          <ButtonContainer>
            <button
              type="button"
              onClick={() => handleSelectScore('zip')}
              className={selectedScore === 'zip' ? 'active-score' : null}
            >
                ZIP
            </button>
            <button
              type="button"
              onClick={() => handleSelectScore('bliss')}
              className={selectedScore === 'bliss' ? 'active-score' : null}
            >
                Bliss
            </button>
            <button
              type="button"
              onClick={() => handleSelectScore('loewe')}
              className={selectedScore === 'loewe' ? 'active-score' : null}
            >
                Loewe
            </button>
            <button
              type="button"
              onClick={() => handleSelectScore('hsa')}
              className={selectedScore === 'hsa' ? 'active-score' : null}
            >
                HSA
            </button>
          </ButtonContainer>
          <ReactTable
            loading={loadingTable}
            LoadingComponent={LoadingComponent}
            data={tableData || []}
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
