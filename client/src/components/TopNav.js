import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import logo from '../images/logo-2.png';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

const StyledNav = styled.div`   
  width: 100%;
  right:0px;
  height:85px;
  line-height:3em;
  order:1;
  white-space:nowrap;
  background-color: ${colors.nav_bg};
  position: fixed;
  white-space:nowrap;
  background-color: ${colors.nav_bg};
  font-size: calc(1em + 0.2vw);
  font-family: 'Montserrat', sans-serif;

  @media (max-width : 1279px) {
    height:75px;
  }

  @media (max-height : 900px) {
    font-size: calc(0.2vw + 0.9em);
    height: 70px;
    line-height: 2.5em;
  }

  a {
    color: ${colors.nav_links};
    transition: ${transitions.main_trans}
    font-family: 'Raleway', sans-serif;
    font-weight:700;
    &:hover {
        color: ${colors.nav_link_hov};
    }
  }

  .standard-nav {
    img {
      position:fixed;
      float:left;
      margin-left:5vw;
      margin-top:5px;
    }
    @media (min-width : 1280px) {
      display: block;
    }
    @media (max-width : 1279px) {
      display: none;
    }
  }
  .burger-nav {
    a {
      padding:0em 2.5vw;
    }
    @media (min-width : 1280px) {
      display: none;
    }
    @media (max-width : 1279px) {
      display: block;
    }
  }
  .top-nav {
    z-index: 10;
    text-align: center;
    padding: 15px 0px 0px 0px;
    margin-left: 175px;
    a {
      padding:0em 2.5vw;
    }
  }
`;

const StyledLogo = styled.img`
  width:150px;
  @media (max-height : 900px) {
      width: 120px;
  }
`;

const BurgerMenuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: 'calc(50% - 18px)',
    top: '23px',
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
    background: 'white',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    Zindex: '999',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
    display: 'flex',
    flexDirection: 'column',
  },
  bmItem: {
    display: 'inline-block',
    outline: 'none',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

class TopNav extends Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { menuOpen } = this.state;
    const { handleStateChange, closeMenu } = this;
    return (
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
            <Link to="/pharmacogenomics/">Pharmacogenomics</Link>
            <Link to="/contact/">Contact Us</Link>
          </nav>
        </div>
        <div className="burger-nav">
          <Menu
            styles={BurgerMenuStyles}
            right
            isOpen={menuOpen}
            onStateChange={state => handleStateChange(state)}
          >
            <Link
              to="/"
              onClick={() => closeMenu()}
            >
              <StyledLogo src={logo} alt="logo" />
            </Link>
            <Link
              to="/documentation/"
              onClick={() => closeMenu()}
            >
              Documentation
            </Link>
            <Link
              to="/cell-lines/"
              onClick={() => closeMenu()}
            >
              Cell lines
            </Link>
            <Link
              to="/drugs/"
              onClick={() => closeMenu()}
            >
              Compounds
            </Link>
            <Link
              to="/datasets/"
              onClick={() => closeMenu()}
            >
              Datasets
            </Link>
            <Link
              to="/pharmacogenomics/"
              onClick={() => closeMenu()}
            >
              Pharmacogenomics
            </Link>
            <Link
              to="/contact/"
              onClick={() => closeMenu()}
            >
              Contact Us
            </Link>
          </Menu>
        </div>
      </StyledNav>
    );
  }
}


export default TopNav;
