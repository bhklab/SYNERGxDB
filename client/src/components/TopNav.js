import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import logo from '../images/logo.png';
import logo from '../images/logo-2.png';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

const StyledNav = styled.nav`
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
    padding-right:320px; // centers the links

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

    .logo {
        position:relative;
        float:left;
        margin-left:50px;
        margin-top:-5px;

    }
  
`;
const StyledLogo = styled.img`
    width:150px;
`;

const Home = () => (

  <StyledNav className="top-nav">
    <Link to="/"><StyledLogo src={logo} alt="logo" className="logo" /></Link>
    {/* <Link to="/">Synergy Scores</Link> */}
    <Link to="/documentation/">Documentation</Link>
    <Link to="/cell-lines/">Cell lines</Link>
    <Link to="/drugs/">Compounds</Link>
    <Link to="/datasets/">Datasets</Link>
    
  </StyledNav>
);

export default Home;
