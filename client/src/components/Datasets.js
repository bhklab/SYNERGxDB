import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
// import colors from '../styles/colors';
import 'react-table/react-table.css';
import DonutPlot from './Plots/DonutPlot';
import DatasetLegend from './Plots/DatasetLegend';
import ReactLoading from 'react-loading';
import colors from '../styles/colors';
import dataset_stats from '../dataset_stats.json';

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
        this.setState({ databaseData: databaseData});
      });

    // fetch('/api/combos/stats')
    //   .then(response => response.json())
    //   .then((datasetData) => {
    //     this.setState({ datasetData: datasetData, loading: false });
    //   });
    this.setState({ datasetData: dataset_stats, loading: false });

  }

  formatData(data, keyName) {
    // initialize
    let result = []
    data.forEach((val) => {
      let temp = {}
      temp.name = val.name
      if (keyName === "Combinations") {
        temp.num = val.nCombos
      } else if (keyName === "Experiments") {
        temp.num = val.nExperiments
      } else if (keyName === "Datapoints") {
        temp.num = val.nDatapoints
      }
      result.push(temp)
    })
    return result;
  }

  legendCallBack = (colorMap) => {
    this.setState({colorMap: colorMap})
  }

  render() {
    const { databaseData, datasetData, colorMap, loading } = this.state;
    const columns = [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
      sortable: false,
    }, {
      Header: 'Source',
      accessor: 'author',
      sortable: false,
      Cell: props => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://www.ncbi.nlm.nih.gov/pubmed/${props.original.pmID}`}>{props.value}</a>,

    }, {
      Header: '# of cell lines',
      accessor: 'no_samples',
      style: { textAlign: 'right' },
      sortable: true,
      Cell: props => new Intl.NumberFormat().format(props.value)
    }, {
      Header: '# of compounds',
      accessor: 'no_drugs',
      style: { textAlign: 'right' },
      sortable: true,
      Cell: props => new Intl.NumberFormat().format(props.value)
    }, {
      Header: 'Design',
      accessor: 'combo',
      sortable: false,
    }];

    const miniDims = {
      width: 220,
      height: 250,
      radius: 150,
      rectY: -50,
      textY: -50,
      translate:30
    }
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
                <h1>Datasets, <i>N</i> = {datasetData.length.toLocaleString()}</h1>
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
                      keyName="Datapoints"
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
        
        
          <StyledWrapper className="wrapper">
            <h1>List of Datasets</h1>
            <ReactTable
              data={databaseData}
              columns={columns}
              className="-highlight"
              showPagination={false}
              defaultPageSize={7}
              loading={loading}
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


export default Datasets;
