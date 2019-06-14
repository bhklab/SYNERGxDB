import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import SideNav from './SideNav';
import heroImg from '../images/hero-image.jpg';
import colors from '../styles/colors';

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
      rgba(164, 151, 142, 0.75), 
      rgba(164, 151, 142, 0.75)
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
    margin-top: 30% 0 0;
    font-size: 3em;
    color: ${colors.color_main_2}
  }
  h2 {
    
  }
`;

const StyledApp = styled.div`
  margin: 0 auto;
  padding: 0 25px;
  height: 100vh;
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
    <body>
      <SideNav />
      <StyledApp className="app">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </StyledApp>
    </body>
  </Fragment>
);

export default App;
