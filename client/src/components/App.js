import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import SideNav from './SideNav';
import heroImg from '../images/hero-image.jpg';

import Home from './Home';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
`;

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to right top,
    rgba(164, 151, 142, 0.5), 
    rgba(164, 151, 142, 0.5)
  ),
  url(${heroImg});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledWrapper = styled.div`
    display: flex;
`;

const App = () => (
  <Fragment>
    <Normalize />
    <GlobalStyles />
    <StyledApp className="app">
      <header>
        <div className="wrapper" />
      </header>
      <main>
        <StyledWrapper className="wrapper">
          <SideNav />
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
  </Fragment>
);

export default App;
