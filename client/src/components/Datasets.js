import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
// import colors from '../styles/colors';
import 'react-table/react-table.css';

// import transitions from '../styles/transitions';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background:white;
  padding:0px 30px;
`;

class Datasets extends Component {
  constructor() {
    super();
    this.state = {
      databaseData: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch('/api/datasets/')
      .then(response => response.json())
      .then((databaseData) => {
        this.setState({ databaseData, loading: false });
      });
  }

  render() {
    const { databaseData, loading } = this.state;
    const columns = [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
      sortable: false
    }, {
      Header: 'Source',
      accessor: 'author',
      sortable: false,
      Cell: (props) => <a className="hover" target="_blank" href={`https://www.ncbi.nlm.nih.gov/pubmed/${props.original.pmID}`}>{props.value}</a>

    }, {
      Header: '# of cell lines',
      accessor: 'no_samples',
      style:{textAlign: 'right'},
      sortable: true
    }, {
      Header: '# of compounds',
      accessor: 'no_drugs',
      style:{textAlign: 'right'},
      sortable: true
    }, {
      Header: 'Design',
      accessor: 'combo',
      sortable: false
    }];
    return (
      <Fragment>
        {/* <style>{'#root { background: #e7f3f8  !important; }'}</style> */}
        <main className="summary">
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
