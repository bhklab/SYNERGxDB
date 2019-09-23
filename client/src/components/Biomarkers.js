/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import ReactTable from 'react-table';
import colors from '../styles/colors';
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
      biomarkerData: false,
      selectedBiomarker: 0,
      loading: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const { drugId1, drugId2} = requestParams;

    if (drugId1 && drugId2) {
    fetch('/api/biomarkers?drugId1', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then((data) => {
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

  handleSelect(index) {
    this.setState({
      selectedBiomarker: index,
    });
  }

  render() {
    const { handleSelect } = this;
    const {
      biomarkerData, results, selectedBiomarker, loading,
    } = this.state;
    const {
      drugId1, drugId2,
    } = this.props;
    if (biomarkerData) {
      const columns = [{
        Header: 'Gene Symbol',
        accessor: 'gene', // String-based value accessors!
      }, {
        Header: 'One-way ANOVA P',
        accessor: 'p',
      }, {
        Header: 'Source',
        accessor: 'name',
      }];

      return (
        <Fragment>
          <StyledBiomarkers className="biomarkers">
            <h2>Potential Biomarkers, Top 10</h2>
            {/* <ReactTable
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
          </StyledBiomarkers>
          {/* <BiomarkerPlot
            idDrugA={drugId1}
            idDrugB={drugId2}
            idSource={results[selectedBiomarker].idSource}
            gene={results[selectedBiomarker].gene}
            pValue={results[selectedBiomarker].p}
          /> */}
        </Fragment>
      );
    }
    return (<h2>Something went wrong!</h2>);
  }
}
export default Biomarkers;
