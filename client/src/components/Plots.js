import React, { Fragment } from 'react';
import Plot from 'react-plotly.js';

export default class Plots extends React.Component {
  // Defining initial state
  state = {
    box1: {
      y: [],
      type: 'box', 
      name: 'Box 1'
    },
    box2: {
      y: [],
      type: 'box',
      name: 'Box 2'
    },     
    box3: {
      y: [],
      type: 'box',
      name: 'Box 3'
    }, 
    layout: { 
      datarevision: 0,
      width: 640,
      height: 480,
      title: 'A Fancy Plot'
    },
    revision: 0,
  }
  // Function defining interval for updating graph with random number
  componentDidMount() {
    setInterval(this.increaseGraphic, 3000);
  } 
  // Function for random number generation
  rand = () => parseInt(Math.random() * 10 + this.state.revision, 10);
  // Function for changing
  increaseGraphic = () => {
    const { box1, box2, box3, layout } = this.state;
    box1.y.push(this.rand());
    if (box1.y.length >= 10) {
      box1.y.shift();
    } 
    box2.y.push(this.rand());
    if (box2.y.length >= 10) {
      box2.y.shift();
    }
    box3.y.push(this.rand());
    if (box3.y.length >= 10) {
      box3.y.shift();
    }
    this.setState({ revision: this.state.revision + 1 });
    layout.datarevision = this.state.revision + 1;
  }
  render() {  
    return (
  <Fragment>
    <header>
      <div className="wrapper">
        <h1>SYNERGxDB</h1>
      </div>
    </header>
    <main>
    <Plot
        data={[
          this.state.box1,
          this.state.box2,
          this.state.box3
        ]}
        layout={this.state.layout}
        revision={this.state.revision}
        graphDiv="graph"
      />
    </main>
    <footer>
      <div className="wrapper">
        <p>Copyright © 2019. All rights reserved</p>
      </div>
    </footer>
  </Fragment>
    );
  }
}