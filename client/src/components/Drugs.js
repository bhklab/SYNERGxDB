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


const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  text-align: left;
  border-spacing: 0;

  th,
  td {
    overflow: hidden;
    margin: 0;
    padding: 5px;
    border-bottom: 2px solid ${colors.color_main_1}
  }

  th:nth-child(3),
  th:nth-child(4) {
    max-width: calc(50% - 200px);
  }
  
  td:nth-child(3),
  td:nth-child(4) {
    max-width: 100px;
  }
`;

class Drugs extends Component {
  constructor() {
    super();
    this.state = {
      drugsData: [],
    };
  }

  componentDidMount() {
    fetch('/api/drugs/')
      .then(response => response.json())
      .then((drugsData) => {
        console.log(drugsData);
        this.setState({ drugsData });
      });
  }

  render() {
    const { drugsData } = this.state;
    const listOfDrugs = drugsData.map((drug, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <tr key={index}>
        <td><div>{drug.name}</div></td>
        <td><div>{drug.atcCode}</div></td>
        <td><div>{drug.idPubChem}</div></td>
        <td><div>{drug.idDrugBank}</div></td>
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
            <StyledTable>

              <tbody>
                <tr>
                  <th>Name</th>
                  <th>ATC Code</th>
                  <th>PubChem CID</th>
                  <th>DrugBank ID</th>
                </tr>
                {listOfDrugs}
              </tbody>
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


export default Drugs;
