/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import RadialBarChart from './Plots/BarChart';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import LoadingComponent from './Loading';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  background:white;
  padding:0px 30px;
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
      Cell: props => <div style={{ textAlign: 'right' }}><a className="hover" target="_blank" rel="noopener noreferrer" href={`https://pubchem.ncbi.nlm.nih.gov/compound/${props.value}`}>{props.value}</a></div>,
    }, {
      Header: 'DrugBank ID',
      accessor: 'idDrugBank',
      Cell: props => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://www.drugbank.ca/drugs/${props.value}`}>{props.value}</a>,
    }];
    return (
      <Fragment>
        {/* <style>{'#root { background: #e7f3f8  !important; }'}</style> */}
        <main className="summary">
          <StyledWrapper className="wrapper">
            <h1>Number of Drugs per Dataset</h1>
            <RadialBarChart
              plotId="drugPlot"
            />
          </StyledWrapper>
          <StyledWrapper className="wrapper">
            <h1>List of Compounds</h1>
            <ReactTable
              data={drugsData}
              columns={columns}
              sortable={false}
              defaultPageSize={25}
              filterable
              className="-highlight"
              loading={loading}
              LoadingComponent={LoadingComponent}
            />
          </StyledWrapper>
        </main>
        <footer>
          <div className="footer-wrapper">
            <p>Copyright © 2019. All rights reserved</p>
          </div>
        </footer>
      </Fragment>
    );
  }
}


export default Drugs;
