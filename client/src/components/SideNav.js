import React from 'react';
import { Link } from 'react-router-dom';
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
      <li><Link to="/cell-lines/">Cell lines</Link></li>
      <li><Link to="/drugs/">Drugs</Link></li>
      <li><Link to="/databases/">Databases</Link></li>
      <li><Link to="/">Synergy Scores</Link></li>
      <li><Link to="/">Doucumentation</Link></li>
    </ul>
  </StyledNav>
);

export default Home;
