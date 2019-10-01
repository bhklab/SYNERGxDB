/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import { Slider } from 'react-compound-slider';
import QueryCard from './QueryCard';
// import ReactTable from 'react-table';
// import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

import ExpressionProfile from './Plots/ExpressionProfile';
// import BiomarkerPlot from './Plots/BiomarkerPlot';

const StyledBiomarkers = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;
`;

const sliderStyle = { // Give the slider some width
  position: 'relative',
  width: '100%',
  height: 80,
  border: '1px solid steelblue',
};

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: '#8B9CB6',
};

// const RailContainer = styled.div`
//   position: absolute,
//   width: 100%,
//   height: 10,
//   marginTop: 35,
//   borderRadius: 5,
//   backgroundColor: '#8B9CB6',
// `;


class Biomarkers extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
  }

  constructor() {
    super();
    this.state = {
      // biomarkerData: [],
      biomarkerData: null,
      selectedBiomarker: null,
      loading: true,
    };
    // this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const gene = 'ARL13A';
    // const gene = 'A2M';

    this.setState({ selectedBiomarker: gene });
    this.getPlotData(gene);
  }


  async getPlotData(gene) {
    try {
      const { location } = this.props;
      const requestParams = queryString.parse(location.search);
      const {
        sample, drugId1, drugId2, dataset,
      } = requestParams;
      let queryParams = '?';
      let biomarkerParams = `?gene=${gene}`;

      if (sample) {
        queryParams = queryParams.concat(`&sample=${sample}`);
        biomarkerParams = biomarkerParams.concat(`&sample=${sample}`);
      }
      if (dataset) queryParams = queryParams.concat(`&dataset=${dataset}`);
      if (drugId1) queryParams = queryParams.concat(`&drugId1=${drugId1}`);
      if (drugId2) queryParams = queryParams.concat(`&drugId2=${drugId2}`);

      const synergyObj = {};

      // API call to retrieve all relevant synergy scores
      await fetch('/api/combos'.concat(queryParams), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(response => response.json())
        .then((data) => {
          data.sort((a, b) => a.idSample - b.idSample);
          console.log(data);
          // Doesn't take into account significance of the data
          // Duplicated data should be filtered based on significance, use C-index
          data.forEach((score) => {
            if (!synergyObj[score.idSample]) {
              synergyObj[score.idSample] = {
                zip: score.zip,
                bliss: score.bliss,
              };
            }
          });
        });

      // API call to retrieve all fpkm expression levels
      await fetch('/api/biomarkers/association'.concat(biomarkerParams), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(response => response.json())
        .then((cellLineExpressionData) => {
          console.log(cellLineExpressionData);
          // Doesn't take into account significance of the data
          // Duplicated data should be filtered based on significance, use C-index
          cellLineExpressionData.forEach((item) => {
            if (synergyObj[item.idSample]) {
              synergyObj[item.idSample].fpkm = item.fpkm;
              synergyObj[item.idSample].cellName = item.name;
            }
          });
          // Loops through synergyObj and deletes incomplete key value pair
          // if it has incomplete data
          Object.entries(synergyObj).forEach((item) => {
            if (item[1].fpkm === undefined) delete synergyObj[item[0]];
          });
        });
      console.log(synergyObj);
      this.setState({ loading: false, biomarkerData: synergyObj });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      this.setState({ loading: false });
    }
  }
  // fetch('/api/biomarkers'.concat(queryParams), {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  // })
  //   .then(response => response.json())
  //   .then((data) => {
  //     console.log(data);
  //     this.setState({ results: data });
  //     if (data.length > 0) {
  //       this.setState({
  //         biomarkerData: true,
  //         loading: false,
  //       });
  //     }
  //   });

  // handleSelect(index) {
  //   this.setState({
  //     selectedBiomarker: index,
  //   });
  // }

  render() {
    // const { handleSelect } = this;
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;
    const {
      loading, biomarkerData, selectedBiomarker,
    } = this.state;
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
      <main>
        <QueryCard
          drugId1={drugId1}
          drugId2={drugId2}
          dataset={dataset}
          sample={sample}
        />
        <StyledBiomarkers>
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
          { !loading ? (
            <div className="plot-container">
              <ExpressionProfile
                biomarkerData={biomarkerData}
                selectedBiomarker={selectedBiomarker}
              />
              <Slider
                rootStyle={sliderStyle
                /* inline styles for the outer div. Can also use className prop. */}
                domain={[0, 100]}
                values={[10]}
              >
                {/* <RailContainer />
                Add a rail as a child.  Later we'll make it interactive. */}
                <div style={railStyle /* Add a rail as a child.  Later we'll make it interactive. */} />
              </Slider>
              {/* <BiomarkerPlot
                idDrugA={drugId1}
                idDrugB={drugId2}
                idSource={results[selectedBiomarker].idSource}
                gene={results[selectedBiomarker].gene}
                pValue={results[selectedBiomarker].p}
              /> */}
            </div>
          ) : null}
        </StyledBiomarkers>
      </main>
    );
  }
}
export default Biomarkers;
