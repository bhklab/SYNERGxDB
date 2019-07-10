import React, { Component } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import colors from '../styles/colors';


export default class ComboDetails extends Component {
  constructor() {
    super();
    this.state = {
      cellData: {},
      drugsData: [],
      sourceData: {},
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      idSource, idDrugA, idDrugB, idSample,
    } = requestParams;
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
  }

  render() {
    const { cellData, drugsData, sourceData } = this.state;
    return (
      <header>
        <h1>Drug combination synergy</h1>
        <h2>Combo Summary</h2>
        <div>
          <p>
            Sample:
            {' '}
            <b>
              {cellData.name}
            </b>
            ,
            {' '}
            {cellData.disease}
            {' '}
            <a className="hover" href={`https://web.expasy.org/cellosaurus/${cellData.idCellosaurus}`} rel="noopener noreferrer" target="_blank">(Cellosaurus)</a>
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
                <a className="hover" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${drugsData[0].idPubChem}`} rel="noopener noreferrer" target="_blank">(PubChem)</a>
                {' '}
                <a className="hover" href={`https://www.drugbank.ca/drugs/${drugsData[0].idDrugBank}`} rel="noopener noreferrer" target="_blank">(DrugBank)</a>
              </span>
            ) : null}
          </p>
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
              <a className="hover" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${drugsData[1].idPubChem}`} rel="noopener noreferrer" target="_blank">(PubChem)</a>
              {' '}
              <a className="hover" href={`https://www.drugbank.ca/drugs/${drugsData[1].idDrugBank}`} rel="noopener noreferrer" target="_blank">(DrugBank)</a>
            </span>
          ) : null}
          <p>
            Source:
            {' '}
            <b>
              {sourceData.name}
            </b>
            ,
            {' '}
            <a className="hover" href={`https://www.ncbi.nlm.nih.gov/pubmed/${sourceData.pmID}`} rel="noopener noreferrer" target="_blank">(PubMed)</a>
          </p>
        </div>
      </header>
    );
  }
}
