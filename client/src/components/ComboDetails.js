/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import styled from 'styled-components';
// import Loading from 'react-loading-components';

import colors from '../styles/colors';
import cellosaurus from '../images/logos/cellosaurus.jpg';
import drugbank from '../images/logos/drugbank.svg';
import pubchem from '../images/logos/pubchem.gif';
import pubmed from '../images/logos/pubmed.png';


import CumulativeDensity from './Plots/CumulativeDensity';
import SynergyMatrices from './SynergyMatrices';
import { ComboContext } from './Context/ComboContext';
import SynergisticInhibition from './SynergisticInhibition';
import SingleAgents from './SingleAgents';


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
  max-height: 1rem;
  width: auto;
  display: inline-block;
`;

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
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      idSource, idDrugA, idDrugB, idSample, comboId,
    } = requestParams;

    this.setState({
      comboId: parseInt(comboId, 10),
      idSource: parseInt(idSource, 10),
    });

    fetch(`/api/cell_lines/info?idSample=${idSample}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((cellData) => {
        this.setState({ cellData });
      });
    fetch(`/api/drugs/info?idDrugA=${idDrugA}&idDrugB=${idDrugB}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((drugsData) => {
        this.setState({ drugsData });
      });
    fetch(`/api/datasets?idSource=${idSource}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((sourceData) => {
        this.setState({ sourceData });
      });
    fetch(`/api/combos/matrix?comboId=${comboId}&idSource=${idSource}`)
      .then(response => response.json())
      .then((synergyData) => {
        this.setState({ synergyData, loadingSynergyData: false });
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
      cellData, drugsData, sourceData, loadingSummary, loadingSynergyData,
    } = this.state;

    return (
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
                    <a className="hover" href={`https://web.expasy.org/cellosaurus/${cellData.idCellosaurus}`} rel="noopener noreferrer" target="_blank"><Logo src={cellosaurus} alt="Cellosaurus" /></a>
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
                        <a className="hover" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${drugsData[0].idPubChem}`} rel="noopener noreferrer" target="_blank"><Logo src={pubchem} alt="Pubchem" /></a>
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
                        <a className="hover" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${drugsData[1].idPubChem}`} rel="noopener noreferrer" target="_blank"><Logo src={pubchem} alt="Pubchem" /></a>
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
                    <a className="hover" href={`https://www.ncbi.nlm.nih.gov/pubmed/${sourceData.pmID}`} rel="noopener noreferrer" target="_blank"><Logo src={pubmed} alt="Pubmed" /></a>
                  </p>
                </StyledSummary>
              </Fragment>
            )
            }
        </StyledHeader>
        <main>
          {loadingSummary || loadingSynergyData
            ? null
            : (
              <ComboContext.Provider value={this.state}>
                <CumulativeDensity />
                <SynergyMatrices />
                <SynergisticInhibition />
                <SingleAgents />
              </ComboContext.Provider>
            )}
        </main>
      </SynergyDetail>
    );
  }
}
