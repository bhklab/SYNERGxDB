import React, { Component } from 'react';
import SearchCombos from './SearchCombos';
import SideNav from './SideNav';
import '../styles/Home.css';

const Home = () => (

  <div className="home">
    <h1>Landing page for SynergxDB</h1>
    <SearchCombos />
    <SideNav />
  </div>
);

export default Home;
