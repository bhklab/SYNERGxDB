import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../styles/colors';
import 'react-table/react-table.css';

// import transitions from '../styles/transitions';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
    }, {
      Header: 'Source',
      accessor: 'author',
    }, {
      Header: '# of cell lines',
      accessor: 'no_samples',
    }, {
      Header: '# of drugs',
      accessor: 'no_drugs',
    }, {
      Header: 'Design',
      accessor: 'combo',
    }];
    return (
      <Fragment>
        <header>
          <h1>List of Datasets</h1>
        </header>
        <main>
          <StyledWrapper className="wrapper">
            <ReactTable
              data={databaseData}
              columns={columns}
              className="-striped -highlight"
              showPagination={false}
              defaultPageSize={7}
              loading={loading}
            />
          </StyledWrapper>
        </main>
        <footer>
          <div className="wrapper">
            <p>Copyright © 2019. All rights reserved</p>
          </div>
        </footer>
      </Fragment>
    );
  }
}


export default Datasets;
