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
    
  grid-template-columns: repeat(6, auto);

  span {
    &:nth-child(12n-5),
    &:nth-child(12n-4),
    &:nth-child(12n-3),
    &:nth-child(12n-2),
    &:nth-child(12n-1),
    &:nth-child(12n) {
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
        <span>
          {cellLine.disease}
          {cellLine.origin ? (<em> (metastasis)</em>) : null}
        </span>
        <span><a className="hover" href={`https://web.expasy.org/cellosaurus/${cellLine.idCellosaurus}`}>{cellLine.idCellosaurus}</a></span>
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
              <span className="table-header">Cellosaurus</span>
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
