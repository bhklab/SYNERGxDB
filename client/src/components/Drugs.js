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
        <td>{drug.name}</td>
        <td>{drug.atcCode}</td>
        <td>{drug.idPubChem}</td>
        <td>{drug.idDrugBank}</td>
      </tr>
    ));
    return (
      <Fragment>
        <header />
        <main>
          <StyledWrapper className="wrapper">
            <table>

              <tbody>
                <tr>
                  <th>Name</th>
                  <th>ATC Code</th>
                  <th>PubChem CID</th>
                  <th>DrugBank ID</th>
                </tr>
                {listOfDrugs}
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


export default Drugs;
