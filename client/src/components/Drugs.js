/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import colors from '../styles/colors';
// import transitions from '../styles/transitions';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const StyledTable = styled.div`
    
  grid-template-columns: minmax(25%, 400px) auto auto auto;
  border-bottom: solid 2px black;
  margin: 10px 0;

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
      loading: true,
    };
  }

  componentDidMount() {
    fetch('/api/drugs/')
      .then(response => response.json())
      .then((drugsData) => {
        // Sorts by presence of ATC code, then by presence of DrugBank id,
        // then by presence of PubChem id and lastly it sorts drug names alphabetically
        drugsData.sort((a, b) => {
          if (a.atcCode && !b.atcCode) {
            return -1;
          } if (!a.atcCode && b.atcCode) {
            return 1;
          }
          if (a.idDrugBank && !b.idDrugBank) {
            return -1;
          } if (!a.idDrugBank && b.idDrugBank) {
            return 1;
          }
          if (a.idPubChem && !b.idPubChem) {
            return -1;
          } if (!a.idPubChem && b.idPubChem) {
            return 1;
          }
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        drugsData.forEach((drug) => {
          if (drug.atcCode) {
            const atc = drug.atcCode.split(';');
            drug.atcCode = atc.length > 1 ? atc[0].concat(', ...') : atc[0];
          }
        });
        this.setState({ drugsData, loading: false });
      });
  }

  render() {
    const { drugsData, loading } = this.state;
    // splits data into chunks, css grid collapses data if more than ~990 rows
    // const drugChunks = [];
    // for (let i = 0; i < drugsData.length; i += 901) {
    //   drugChunks.push(drugsData.slice(i, i + 901));
    // }
    // const listOfDrugs = drugChunks.length > 0 ? drugChunks[0].map((drug, index) => (
    //   <Fragment key={index}>
    //     <span>{drug.name}</span>
    //     <span>{drug.atcCode}</span>
    //     <span><a className="hover" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${drug.idPubChem}`}>{drug.idPubChem}</a></span>
    //     <span><a className="hover" href={`https://www.drugbank.ca/drugs/${drug.idDrugBank}`}>{drug.idDrugBank}</a></span>
    //   </Fragment>
    // )) : null;
    // drugChunks.shift();
    // const restDrugs = drugChunks.map((chunk, index) => {
    //   const chunkData = chunk.map((drug, i) => (
    //     <Fragment key={i}>
    //       <span>{drug.name}</span>
    //       <span>{drug.atcCode}</span>
    //       <span><a className="hover" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${drug.idPubChem}`}>{drug.idPubChem}</a></span>
    //       <span><a className="hover" href={`https://www.drugbank.ca/drugs/${drug.idDrugBank}`}>{drug.idDrugBank}</a></span>
    //     </Fragment>
    //   ));
    //   return (
    //     <StyledTable key={index} className="grid-container">
    //       {chunkData}
    //     </StyledTable>
    //   );
    // });
    const columns = [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
      minWidth: 400,
    }, {
      Header: 'ATC Code',
      accessor: 'atcCode',
    }, {
      Header: 'PubChem CID',
      accessor: 'idPubChem',
      Cell: props => <a className="hover" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${props.value}`}>{props.value}</a>,
    }, {
      Header: 'DrugBank ID',
      accessor: 'idDrugBank',
      Cell: props => <a className="hover" href={`https://www.drugbank.ca/drugs/${props.value}`}>{props.value}</a>,
    }];
    return (
      <Fragment>
        <header>
          <h1>List of Drugs</h1>
        </header>
        <main>
          <StyledWrapper className="wrapper">
            <ReactTable
              data={drugsData}
              columns={columns}
              sortable={false}
              defaultPageSize={25}
              filterable
              className="-striped -highlight"
              loading={loading}
            />
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
