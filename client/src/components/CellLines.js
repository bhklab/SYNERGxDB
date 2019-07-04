import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
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

class Databases extends Component {
  constructor() {
    super();
    this.state = {
      cellLineData: [],
    };
  }

  componentDidMount() {
    fetch('/api/cell_lines/')
      .then(response => response.json())
      .then((cellLineData) => {
        this.setState({ cellLineData });
      });
  }

  render() {
    const { cellLineData } = this.state;
    const listOfCells = cellLineData.map((cellLine, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        <span>{cellLine.name}</span>
        <span>{cellLine.tissue}</span>
        <span>{cellLine.sex}</span>
        <span>{cellLine.age}</span>
        <span>{cellLine.disease}</span>
      </Fragment>
    ));
    return (
      <Fragment>
        <header />
        <main>
          <StyledWrapper className="wrapper">
            <StyledTable className="grid-container">
              <span className="table-header">Name</span>
              <span className="table-header">Tissue</span>
              <span className="table-header">Sex</span>
              <span className="table-header">Age</span>
              <span className="table-header">Disease</span>
              {listOfCells}
            </StyledTable>

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


export default Databases;
