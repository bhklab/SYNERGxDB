/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import ReactLoading from 'react-loading';
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

  constructor(props) {
    super(props);
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;
    this.state = {
      sample,
      drugId1,
      drugId2,
      dataset,
      biomarkerData: null,
      selectedBiomarker: null,
      loadingTable: true,
      loadingGraph: true,
      xRange: null,
      yRange: null,
      defaultThreshold: null,
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
    this.handleSelectBiomarker = this.handleSelectBiomarker.bind(this);
    this.updateThreshold = this.updateThreshold.bind(this);
  }

  componentDidMount() {
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
            this.setState({
              zipBiomarkers: data,
              loadingTable: false,
            });
            break;
          case 'bliss':
            this.setState({
              blissBiomarkers: data,
              loadingTable: false,
            });
            break;
          case 'hsa':
            this.setState({
              hsaBiomarkers: data,
              loadingTable: false,
            });
            break;
          case 'loewe':
            this.setState({
              loeweBiomarkers: data,
              loadingTable: false,
            });
            break;
          default:
            break;
        }
        this.getPlotData(data[0].gene, score);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loadingTable: false });
      });
  }

  // Updates state with data that is needed to render expression profile plot,
  // box plot and slider for a given gene
  async getPlotData(gene, score) {
    // const { selectedScore } = this.state;
    try {
      const { retrieveGeneData } = this;
      const synergyObj = await retrieveGeneData(gene);
      console.log(synergyObj);
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
        if (item[score] < lowestSynScore) lowestSynScore = item[score];
        if (item[score] > highestSynScore) highestSynScore = item[score];
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
      const synScoreArray = Object.values(synergyObj).map(item => item[score]);
      synScoreArray.sort((a, b) => a - b);
      const defaultThreshold = calculateThreshold(synScoreArray);
      this.setState({
        selectedBiomarker: gene,
        selectedScore: score,
        loadingGraph: false,
        biomarkerData: synergyObj,
        xRange,
        yRange,
        defaultThreshold,
        synScoreArray,
        confirmedThreshold: null,
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
      sample, drugId1, drugId2, dataset, biomarkerGeneStorage, selectedScore,
    } = this.state;
    // Checks if biomarker gene data has already been retrieved over API
    if (biomarkerGeneStorage[selectedScore] && biomarkerGeneStorage[selectedScore][gene]) {
      return biomarkerGeneStorage[selectedScore][gene];
    }
    try {
      // Retrieves data from the API and stores it in the state
      this.setState({ loadingGraph: true });
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
                hsa: score.hsa,
                loewe: score.loewe,
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
      this.setState({
        biomarkerGeneStorage: {
          ...biomarkerGeneStorage,
          [selectedScore]: { ...biomarkerGeneStorage[selectedScore], [gene]: synergyObj },
        },
      });
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
    if (score === 'zip' && zipBiomarkers) {
      // this.setState({ selectedBiomarker: zipBiomarkers[0].gene, selectedScore: score });
      getPlotData(zipBiomarkers[0].gene, score);
      return;
    }
    if (score === 'bliss' && blissBiomarkers) {
      // this.setState({ selectedBiomarker: blissBiomarkers[0].gene, selectedScore: score });
      getPlotData(blissBiomarkers[0].gene, score);
      return;
    }
    if (score === 'loewe' && loeweBiomarkers) {
      // this.setState({ selectedBiomarker: loeweBiomarkers[0].gene, selectedScore: score });
      getPlotData(loeweBiomarkers[0].gene, score);
      return;
    }
    if (score === 'hsa' && hsaBiomarkers) {
      // this.setState({ selectedBiomarker: hsaBiomarkers[0].gene, selectedScore: score });
      getPlotData(hsaBiomarkers[0].gene, score);
      return;
    }
    this.setState({ loadingTable: true, loadingGraph: true, selectedScore: score });
    getBiomarkerTableData(score);
  }

  handleSelectBiomarker(gene) {
    const { getPlotData } = this;
    const { selectedScore } = this.state;
    getPlotData(gene, selectedScore);
  }

  updateThreshold(e, value) {
    this.setState({ confirmedThreshold: value });
  }

  render() {
    const { handleSelectScore, handleSelectBiomarker, updateThreshold } = this;
    const {
      loadingTable, biomarkerData, selectedBiomarker, xRange,
      yRange, defaultThreshold, confirmedThreshold,
      synScoreArray, selectedScore, zipBiomarkers, blissBiomarkers,
      hsaBiomarkers, loeweBiomarkers, loadingGraph, sample, drugId1,
      drugId2, dataset, biomarkerGeneStorage,
    } = this.state;
    console.log('threshold ', defaultThreshold);

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
            defaultFilterMethod={(filter, row) => String(row[filter.id]
              .toLowerCase()).startsWith(filter.value.toLowerCase())}
            getTdProps={(state, rowInfo) => ({
              onClick: (e, handleOriginal) => {
                handleSelectBiomarker(rowInfo.original.gene);
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
                background: rowInfo && rowInfo.original.gene === selectedBiomarker ? colors.button_hover : 'transparent',
              },
            })
          }
          />
          { !loadingGraph ? (
            <StyledExpressionProfile>
              <ExpressionProfile
                biomarkerData={biomarkerData}
                selectedBiomarker={selectedBiomarker}
                dimensions={dimensions}
                xRange={xRange}
                yRange={yRange}
                defaultThreshold={defaultThreshold}
                updateThreshold={updateThreshold}
                selectedScore={selectedScore}
              />
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
