import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
        console.log(cellLineData);
        this.setState({ cellLineData });
      });
  }

  render() {
    const { cellLineData } = this.state;
    const listOfSources = cellLineData.map((cellLine, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={index}>
        <td>{cellLine.name}</td>
        <td>{cellLine.tissue}</td>
        <td>{cellLine.sex}</td>
        <td>{cellLine.age}</td>
        <td>{cellLine.disease}</td>
      </tr>
    ));
    return (
      <Fragment>
        <header>
          <div className="wrapper">
            <h1>SYNERGxDB</h1>
          </div>
        </header>
        <main>
          <StyledWrapper className="wrapper">
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Tissue</th>
                  <th>Sex</th>
                  <th>Age</th>
                  <th>Disease</th>
                </tr>
                {listOfSources}
              </tbody>
            </table>

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
