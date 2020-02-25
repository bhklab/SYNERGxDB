import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
// import colors from '../styles/colors';
import 'react-table/react-table.css';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

import DownloadButton from './UtilComponents/DownloadButton';
import DonutPlot from './Plots/DonutPlot';
import DatasetLegend from './Plots/DatasetLegend';
import colors from '../styles/colors';
import datasetStats from '../dataset_stats.json';

// import transitions from '../styles/transitions';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background:white;
  padding:0px 30px;

  #dsetMiniPlot {
    margin-left:40px;
  }

  #dsetLegend {
    margin: 20px 0px 0px 40px;
    
    &span {
      line-height:5px;
      font-size:85%;
    }
  }

  .ReactTable a {
    colors: ${colors.color_main_5} !important;
  }
 
`;

class Datasets extends Component {
  constructor() {
    super();
    this.state = {
      databaseData: [],
      datasetData: [],
      colorMap: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch('/api/datasets/')
      .then(response => response.json())
      .then((databaseData) => {
        this.setState({ databaseData });
      });

    // fetch('/api/combos/stats')
    //   .then(response => response.json())
    //   .then((datasetData) => {
    //     this.setState({ datasetData: datasetData, loading: false });
    //   });
    this.setState({ datasetData: datasetStats, loading: false });
  }

  formatData(data, keyName) {
    // initialize
    const result = [];
    data.forEach((val) => {
      const temp = {};
      temp.name = val.name;
      // also parsing if number less than threshold
      // so visible on the donut plot
      if (keyName === 'Combinations') {
        temp.numLabel = val.nCombos;
        temp.num = (val.nCombos < 200 ? 200 : val.nCombos);
      } else if (keyName === 'Experiments') {
        temp.numLabel = val.nExperiments;
        temp.num = (val.nExperiments < 4000 ? 4000 : val.nExperiments);
      } else if (keyName === 'Measurements') {
        temp.numLabel = val.nDatapoints;
        temp.num = (val.nDatapoints < 50000 ? 50000 : val.nDatapoints);
      }
      result.push(temp);
    });
    return result;
  }

  legendCallBack = (colorMap) => {
    this.setState({ colorMap });
  }

  render() {
    const {
      databaseData, datasetData, colorMap, loading,
    } = this.state;
    const columns = [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
      sortable: false,
      Cell: props => <Link style={{ color: colors.color_main_1 }} to={`/dataset_zips/Raw_${props.original.name}.zip`} target="_blank" download>{props.original.name}</Link>,
    }, {
      Header: 'Source',
      accessor: 'author',
      sortable: false,
      Cell: props => <a className="hover" target="_blank" rel="noopener noreferrer" href={props.original.name === 'DECREASE' ? 'https://www.nature.com/articles/s42256-019-0122-4' : `https://www.ncbi.nlm.nih.gov/pubmed/${props.original.pmID}`}>{props.value}</a>,

    }, {
      Header: '# of cell lines',
      accessor: 'no_samples',
      style: { textAlign: 'right' },
      sortable: true,
      Cell: props => new Intl.NumberFormat().format(props.value),
    }, {
      Header: '# of compounds',
      accessor: 'no_drugs',
      style: { textAlign: 'right' },
      sortable: true,
      Cell: props => new Intl.NumberFormat().format(props.value),
    }, {
      Header: 'Design',
      accessor: 'combo',
      sortable: false,
    }];
    const headers = [
      { displayName: 'Name', id: 'name' },
      { displayName: 'Source', id: 'author' },
      { displayName: '# of cell lines', id: 'no_samples' },
      { displayName: '# of compounds', id: 'no_drugs' },
      { displayName: 'Design', id: 'combo' },
    ];

    const miniDims = {
      width: 220,
      height: 250,
      radius: 150,
      rectY: -50,
      textY: -50,
      translate: 30,
    };
    return (
      <Fragment>
        <main className="summary">

          <StyledWrapper className="wrapper">
            { loading
              ? (
                <div className="loading-container">
                  <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
                </div>
              )
              : (

                <Fragment>
                  <h1>
                    Datasets,
                    {' '}
                    <i>N</i>
                    {' '}
                    =
                    {' '}
                    {datasetData.length.toLocaleString()}
                  </h1>
                  {datasetData.length === 0 ? null : (
                    <Fragment>
                      <DonutPlot
                        keyName="Combinations"
                        plotId="dsetMiniPlot"
                        dimensions={miniDims}
                        formatData={this.formatData}
                        donutData={datasetData}
                        legendCallBack={this.legendCallBack}
                      />

                      <DonutPlot
                        keyName="Experiments"
                        plotId="dsetMiniPlot"
                        dimensions={miniDims}
                        formatData={this.formatData}
                        donutData={datasetData}
                        legendCallBack={this.legendCallBack}
                      />

                      <DonutPlot
                        keyName="Measurements"
                        plotId="dsetMiniPlot"
                        dimensions={miniDims}
                        formatData={this.formatData}
                        donutData={datasetData}
                        legendCallBack={this.legendCallBack}
                      />
                      {colorMap.length === 0 ? null : (
                        <DatasetLegend
                          data={colorMap}
                          datasetData={datasetData}
                          plotId="dsetLegend"
                        />
                      )}
                    </Fragment>
                  )}
                </Fragment>
              )}
          </StyledWrapper>


          {databaseData.length === 0 ? null : (
            <StyledWrapper className="wrapper">
              <h1>List of Datasets</h1>
              <DownloadButton
                data={databaseData}
                filename="datasets"
                headers={headers}
              />
              <ReactTable
                data={databaseData}
                columns={columns}
                className="-highlight"
                showPagination={false}
                defaultPageSize={9}
                loading={loading}
              />
            </StyledWrapper>
          )}

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


export default Datasets;
