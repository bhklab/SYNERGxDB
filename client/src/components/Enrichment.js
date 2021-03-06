import React, { Component } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { filterCaseInsensitive } from '../utils/filtering';

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

  constructor(props) {
    super(props);
    const { location } = this.props;
    const requestParams = queryString.parse(location.search);
    const {
      sample, drugId1, drugId2, dataset,
    } = requestParams;
    this.state = {
      data: [],
      loading: true,
      sample,
      drugId1,
      drugId2,
      dataset,
    };
  }

  componentDidMount() {
    const {
      sample, drugId1, drugId2, dataset,
    } = this.state;
    let url = '/api/cell_lines/enrichment?';
    if (sample) url = url.concat(`sample=${sample}`);
    if (drugId1) url = url.concat(`&drugId1=${drugId1}`);
    if (drugId2) url = url.concat(`&drugId2=${drugId2}`);
    if (dataset) url = url.concat(`&dataset=${dataset}`);
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        this.setState({ data, loading: false });
      });
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
      { displayName: 'Compound A', id: 'drugA' },
      { displayName: 'Compound B', id: 'drugB' },
      { displayName: 'Tissue', id: 'tissue' },
      { displayName: 'Method', id: 'score' },
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
      Header: 'Compound A',
      accessor: 'drugA',
    }, {
      Header: 'Compound B',
      accessor: 'drugB',
    }, {
      Header: 'Tissue',
      accessor: 'tissue',
      Cell: props => <span>{props.value.toUpperCase()}</span>,
    }, {
      Header: 'Method',
      accessor: 'score',
    }, {
      Header: 'AUC',
      accessor: 'auc',
      filterable: false,
      className: 'right',
      Cell: props => <span>{props.value.toFixed(3)}</span>,
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
          <DownloadButton
            data={data}
            headers={headers}
            filename={filename}
          />
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={25}
            filterable
            sortable
            className="-highlight"
            loading={loading}
            LoadingComponent={LoadingComponent}
            defaultFilterMethod={filterCaseInsensitive}
          />
        </EnrichmentDiv>
      </main>
    );
  }
}
export default Enrichment;
