import React, { Component } from 'react';
import styled from 'styled-components';
import '../styles/colors';

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 30%
  background-color: rgba(190, 144, 99, 0.75);
`;

const Home = () => (

  <StyledNav className="side-nav">
    <ul>
      <li><a href="#">Cell lines</a></li>
      <li><a href="#">Drugs</a></li>
      <li><a href="#">Databases</a></li>
      <li><a href="#">Synergy Scores</a></li>
      <li><a href="#">Drug Response Curves</a></li>
      <li><a href="#">Download</a></li>
    </ul>
  </StyledNav>
);

export default Home;
