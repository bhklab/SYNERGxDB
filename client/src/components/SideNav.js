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
  background-color: ${colors.trans_color_main_3};

  li {
    margin-top: 20px;
    font-size: 1.25em;
    font-weight: bold;

    a {
      color: ${colors.color_main_1};
      transition: ${transitions.main_trans}

      &:hover {
        color: ${colors.color_main_4};
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
