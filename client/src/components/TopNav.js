import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import logo from '../images/logo-2.png';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

const StyledNav = styled.div`
  // padding: 15px 0px 0px 0px;    
  width: 100%;
  right:0px;
  height:90px;
  line-height:3em;
  white-space:nowrap;
  background-color: ${colors.nav_bg};
  position: fixed;
  .standard-nav {
    img {
      position:fixed;
      float:left;
      margin-left:5vw;
      margin-top:5px;
      z-index:999;
    }
    @media (min-width : 1024px) {
      display: block;
    }
    @media (max-width : 1023px) {
      display: none;
    }
  }
  .burger-nav {
    @media (min-width : 1024px) {
      display: none;
    }
    @media (max-width : 1023px) {
      display: block;
    }
  }
  .top-nav {
    padding: 15px 0px 0px 0px;    
    width: 100%;
    right:0px;
    height:90px;
    line-height:3em;
    white-space:nowrap;
    background-color: ${colors.nav_bg};
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
`;

const BurgerMenuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: 'calc(50% - 18px)',
    top: '36px',
  },
  bmBurgerBars: {
    background: colors.color_main_2,
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: colors.color_main_5,
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    'z-index': '1000',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    display: 'flex',
    'flex-direction': 'column',
  },
  bmItem: {
    display: 'inline-block',
    outline: 'none',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const TopNav = () => (
  <StyledNav>
    <div className="standard-nav">
      <Link to="/">
        <StyledLogo src={logo} alt="logo" />
      </Link>
      <nav className="top-nav">
        <Link to="/documentation/">Documentation</Link>
        <Link to="/cell-lines/">Cell lines</Link>
        <Link to="/drugs/">Compounds</Link>
        <Link to="/datasets/">Datasets</Link>
      </nav>
    </div>
    <div className="burger-nav">
      <Menu styles={BurgerMenuStyles} right>
        <Link to="/">
          <StyledLogo src={logo} alt="logo" />
        </Link>
        <Link to="/documentation/">Documentation</Link>
        <Link to="/cell-lines/">Cell lines</Link>
        <Link to="/drugs/">Compounds</Link>
        <Link to="/datasets/">Datasets</Link>
      </Menu>
    </div>
  </StyledNav>

);

export default TopNav;
