import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import logo from '../logo.svg';
import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h1>Landing page for SynergxDB</h1>
      </div>
    );
  }
}

export default Home;
