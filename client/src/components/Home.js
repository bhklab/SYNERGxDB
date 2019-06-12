import React, { Component } from 'react';
import SearchCombos from './SearchCombos';
import '../styles/Home.css';

const Home = () => (
  <div className="home">
    <h1>Landing page for SynergxDB</h1>
    <SearchCombos />
  </div>
);

export default Home;
