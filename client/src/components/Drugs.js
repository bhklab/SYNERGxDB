/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import BarChart from './Plots/BarChart';
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

const formatData = (drugData, datasetData) => {
  // return result;
  const names = []; const
    nums = [];
  datasetData.forEach((x) => {
    names.push(x.name);
    nums.push(0);
  });

  drugData.forEach((x) => {
    const datasets = x.dataset_names.split(',');
    datasets.forEach((dset) => {
      const ind = names.findIndex(item => item === dset);
      nums[ind] += 1;
    });
  });
  return [names, nums];
};

const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;
  switch (typeof row[id]) {
    case 'object':
      // checks for metastasis label
      if (row[id] && row[id].origin) {
        return String('metastasis').includes(filter.value.toLowerCase());
      }
      // checks for disease name (additional check is to filter out null values)
      return row[id] && row[id].name
        ? String(row[id].name.toLowerCase()).includes(filter.value.toLowerCase())
        : false;
    // handles age filtering
    case 'number':
      return row[id].toString().includes(filter.value);
    case 'string':
      return String(row[id].toLowerCase()).includes(filter.value.toLowerCase());
    default:
      return false;
  }
};

class Drugs extends Component {
  constructor() {
    super();
    this.state = {
      drugsData: [],
      loading: true,
      datasetData: [],
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
        fetch('/api/datasets')
          .then(response => response.json())
          .then((datasetData) => {
            this.setState({
              drugsData, loading: false, datasetData,
            });
          });
      });
  }

  render() {
    const { drugsData, loading, datasetData } = this.state;
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
    // const filterCaseInsensitive = (filter, row) => {
    //   const id = filter.pivotId || filter.id;
    //   return (
    //     row[id] !== undefined
    //       ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
    //       : true
    //   );
    // };
    return (
      <Fragment>
        {/* <style>{'#root { background: #e7f3f8  !important; }'}</style> */}
        <main className="summary">
          <StyledWrapper className="wrapper">
            <h1>Number of Drugs per Dataset</h1>
            {datasetData.length === 0 ? null : (
              <BarChart
                plotId="drugPlot"
                formatData={formatData}
                drugsData={drugsData}
                datasetData={datasetData}
              />
            )}
          </StyledWrapper>
          <StyledWrapper className="wrapper">
            <h1>List of Compounds</h1>
            <ReactTable
              data={drugsData}
              columns={columns}
              sortable={false}
              defaultPageSize={25}
              filterable
              defaultFilterMethod={filterCaseInsensitive}
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
