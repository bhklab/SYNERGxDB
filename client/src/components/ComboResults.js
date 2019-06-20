import React, { Component } from 'react';
// import styled from 'styled-components';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';


class ComboResults extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    const { sample, drugId1, drugId2} = this.props

    fetch('/api/getCombos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sample,
        drugId1, 
        drugId2
      }),
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      this.setState({results: data})
    })

  }

  render() {
   
    return <div>Table</div>
  }
}

export default ComboResults;
