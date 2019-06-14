import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import SideNav from './SideNav';
import heroImg from '../images/hero-image.jpg';
import styles from '../styles/colors';

import Home from './Home';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    line-height: 1.15;
  }
  body {
    width: 100vw;
    display: flex;
    background: linear-gradient(
      to right top,
      rgba(164, 151, 142, 0.5), 
      rgba(164, 151, 142, 0.5)
    ),
    url(${heroImg});
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    flex-wrap: wrap;
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
    font-size: 2em;
  }
`;

const StyledApp = styled.div`
  margin: 0 50px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  min-width: 500px;
`;

const StyledWrapper = styled.div`
  display: flex;
`;

const App = () => (
  <Fragment>
    <Normalize />
    <GlobalStyles />
    <body>
      <SideNav />
      <StyledApp className="app">
        <header>
          <div className="wrapper" />
        </header>
        <main>
          <StyledWrapper className="wrapper">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </StyledWrapper>
        </main>
        <footer>
          <div className="wrapper">
            <p>Copyright © 2019. All rights reserved</p>
          </div>
        </footer>
      </StyledApp>
    </body>
  </Fragment>
);

export default App;
