import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';
import transitions from '../styles/transitions';


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
      databaseData: [],
    };
  }

  componentDidMount() {
    fetch('/api/databases/')
      .then(response => response.json())
      .then((databaseData) => {
        console.log(databaseData);
        this.setState({ databaseData });
      });
  }

  render() {
    const { databaseData } = this.state;
    const listOfSources = databaseData.map(item => (
      <tr>
        <td>{item.name}</td>
        <td>{item.author}</td>
        <td>{item.no_samples}</td>
        <td>{item.no_drugs}</td>
        <td>{item.combo}</td>
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
                  <th>Source</th>
                  <th># of cell lines</th>
                  <th># of drugs</th>
                  <th>Design</th>
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
