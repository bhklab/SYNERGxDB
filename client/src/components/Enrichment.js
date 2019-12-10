import React, { Component } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// import colors from '../styles/colors';
// import transitions from '../styles/transitions';
import QueryCard from './UtilComponents/QueryCard';
import DownloadButton from './UtilComponents/DownloadButton';
import LoadingComponent from './UtilComponents/Loading';

const EnrichmentDiv = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;
`;


class Enrichment extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
  }

  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentDidMount() {
    console.log('Fetch request');
  }

  render() {
    const { data, loading } = this.state;
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;

    const headers = [
      { displayName: 'Dataset', id: 'dataset' },
      { displayName: 'Tissue', id: 'tissue' },
      { displayName: 'Methods', id: 'score' },
      { displayName: 'AUC', id: 'auc' },
    ];
    let filename = 'tissue_enrichment';
    if (sample) filename = filename.concat(`_${sample}`);
    if (dataset) filename = filename.concat(`_${dataset}`);
    if (drugId1) filename = filename.concat(`_${drugId1}`);
    if (drugId2) filename = filename.concat(`_${drugId2}`);

    const columns = [{
      Header: 'Dataset',
      accessor: 'dataset',
    }, {
      Header: 'Tissue',
      accessor: 'tissue',
    }, {
      Header: 'Methods',
      accessor: 'score',
    }, {
      Header: 'AUC',
      accessor: 'auc',
    }];

    return (
      <main>
        <QueryCard
          drugId1={drugId1}
          drugId2={drugId2}
          dataset={dataset}
          sample={sample}
        />
        <EnrichmentDiv>
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={25}
            filterable
            sortable
            className="-highlight"
            loading={loading}
            LoadingComponent={LoadingComponent}
          />
          <DownloadButton
            data={data}
            headers={headers}
            filename={filename}
          />
        </EnrichmentDiv>
      </main>
    );
  }
}
export default Enrichment;
