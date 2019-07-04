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
    
  grid-template-columns: minmax(25%, 400px) minmax(25%, 400px) auto auto;

  span {
    &:nth-child(8n-3),
    &:nth-child(8n-2),
    &:nth-child(8n-1),
    &:nth-child(8n) {
      background-color: ${colors.trans_color_main_5};
    }
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
        this.setState({ drugsData });
      });
  }

  render() {
    const { drugsData } = this.state;
    const listOfDrugs = drugsData.map((drug, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        <span>{drug.name}</span>
        <span>{drug.atcCode}</span>
        <span>{drug.idPubChem}</span>
        <span>{drug.idDrugBank}</span>
      </Fragment>
    ));
    return (
      <Fragment>
        <header />
        <main>
          <StyledWrapper className="wrapper">
            <StyledTable className="grid-container">
              <span className="table-header">Name</span>
              <span className="table-header">ATC Code</span>
              <span className="table-header">PubChem CID</span>
              <span className="table-header">DrugBank ID</span>
              {listOfDrugs}
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
