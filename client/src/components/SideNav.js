import React, { Component } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

const StyledNav = styled.nav`
  padding: 20px;   
  width: 100%  
  max-width: 250px;
  height: 100vh;
  width: 30%
  background-color: rgba(190, 144, 99, 0.75);

  li {
    margin-top: 10px;
    font-size: 1.5em;

    a {
      color: ${colors.color_main_1};
      transition: ${transitions.main_trans}

      &:hover {
        color: ${colors.color_main_3};
      }
    }
  }
`;
const StyledLogo = styled.img`
  max-width: 250px;
`;

const Home = () => (

  <StyledNav className="side-nav">
    <StyledLogo src={logo} alt="logo" className="logo" />
    <ul>
      <li><a href="#">Cell lines</a></li>
      <li><a href="#">Drugs</a></li>
      <li><a href="#">Databases</a></li>
      <li><a href="#">Synergy Scores</a></li>
      <li><a href="#">Drug Response Curves</a></li>
      <li><a href="#">Download</a></li>
    </ul>
  </StyledNav>
);

export default Home;
