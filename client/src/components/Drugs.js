/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
// import transitions from '../styles/transitions';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledTable = styled.div`
    
  grid-template-columns: minmax(25%, 400px) minmax(25%, 400px) auto auto;

  span {
    &:nth-child(8n-3),
    &:nth-child(8n-2),
    &:nth-child(8n-1),
    &:nth-child(8n) {
      background-color: ${colors.trans_color_main_5};
    }
  }
`;

class Drugs extends Component {
  constructor() {
    super();
    this.state = {
      drugsData: [],
    };
  }

  componentDidMount() {
    fetch('/api/drugs/')
      .then(response => response.json())
      .then((drugsData) => {
        drugsData.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        this.setState({ drugsData });
      });
  }

  render() {
    const { drugsData } = this.state;
    // splits data into chunks, css grid collapses data if more than ~990 rows
    const drugChunks = [];
    for (let i = 0; i < drugsData.length; i += 9051) {
      drugChunks.push(drugsData.slice(i, i + 901));
    }
    const listOfDrugs = drugChunks.length > 0 ? drugChunks[0].map((drug, index) => (
      <Fragment key={index}>
        <span>{drug.name}</span>
        <span>{drug.atcCode}</span>
        <span>{drug.idPubChem}</span>
        <span>{drug.idDrugBank}</span>
      </Fragment>
    )) : null;
    drugChunks.shift();
    const restDrugs = drugChunks.map((chunk, index) => {
      const chunkData = chunk.map((drug, i) => (
        <Fragment key={i}>
          <span>{drug.name}</span>
          <span>{drug.atcCode}</span>
          <span>{drug.idPubChem}</span>
          <span>{drug.idDrugBank}</span>
        </Fragment>
      ));
      return (
        <StyledTable key={index} className="grid-container">
          {chunkData}
        </StyledTable>
      );
    });
    return (
      <Fragment>
        <header />
        <main>
          <StyledWrapper className="wrapper">
            <StyledTable className="grid-container">
              <span className="table-header">Name</span>
              <span className="table-header">ATC Code</span>
              <span className="table-header">PubChem CID</span>
              <span className="table-header">DrugBank ID</span>
              {listOfDrugs}
            </StyledTable>
            {restDrugs}
          </StyledWrapper>
        </main>
        <footer>
          <div className="wrapper">
            <p>Copyright © 2019. All rights reserved</p>
          </div>
        </footer>
      </Fragment>
    );
  }
}


export default Drugs;
