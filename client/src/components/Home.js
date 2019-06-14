import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import SearchCombos from './SearchCombos';
import banner from '../images/banner.png';
import arrow from '../images/arrow.svg';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledBanner = styled.img`
  max-width: 500px;
`;

const StyledButton = styled.button`
  
  font-size: 1.25em;
  border-radius: 5px;
  img {
    height: 1em;
    display: inline;
  }
 
`;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      toggleForm: false,
    };
  }

  render() {
    const toggleButton = (
      <StyledButton type="button" onClick={() => this.setState({ toggleForm: !this.state.toggleForm })}>
        Get Started
        <img src={arrow} alt="" />
      </StyledButton>
    );
    return (
      <Fragment>
        <header>
          <div className="wrapper">
            <h1>SYNERGxDB</h1>
          </div>
        </header>
        <main>
          <StyledWrapper className="wrapper">
            <StyledBanner src={banner} alt="banner" />
            <h2>
            SYNERGxDB is a database that allows users to ... drug combinations.
            Synergistic drug combination ... in chemotherapy of cancer.
            </h2>
            {this.state.toggleForm ? <SearchCombos /> : toggleButton }
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


export default Home;
