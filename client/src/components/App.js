import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import SideNav from './SideNav';
import heroImg from '../images/hero-image.jpg';
import colors from '../styles/colors';

import Home from './Home';
import CellLines from './CellLines';
import Databases from './Databases';
import Drugs from './Drugs';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    line-height: 1.15;
  }
  ul {
    padding: 0;
    list-style: none;
  }
  li {
    text-decoration: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
  img {
    width: 100%;
    max-width: 100%;
    display: block;
  }
  h1 {
    margin-top: 30% 0 0;
    font-size: 3em;
    color: ${colors.color_main_2}
  }
  main {
    width: 100%;
  }
  table {
    max-width: 100%
  }
  .main-wrapper {
    width: calc(100% - 300px);
    margin-left: 300px; 
  }
  #root {
    width: 100vw;
    display: flex;
    background: linear-gradient(
      to right top,
      rgba(220, 220, 220, 0.75), 
      rgba(220, 220, 220, 0.75)
    ),
    url(${heroImg});
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    flex-wrap: wrap;
  }
`;

const StyledApp = styled.div`
  margin: 0 auto;
  padding: 0 25px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  min-width: 300px;
  max-width: 800px;
`;

const App = () => (
  <Fragment>
    <Normalize />
    <GlobalStyles />
    <SideNav />
    <div className="main-wrapper">
      <StyledApp className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cell-lines/" component={CellLines} />
          <Route exact path="/drugs/" component={Drugs} />
          <Route exact path="/databases/" component={Databases} />
        </Switch>
      </StyledApp>
    </div>
  </Fragment>
);

export default App;
