import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import logo from '../images/logo-2.png';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

const StyledNav = styled.div`  
  width: 100%;
  white-space: nowrap;
  height: 85px;
  background-color: ${colors.nav_bg};
  position: fixed;
  font-size: calc(1em + 0.2vw);
  font-family: 'Montserrat', sans-serif;

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
    height: inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;
   
    @media (max-width : 1279px) {
      display: none;
    }
  }

  .burger-nav {
    a {
      padding: 0em 2.5vw;
    }
    @media (min-width : 1280px) {
      display: none;
    }
    @media (max-width : 1279px) {
      display: block;
    }
  }

  .top-nav {
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: calc(100vw/25);
  }

  .feedback {
    background-color: ${colors.nav_link_hov};
    padding: 10px;
    border-radius: 5px;
    opacity: 0.9;

    :hover {
      opacity: 1.0;
    }
  }

  .feedback > a {
    color: ${colors.nav_links} !important;
  }

  @media (max-width : 1279px) {
    height: 75px;
  }

  @media (max-height : 900px) {
    font-size: calc(0.2vw + 0.9em);
    height: 70px;
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
          <div>
            <Link to="/">
              <StyledLogo src={logo} alt="logo" />
            </Link>
          </div>
          <div>
            <nav className="top-nav">
              <Link to="/documentation/">Documentation</Link>
              <Link to="/cell-lines/">Cell lines</Link>
              <Link to="/drugs/">Compounds</Link>
              <Link to="/datasets/">Datasets</Link>
              <Link to="/pharmacogenomics/">Pharmacogenomics</Link>
              <Link to="/contact/">Contact Us</Link>
            </nav>
          </div>
          <div className="feedback">
            <Link to="/contact/">Feedback</Link>
          </div>
        </div>
        <div role="presentation" className="burger-nav" onClick={() => closeMenu()}>
          <Menu
            styles={BurgerMenuStyles}
            right
            isOpen={menuOpen}
            onStateChange={state => handleStateChange(state)}
          >
            <Link
              to="/"
            >
              <StyledLogo src={logo} alt="logo" />
            </Link>
            <Link
              to="/documentation/"
            >
              Documentation
            </Link>
            <Link
              to="/cell-lines/"
            >
              Cell lines
            </Link>
            <Link
              to="/drugs/"
            >
              Compounds
            </Link>
            <Link
              to="/datasets/"
            >
              Datasets
            </Link>
            <Link
              to="/pharmacogenomics/"
            >
              Pharmacogenomics
            </Link>
            <Link
              to="/contact/"
            >
              Contact Us
            </Link>
            <Link
              to="/contact/"
            >
              Feedback
            </Link>
          </Menu>
        </div>
      </StyledNav>
    );
  }
}


export default TopNav;
