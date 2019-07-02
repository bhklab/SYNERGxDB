import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      stats: [],
    };
  }

  componentDidMount() {
    fetch('/api/stats/')
      .then(response => response.json())
      .then((stats) => {
        console.log(stats);
        this.setState({ stats });
      });
  }

  render() {
    const { stats } = this.state;
    return (
      <div className="stats">
          Stats component
      </div>
    );
  }
}


export default Stats;
