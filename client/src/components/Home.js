import React, { Component, Fragment } from 'react';
import { Collapse } from 'react-collapse';
import styled from 'styled-components';
import SearchCombos from './SearchCombos';
import colors from '../styles/colors';
import transitions from '../styles/transitions';
import banner from '../images/banner.png';
import arrow from '../images/arrow.svg';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledBanner = styled.img`
  max-width: 500px;
`;

const StyledButton = styled.button`
  
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 5px;
  color: ${colors.color_main_3};
  background-color: ${colors.color_main_1};
  border: 2px solid ${colors.color_main_1};
  transition: ${transitions.main_trans};
  outline-style: none;
  
  img {
    height: 1em;
    display: inline;
    transition: ${transitions.main_trans};
    filter: invert(0.5) sepia(1) hue-rotate(114deg) saturate(0.3) brightness(0.5)
  }

  &:hover {
    background-color: ${colors.color_main_3};
    color: ${colors.color_main_1};

    img {
      filter: none;
    }
  }
 
`;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { isOpen } = this.state;
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
            <Collapse isOpened={!isOpen} springConfig={{ stiffness: 100, damping: 10 }}>
              <StyledButton type="button" onClick={() => this.setState({ isOpen: true })}>
                Get Started
                <img src={arrow} alt="" />
              </StyledButton>
            </Collapse>
            <Collapse isOpened={isOpen} springConfig={{ stiffness: 150, damping: 50 }}>
              <SearchCombos />
            </Collapse>
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
