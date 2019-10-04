import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import logo from '../images/logo-2.png';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

const StyledNav = styled.div`
  .top-nav {
    padding: 15px 0px 0px 0px;    
    width: 100%;
    right:0px;
    height:90px;
    line-height:3em;
    white-space:nowrap;
    background-color: ${colors.nav_bg};
    position: fixed;
    font-size: calc(1em + 0.3vw);
    font-family: 'Montserrat', sans-serif;
    z-index: 10;
    text-align: center;

    a {
        color: ${colors.nav_links};
        transition: ${transitions.main_trans}
        font-family: 'Raleway', sans-serif;
        font-weight:700;
        padding:0em 2.5vw;
        

        &:hover {
            color: ${colors.nav_link_hov};
        }
    }
  }
`;

const StyledLogo = styled.img`
    width:150px;
    position:fixed;
    float:left;
    margin-left:5vw;
    margin-top:5px;
    z-index:999;
`;

const TopNav = () => (
  <StyledNav>
    <Link to="/">
      <StyledLogo src={logo} alt="logo" />
    </Link>
    <nav className="top-nav">
      <Link to="/documentation/">Documentation</Link>
      <Link to="/cell-lines/">Cell lines</Link>
      <Link to="/drugs/">Compounds</Link>
      <Link to="/datasets/">Datasets</Link>
    </nav>
    <Menu>
      <Link to="/documentation/">Documentation</Link>
      <Link to="/cell-lines/">Cell lines</Link>
      <Link to="/drugs/">Compounds</Link>
      <Link to="/datasets/">Datasets</Link>
    </Menu>
  </StyledNav>

);

export default TopNav;
