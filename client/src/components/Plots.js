import React, { Fragment } from 'react';
import Plot from 'react-plotly.js';

export default class Plots extends React.Component {
  // Defining initial state and layout
  constructor() {
    super();
    this.state = {
      box1: {
        y: [],
        type: 'box',
        name: 'Box 1',
        marker: { color: '#132226' },
      },
      box2: {
        y: [],
        type: 'box',
        name: 'Box 2',
        marker: { color: '#A4978E' },
      },
      box3: {
        y: [],
        type: 'box',
        name: 'Box 3',
        marker: { color: '#BE9063' },
      },
      layout: {
        datarevision: 0,
        width: 640,
        height: 480,
        title: 'A Fancy Plot'
        // paper_bgcolor: 'rgba(82,91,86, 0.5)',
        // plot_bgcolor: 'rgba(82,91,86,0.9)',
        // font: {
        //   //   style: '',
        //   color: '#000000',
        //   size: '16',
        // },
      },
      revision: 0
    };
  }

  // Function defining interval for updating graph with random number
  componentDidMount() {
    setInterval(this.increaseGraphic, 3000);
  }

  // Function for random number generation
  rand = () => {
    const { revision } = this.state;
    parseInt(Math.random() * revision, 10);
  };

  // Function for changing
  increaseGraphic = () => {
    const {
      box1, box2, box3, layout, revision,
    } = this.state;
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
    this.setState({ revision: revision + 1 });
    layout.datarevision = revision + 1;
  }

  render() {
    const {
      box1, box2, box3, layout, revision,
    } = this.state;
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
              box1,
              box2,
              box3,
            ]}
            layout={layout}
            revision={revision}
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
