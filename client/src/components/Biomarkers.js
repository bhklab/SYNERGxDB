/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
// import ReactTable from 'react-table';
// import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

import BiomarkerPlot from './Plots/BiomarkerPlot';

const StyledBiomarkers = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;
`;


class Biomarkers extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
  }

  constructor() {
    super();
    this.state = {
      results: [],
      // biomarkerData: [],
      biomarkerData: null,
      selectedBiomarker: 0,
      loading: true,
      drugId1: null,
      drugId2: null,
      dataset: null,
      sample: null,
    };
    // this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;
    let queryParams = '';
    this.setState({
      drugId1: parseInt(drugId1, 10),
      drugId2: parseInt(drugId2, 10),
      dataset: parseInt(dataset, 10),
      sample,
    });
    if (sample) queryParams = queryParams.concat(`&sample=${sample}`);
    if (dataset) queryParams = queryParams.concat(`&dataset=${dataset}`);
    if (drugId1) queryParams = queryParams.concat(`&drugId1=${drugId1}`);
    if (drugId2) queryParams = queryParams.concat(`&drugId2=${drugId2}`);

    // API call to retrieve all relevant synergy scores
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

    if (drugId1 && drugId2) {
      fetch(`/api/biomarkers?drugId1=${drugId1}&drugId2=${drugId2}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          this.setState({ results: data });
          if (data.length > 0) {
            this.setState({
              biomarkerData: true,
              loading: false,
            });
          }
        });
    }
  }

  // handleSelect(index) {
  //   this.setState({
  //     selectedBiomarker: index,
  //   });
  // }

  render() {
    // const { handleSelect } = this;
    const {
      biomarkerData, results, selectedBiomarker, loading,
    } = this.state;
    const {
      drugId1, drugId2,
    } = this.props;
    if (biomarkerData) {
      // const columns = [{
      //   Header: 'Gene Symbol',
      //   accessor: 'gene', // String-based value accessors!
      // }, {
      //   Header: 'One-way ANOVA P',
      //   accessor: 'p',
      // }, {
      //   Header: 'Source',
      //   accessor: 'name',
      // }];

      return (
        <main className="summary">
          <StyledBiomarkers className="biomarkers">
            {/* <h2>Potential Biomarkers, Top 10</h2>
            <ReactTable
              data={results}
              columns={columns}
              className="-highlight"
              showPagination={false}
              defaultPageSize={10}
              loading={loading}
              sortable={false}
              getTdProps={(state, rowInfo) => ({
                onClick: (e, handleOriginal) => {
                  handleSelect(rowInfo.index);
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
                  background: rowInfo.index === selectedBiomarker ? colors.summary_bg : 'transparent',
                },
              })
              }
            /> */}
            <div className="plot-container">
              <BiomarkerPlot
                idDrugA={drugId1}
                idDrugB={drugId2}
                idSource={results[selectedBiomarker].idSource}
                gene={results[selectedBiomarker].gene}
                pValue={results[selectedBiomarker].p}
              />

            </div>
          </StyledBiomarkers>
        </main>
      );
    }
    return (<h2>Something went wrong!</h2>);
  }
}
export default Biomarkers;
