/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

import BiomarkerPlot from './BiomarkerPlot';

const StyledBiomarkers = styled.div`
  width: 100%;
  height: auto;
`;

const BiomarkerDiv = styled.div`
  
  grid-template-columns: repeat(4, 1fr);
  border-bottom: solid 2px black;
  margin: 10px 0;

  span {
    &:nth-child(8n-3),
    &:nth-child(8n-2),
    &:nth-child(8n-1),
    &:nth-child(8n) {
      background-color: ${colors.trans_color_main_3};
    }
  }
`;


class Biomarkers extends Component {
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
    const { drugId1, drugId2 } = this.props;
    fetch('/api/biomarkers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        drugId1,
        drugId2,
      }),
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
    const { drugId1, drugId2, sourceName } = this.props;
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
      // const listOfBiomarkers = results.map((biomarker, index) => (
      //   <Fragment key={index}>
      //     <span>{biomarker.gene}</span>
      //     <span>{biomarker.p}</span>
      //     <span>{biomarker.name}</span>
      //     <span>
      //       <input
      //         type="radio"
      //         value={index}
      //         checked={index.toString() === selectedBiomarker}
      //         onChange={this.handleSelect}
      //       />
      //     </span>
      //   </Fragment>
      // ));
      return (
        <Fragment>
          <StyledBiomarkers className="biomarkers">
            <h2>Potential Biomarkers, Top 10</h2>
            <ReactTable
              data={results}
              columns={columns}
              className="-striped -highlight"
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
                  background: rowInfo.index === selectedBiomarker ? colors.trans_color_accent_1 : 'transparent',
                },
              })
              }
            />
            {/* <BiomarkerDiv className="grid-container">
              <span className="table-header">Gene Symbol</span>
              <span className="table-header">One-way ANOVA P</span>
              <span className="table-header">Source</span>
              <span className="table-header">Select</span>
              {listOfBiomarkers}
            </BiomarkerDiv> */}
          </StyledBiomarkers>
          <BiomarkerPlot
            idDrugA={drugId1}
            idDrugB={drugId2}
            idSource={results[selectedBiomarker].idSource}
            gene={results[selectedBiomarker].gene}
            pValue={results[selectedBiomarker].p}
          />
        </Fragment>
      );
    }
    return null;
  }
}
export default Biomarkers;
