/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import styled from 'styled-components';

import colors from '../../styles/colors';
import cellosaurus from '../../images/logos/cellosaurus.jpg';
import drugbank from '../../images/logos/drugbank.png';
import pubchem from '../../images/logos/pubchem.gif';
import pubmed from '../../images/logos/pubmed.jpeg';

import SynergyMatrices from './SynergyMatrices';
import { ComboContext } from './Context/ComboContext';
import SynergisticInhibition from './SynergisticInhibition';
import SynScoreComboPlot from './Plots/SynScoreComboPlot';


const StyledSummary = styled.div`
  color:${colors.nav_links};
  p {
    font-weight: 400;
    font-size: 1.2rem;
  }
`;
const StyledHeader = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column; 
`;

const SynergyDetail = styled.div`
  align-self: flex-start;
  margin: 10px;
  background:white;
  padding:0px 30px;
  width: 100%;
`;

const Logo = styled.img`
  max-height: 1.5rem;
  width: auto;
  display: inline-block;
  vertical-align:middle;
}
`;

// Required due to heterogenous nature of the data
// There is a need to check if data shows viability or inhibitions
const standarizeRawData = (array) => {
  if (array[0].raw_matrix === 0) {
    // it's viability data
    return array.map(item => ({ ...item, raw_matrix: (100 - item.raw_matrix) / 100 }));
  }
  // it's inhibition data, no changes needed
  return array;
};

// Different datasets use different units for concentrations
const getDatasetUnits = (sourceString) => {
  switch (sourceString) {
    case '2':
    // NCI-ALMANAC
      return 'M';
    // DECREASE
    case '9':
      return 'nM';
    default:
      return 'µM';
  }
};
export default class ComboDetails extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
  }

  constructor() {
    super();
    this.state = {
      cellData: null,
      drugsData: null,
      sourceData: null,
      comboId: null,
      idSource: null,
      loadingSummary: true,
      synergyData: null,
      loadingSynergyData: true,
      isDataAvailable: false,
      csvData: [],
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      idSource, idDrugA, idDrugB, idSample, comboId,
    } = requestParams;

    let cellData; let drugsData; let
      sourceData;

    const datasetUnits = getDatasetUnits(idSource);

    await fetch(`/api/cell_lines/info?idSample=${idSample}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        cellData = data;
      });
    await fetch(`/api/drugs/info?idDrugA=${idDrugA}&idDrugB=${idDrugB}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        drugsData = data;
      });
    await fetch(`/api/datasets?idSource=${idSource}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        sourceData = data;
      });

    this.setState({
      comboId: parseInt(comboId, 10),
      idSource: parseInt(idSource, 10),
      idSample: parseInt(idSample, 10),
      cellData,
      drugsData,
      sourceData,
      datasetUnits,
    });

    fetch(`/api/combos/matrix?comboId=${comboId}&idSource=${idSource}`)
      .then(response => response.json())
      .then((data) => {
        const csvData = data.map(row => ({
          compoundA: drugsData[0].name,
          compoundB: drugsData[1].name,
          ...row,
          combo_score: row.combo_score !== null ? row.combo_score : 'N/A',
          idSample: cellData.idSample,
          sampleName: cellData.name,
          sourceName: sourceData.name,
        }));
        const csvHeaders = [
          { displayName: 'Compound A', id: 'compoundA' },
          { displayName: 'Compound B', id: 'compoundB' },
          { displayName: 'Concentration (Compound A)', id: 'concA' },
          { displayName: 'Concentration (Compound B)', id: 'concB' },
          { displayName: 'idSample', id: 'idSample' },
          { displayName: 'Cell Line', id: 'sampleName' },
          { displayName: 'Source', id: 'sourceName' },
          { displayName: 'Raw Matrix', id: 'raw_matrix' },
          { displayName: 'ZIP Matrix', id: 'zip_matrix' },
          { displayName: 'Bliss Matrix', id: 'bliss_matrix' },
          { displayName: 'Loewe Matrix', id: 'loewe_matrix' },
          { displayName: 'HSA Matrix', id: 'hsa_matrix' },
        ];
        // ComboScore available only for NCI-Almanac
        if (idSource === '2') csvHeaders.push({ displayName: 'Comboscore', id: 'combo_score' });
        const csvFileName = `combo_matrix_${comboId}_${idSource}`;

        const standarizedData = standarizeRawData(data);
        // Sorts data this step is required for some datasets
        // to standarize data for synergy table and heat map
        const setConcA = [...new Set(standarizedData
          .map(item => item.concA))]
          .sort((a, b) => a - b);
        const setConcB = [...new Set(standarizedData
          .map(item => item.concB))]
          .sort((a, b) => a - b);
        // setConcA.sort((a, b) => a - b);
        // setConcB.sort((a, b) => a - b);
        const sortedData = standarizedData.sort((a, b) => {
          if (a.concA > b.concA) {
            return 1;
          } if (a.concA === b.concA) {
            return a.concB > b.concB ? 1 : -1;
          }
          return -1;
        });
        let indexCounter = 0;
        const synergyData = [];
        setConcA.forEach((concA) => {
          setConcB.forEach((concB) => {
            if (sortedData[indexCounter]
              && sortedData[indexCounter].concA === concA
              && sortedData[indexCounter].concB === concB) {
              indexCounter += 1;
              synergyData.push(sortedData[indexCounter - 1]);
            } else {
              synergyData.push({
                concA,
                concB,
                raw_matrix: null,
                bliss_matrix: null,
                hsa_matrix: null,
                idSource: sortedData[indexCounter - 1].idSource,
                loewe_matrix: null,
                zip_matrix: null,
              });
            }
          });
        });
        this.setState({
          synergyData,
          loadingSynergyData: false,
          isDataAvailable: true,
          csvData,
          csvHeaders,
          csvFileName,
        });
      });
  }

  componentDidUpdate() {
    const {
      sourceData, drugsData, cellData, loadingSummary,
    } = this.state;
    if (sourceData && drugsData && cellData && loadingSummary) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loadingSummary: false });
    }
  }

  render() {
    const {
      cellData, drugsData, sourceData, loadingSummary, loadingSynergyData, isDataAvailable,
    } = this.state;

    return (


      <main className="summary">
        <SynergyDetail>
          <StyledHeader>
            {loadingSummary
              ? null
              : (
                <Fragment>
                  <h1>Drug combination synergy</h1>
                  <h2>Combo Summary</h2>
                  <StyledSummary>
                    <p>
                      Sample:
                      {' '}
                      <b>
                        {cellData.name ? cellData.name.toUpperCase() : null}
                      </b>
                      ,
                      {' '}
                      {cellData.disease}
                      {' '}
                      <a className="hover" href={`https://web.expasy.org/cellosaurus/${cellData.idCellosaurus}`} rel="noopener noreferrer" target="_blank">
                        {' '}
                        <Logo src={cellosaurus} alt="Cellosaurus" />
                      </a>
                    </p>
                    <p>
                      Drug A:
                      {' '}
                      {drugsData.length > 0 ? (
                        <span>
                          <b>
                            {drugsData[0].name}
                          </b>
                          ,
                          {' '}
                          {drugsData[0].description}
                          {' '}
                          <a className="hover" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${drugsData[0].idPubChem}`} rel="noopener noreferrer" target="_blank">
                            {' '}
                            <Logo src={pubchem} alt="Pubchem" />
                          </a>
                          {' '}
                          <a className="hover" href={`https://www.drugbank.ca/drugs/${drugsData[0].idDrugBank}`} rel="noopener noreferrer" target="_blank"><Logo src={drugbank} alt="Drug Bank" /></a>
                        </span>
                      ) : null}
                    </p>
                    <p>
                      Drug B:
                      {' '}
                      {drugsData.length > 0 ? (
                        <span>
                          <b>
                            {drugsData[1].name}
                          </b>
                          ,
                          {' '}
                          {drugsData[1].description}
                          {' '}
                          <a className="hover" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${drugsData[1].idPubChem}`} rel="noopener noreferrer" target="_blank">
                            {' '}
                            <Logo src={pubchem} alt="Pubchem" />
                          </a>
                          {' '}
                          <a className="hover" href={`https://www.drugbank.ca/drugs/${drugsData[1].idDrugBank}`} rel="noopener noreferrer" target="_blank"><Logo src={drugbank} alt="Drug Bank" /></a>
                        </span>
                      ) : null}
                    </p>
                    <p>
                      Source:
                      {' '}
                      <b>
                        {sourceData.name}
                      </b>
                      {' '}
                      <a className="hover" href={`https://www.ncbi.nlm.nih.gov/pubmed/${sourceData.pmID}`} rel="noopener noreferrer" target="_blank">
                        {' '}
                        <Logo src={pubmed} alt="Pubmed" />
                      </a>
                    </p>
                  </StyledSummary>
                </Fragment>
              )
            }
          </StyledHeader>
          {loadingSummary || loadingSynergyData
            ? null
            : (isDataAvailable ? (
              <ComboContext.Provider value={this.state}>
                {/* <CumulativeDensity /> */}
                <SynScoreComboPlot />
                <SynergyMatrices />
                <SynergisticInhibition dataAvailable={isDataAvailable} />
                {/* <SingleAgents /> */}
              </ComboContext.Provider>
            ) : (
              <ComboContext.Provider value={this.state}>
                <SynergyMatrices />
                <SynergisticInhibition dataAvailable={isDataAvailable} />
              </ComboContext.Provider>
            )
            )}
        </SynergyDetail>
      </main>

    );
  }
}
