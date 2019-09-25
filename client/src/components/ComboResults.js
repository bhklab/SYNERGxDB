/* eslint-disable react/no-unused-state */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import styled from 'styled-components';
import ReactTable from 'react-table';

import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

import LoadingComponent from './Loading';
import QueryCard from './QueryCard';

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
  display: flex;
  align-items:center;

  a {
    height:70px;
    background:${colors.blue_main};
    color: white;
    flex:1;
    margin:0px 10px;
    padding: 15px;
    font-weight:700;
    text-align:center;
  }
`;

class ComboResults extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  }

  constructor() {
    super();
    this.state = {
      results: [],
      drugId1: null,
      drugId2: null,
      loading: true,
      dataset: null,
      datasetName: 'Any',
      drugName1: 'Any',
      drugName2: 'Any',
      cellLineName: 'Any',
      queryParams: '',
    };
    this.handleCombo = this.handleCombo.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    console.log(requestParams);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;
    let queryParams = `?drugId1=${drugId1}`;

    this.setState({
      drugId1: parseInt(drugId1, 10),
      drugId2: parseInt(drugId2, 10),
      dataset: parseInt(dataset, 10),
    });
    if (sample) queryParams = queryParams.concat(`&sample=${sample}`);
    if (dataset) queryParams = queryParams.concat(`&dataset=${dataset}`);
    if (drugId2) queryParams = queryParams.concat(`&drugId2=${drugId2}`);

    this.setState({ queryParams });

    fetch('/api/combos'.concat(queryParams), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ results: data, loading: false });
      });

    if (drugId1) {
      fetch('/api/drugs/'.concat(drugId1))
        .then(response => response.json())
        .then((data) => {
          this.setState({ drugName1: data[0].name });
        });
    }


    if (drugId2) {
      fetch('/api/drugs/'.concat(drugId2))
        .then(response => response.json())
        .then((data) => {
          this.setState({ drugName2: data[0].name });
        });
    }

    if (dataset) {
      fetch('/api/datasets/'.concat(dataset))
        .then(response => response.json())
        .then((data) => {
          this.setState({ datasetName: data[0].name });
        });
    }

    if (sample) {
      if (parseInt(sample, 10)) {
        fetch('/api/cell_lines/'.concat(sample))
          .then(response => response.json())
          .then((data) => {
            this.setState({ cellLineName: data[0].name });
          });
      } else {
        this.setState({ cellLineName: sample.toUpperCase() });
      }
    }
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
      results, cellLineName, datasetName, drugName1, drugName2, loading,
      queryParams,
    } = this.state;
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;

    const { handleCombo } = this;
    // const showBiomarker = typeof drugId2 === 'number' && <Biomarkers drugId1={drugId1} drugId2={drugId2} sourceName={results} dataset={dataset} />;
    const totalSynergyScores = results.length;
    // Process zip, hsa, loewe and bliss scores into renderable format
    const showScore = (props) => {
      // eslint-disable-next-line no-nested-ternary
      const score = props.value ? (props.value > 0 ? props.value.toFixed(4) : props.value.toFixed(3)) : null;
      return (
        <div className="score">
          {score >= 0.2 ? <span className="high-score">{score}</span> : <span>{score}</span>}
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
          Drug
          {' '}
          <em>A</em>
        </span>
      ),
      accessor: 'drugNameA',
    }, {
      Header: () => (
        <span>
          Drug
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
    const filterCaseInsensitive = (filter, row) => {
      const id = filter.pivotId || filter.id;
      return (
        row[id] !== undefined
          ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
          : true
      );
    };
    return (
      <main>
        <QueryCard
          drugId1={drugId1}
          drugId2={drugId2}
          dataset={dataset}
          sample={sample}
        />
        <ButtonsDiv>
          <a href={`/biomarker${queryParams}`}>
            Biomarker
            {' '}
            <br />
            {' '}
            Discovery
          </a>
          <a href={`/sensitivity${queryParams}`}>
            Cell Line
            {' '}
            <br />
            Sensitivity Analysis
          </a>
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
        </ButtonsDiv>

        {/* {showBiomarker} */}
        <SynergyDiv>
          <h2>
            Synergy Scores, N=
            {totalSynergyScores}
          </h2>
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
                console.log(results);
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
