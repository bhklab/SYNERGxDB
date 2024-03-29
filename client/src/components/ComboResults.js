

/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import styled from 'styled-components';
import ReactTable from 'react-table';

import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

import LoadingComponent from './UtilComponents/Loading';
import QueryCard from './UtilComponents/QueryCard';
import DownloadButton from './UtilComponents/DownloadButton';

const SynergyDiv = styled.div`
  width: 100%;
  background:white;
  padding:20px 30px;
  margin-bottom:30px;
  .rt-tr-group:hover {
    background-color: ${colors.summary_bg}
  }
`;

const ButtonsDiv = styled.div`

  width:100%;
  background:white;
  padding: 20px 30px;
  margin-bottom:30px;
  font-size:18px;

  .buttonsContainer {
    display: flex;
    justify-content:space-between;
  }
 
  .buttonsContainer a {
    height:70px;
    width:250px;
    background:${colors.blue_main};
    color: white;
    padding: 15px;
    font-weight:700;
    text-align:center;
  }
`;

const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;
  return (
    row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true
  );
};

class ComboResults extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  }

  constructor() {
    super();
    this.state = {
      results: [],
      csvData: [],
      drugId1: null,
      drugId2: null,
      loading: true,
      dataset: null,
      datasetName: 'Any',
      drugName1: 'Any',
      drugName2: 'Any',
      cellLineName: 'Any',
      queryParams: '',
      displayOptions: false,
    };
    this.handleCombo = this.handleCombo.bind(this);
    this.checkData = this.checkData.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;
    let queryParams = '?';

    this.checkData(drugId1, drugId2, dataset, sample);


    this.setState({
      drugId1: parseInt(drugId1, 10),
      drugId2: parseInt(drugId2, 10),
      dataset: parseInt(dataset, 10),
    });
    if (sample) queryParams = queryParams.concat(`&sample=${sample}`);
    if (dataset) queryParams = queryParams.concat(`&dataset=${dataset}`);
    if (drugId1) queryParams = queryParams.concat(`&drugId1=${drugId1}`);
    if (drugId2) queryParams = queryParams.concat(`&drugId2=${drugId2}`);

    this.setState({ queryParams });

    fetch('/api/combos?allowAll=true&'.concat(queryParams), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        // inserts quatations for drug names and other entries that have commas in them
        // and updates values from null to 'N/A'
        const csvData = data.map((row) => {
          const csvRow = { ...row };
          Object.entries(csvRow).forEach((el) => {
            if (el[1] === null) {
              csvRow[el[0]] = 'N/A';
            } else if (typeof el[1] === 'string' && el[1].includes(',')) {
              csvRow[el[0]] = `"${el[1]}"`;
            }
          });
          return csvRow;
        });
        this.setState({ csvData, results: data, loading: false });
      });
  }

  async checkData(drugA, drugB, dataset, sampleInput) {
    let sample;
    // let cellLineCheck;
    // let biomarkerCheck;
    if (sampleInput) sample = Number.isNaN(parseInt(sampleInput, 10)) ? sampleInput : parseInt(sampleInput, 10);
    if (typeof sample === 'number') {
      return;
    }
    let url = '/api/cell_lines/filter?';
    if (dataset && dataset !== 'Any') {
    //   await fetch(`/api/biomarkers/dataset/${dataset}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //       biomarkerCheck = data.biomarkers;
    //     });
      url = url.concat(`&dataset=${dataset}`);
    }
    if (drugA && drugA !== 'Any') url = url.concat(`&drugId1=${drugA}`);
    if (drugB && drugB !== 'Any') url = url.concat(`&drugId2=${drugB}`);
    await fetch(url)
      .then(response => response.json())
      .then((data) => {
        let cellLines;
        if (sample) {
          cellLines = data.filter(item => item.tissue === sample);
        } else {
          cellLines = data;
        }
        if (cellLines.length >= 10) {
          this.setState({ displayOptions: true });
        }
      }).catch(
        // eslint-disable-next-line no-console
        err => console.log(err),
      );
  }

  handleCombo(index) {
    const { history } = this.props;
    const {
      results,
    } = this.state;
    const {
      idSource, idDrugA, idDrugB, idSample, comboId,
    } = results[index];


    // Redirects user to combo details page
    history.push(`/drug_combo?idSource=${idSource}&idDrugA=${idDrugA}&idDrugB=${idDrugB}&idSample=${idSample}&comboId=${comboId}`);
  }

  render() {
    const {
      results, loading,
      queryParams, displayOptions, csvData,
    } = this.state;
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;

    const { handleCombo } = this;
    const totalSynergyScores = results.length;
    // Process zip, hsa, loewe and bliss scores into renderable format
    const showScore = (props) => {
      // eslint-disable-next-line no-nested-ternary
      const score = props.value ? (props.value > 0 ? props.value.toFixed(4) : props.value.toFixed(3)) : null;
      return (
        <div className="score">
          {score >= 10 ? <span className="high-score">{score}</span> : <span>{score}</span>}
        </div>
      );
    };

    const columns = [{
      Header: 'Tissue',
      accessor: 'tissue', // String-based value accessors!
      Cell: props => <span>{props.value.toUpperCase()}</span>,
    }, {
      Header: 'Cell Line',
      accessor: 'sampleName',
      Cell: props => <span>{props.value.toUpperCase()}</span>,
    }, {
      Header: () => (
        <span>
          Compound
          {' '}
          <em>A</em>
        </span>
      ),
      accessor: 'drugNameA',
    }, {
      Header: () => (
        <span>
          Compound
          {' '}
          <em>B</em>
        </span>
      ),
      accessor: 'drugNameB',
    }, {
      Header: 'ZIP',
      accessor: 'zip',
      Cell: props => showScore(props),
      filterable: false,
      sortable: true,
    }, {
      Header: 'Bliss',
      accessor: 'bliss',
      Cell: props => showScore(props),
      filterable: false,
      sortable: true,
    }, {
      Header: 'Loewe',
      accessor: 'loewe',
      Cell: props => showScore(props),
      filterable: false,
      sortable: true,
    }, {
      Header: 'HSA',
      accessor: 'hsa',
      Cell: props => showScore(props),
      filterable: false,
      sortable: true,
    }, {
      Header: 'Source',
      accessor: 'sourceName',
    }];

    const headers = [
      { displayName: 'Tissue', id: 'tissue' },
      { displayName: 'Cell Line', id: 'sampleName' },
      { displayName: 'idSample', id: 'idSample' },
      { displayName: 'Cellosaurus ID', id: 'idCellosaurus' },
      { displayName: 'Sex', id: 'sex' },
      { displayName: 'Age', id: 'age' },
      { displayName: 'Cancer Type', id: 'disease' },
      { displayName: 'Compound A', id: 'drugNameA' },
      { displayName: 'ATC Code (Compound A)', id: 'atCodeDrugA' },
      { displayName: 'DrugBank ID (Compound A)', id: 'idDrugBankA' },
      { displayName: 'PubChem CID (Compound A)', id: 'idPubChemDrugA' },
      { displayName: 'SMILES (Compound A)', id: 'smilesDrugA' },
      { displayName: 'InChi Key (Compound A)', id: 'inchikeyDrugA' },
      { displayName: 'Compound B', id: 'drugNameB' },
      { displayName: 'ATC Code (Compound B)', id: 'atCodeDrugB' },
      { displayName: 'DrugBank ID (Compound B)', id: 'idDrugBankB' },
      { displayName: 'PubChem CID (Compound B)', id: 'idPubChemDrugB' },
      { displayName: 'SMILES (Compound B)', id: 'smilesDrugB' },
      { displayName: 'InChi Key (Compound B)', id: 'inchikeyDrugB' },
      { displayName: 'Dataset', id: 'sourceName' },
      { displayName: 'ZIP', id: 'zip' },
      { displayName: 'Bliss', id: 'bliss' },
      { displayName: 'Loewe', id: 'loewe' },
      { displayName: 'HSA', id: 'hsa' },
    ];

    // comboscore values are only available for NCI-ALMANAC DATASET
    if (!dataset || dataset === '2') headers.push({ displayName: 'Comboscore', id: 'comboscore' });

    let filename = 'drug_combos';
    if (sample) filename = filename.concat(`_${sample}`);
    if (dataset) filename = filename.concat(`_${dataset}`);
    if (drugId1) filename = filename.concat(`_${drugId1}`);
    if (drugId2) filename = filename.concat(`_${drugId2}`);
    return (
      <main>
        <QueryCard
          drugId1={drugId1}
          drugId2={drugId2}
          dataset={dataset}
          sample={sample}
        />
        {displayOptions ? (
          <ButtonsDiv>
            <h2>Analysis </h2>
            <div className="buttonsContainer">
              {(dataset || drugId1 || drugId2) ? (
                <a href={`/biomarker${queryParams}`}>
                  Biomarker
                  {' '}
                  <br />
                  {' '}
                  Discovery
                </a>
              ) : null }
              {drugId1 ? (
                <Fragment>
                  <a href={`/sensitivity${queryParams}`}>
                    Cell Line
                    {' '}
                    <br />
                    Sensitivity Analysis
                  </a>
                </Fragment>
              ) : null }
              <a href={`/enrichment${queryParams}`}>
                Tissue-Specific
                {' '}
                <br />
                Enrichment Analysis
              </a>
              <a href={`/consistency${queryParams}`}>
                Consistency in
                {' '}
                <br />
                Synergy Scores
              </a>
            </div>

          </ButtonsDiv>
        ) : null }
        <SynergyDiv>
          <h2>
            Synergy Scores,
            {' '}
            <i>N</i>
            {' '}
            =
            {' '}
            {totalSynergyScores}
          </h2>
          <DownloadButton
            data={csvData}
            headers={headers}
            filename={filename}
          />
          <ReactTable
            loading={loading}
            LoadingComponent={LoadingComponent}
            data={results}
            columns={columns}
            sortable={false}
            defaultPageSize={25}
            filterable
            defaultFilterMethod={filterCaseInsensitive}
            className=" -highlight"
            getTdProps={(state, rowInfo) => ({
              onClick: (e, handleOriginal) => {
                if (rowInfo) handleCombo(rowInfo.index);
                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                if (handleOriginal) {
                  handleOriginal();
                }
              },
            })
            }
          />
        </SynergyDiv>
      </main>
    );
  }
}

export default ComboResults;
