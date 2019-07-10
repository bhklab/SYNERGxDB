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

const StyledTable = styled.div`
    
  grid-template-columns: repeat(5, 1fr);
  border-bottom: solid 2px black;
  margin: 10px 0;

  span {
    &:nth-child(10n-4),
    &:nth-child(10n-3),
    &:nth-child(10n-2),
    &:nth-child(10n-1),
    &:nth-child(10n) {
      background-color: ${colors.trans_color_main_5};
    }
  }
`;

class Datasets extends Component {
  constructor() {
    super();
    this.state = {
      databaseData: [],
    };
  }

  componentDidMount() {
    fetch('/api/datasets/')
      .then(response => response.json())
      .then((databaseData) => {
        this.setState({ databaseData });
      });
  }

  render() {
    const { databaseData } = this.state;
    // const listOfSources = databaseData.map((item, index) => (
    // // eslint-disable-next-line react/no-array-index-key
    // <Fragment key={index}>
    //   <span>{item.name}</span>
    //   <span>{item.author}</span>
    //   <span>{item.no_samples}</span>
    //   <span>{item.no_drugs}</span>
    //   <span>{item.combo}</span>
    // </Fragment>
    // ));
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
              sortable={false}
              defaultPageSize={25}
              filterable
              className="-striped -highlight"
            />
            {/* <StyledTable className="grid-container">
              <span className="table-header">Name</span>
              <span className="table-header">Source</span>
              <span className="table-header"># of cell lines</span>
              <span className="table-header"># of drugs</span>
              <span className="table-header">Design</span>
              {listOfSources}
            </StyledTable> */}

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
