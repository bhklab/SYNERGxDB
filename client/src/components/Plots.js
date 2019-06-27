import React, { Fragment } from 'react';
import Plot from 'react-plotly.js';

export default class Plots extends React.Component {
  // Defining initial state and layout
  constructor (props) {
    super(props);

  this.state = {
      box1: {
        y: [],
        type: 'box',
        name: '',
        marker: { color: '#132226' },
      },
      box2: {
        y: [],
        type: 'box',
        name: '',
        marker: { color: '#A4978E' },
      },
      box3: {
        y: [],
        type: 'box',
        name: '',
        marker: { color: '#BE9063' },
      },
      layout: {
        datarevision: 0,
        width: 800,
        height: 600,
        title: 'A Fancy Plot',
        //paper_bgcolor: '#aaa9a9',
        //plot_bgcolor: '#aaa9a9',
        font: {
          size: 14,
          color: '#000000'
        }
      }
    }
  }

  // Methods called on loading
  componentDidMount() {
   const idSource = 2, idDrugA = 18, idDrugB = 96, gene='XBP1'
    // const gene_id='SIDG41212'
    
    this.fetchFPKM(idSource, idDrugA, idDrugB, gene)

  }

  // Fetch FPKM method
  fetchFPKM(idSource, idDrugA, idDrugB, gene) {
    console.log("Fetch call")
    fetch('/api/getFPKM', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idSource,
        idDrugA,
        idDrugB,
        gene
      }),
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
      //   const dataProcessed = data.map(item => item.FPKM)  
      //   console.log("Database call")
      //   console.log(dataProcessed.length)
      //    this.setState({
      //      box1: {
      //       y: dataProcessed, 
      //       type: this.state.box1.type,
      //       name: "Synergy, N=".concat(dataProcessed.length),
      //       marker: this.state.box1.marker
      //     },
      //      box2: {
      //       y: dataProcessed, 
      //       type: this.state.box2.type,
      //       name: "Moderate, N=".concat(dataProcessed.length),
      //       marker: this.state.box2.marker
      //     },
      //     box3: {
      //       y: dataProcessed, 
      //       type: this.state.box3.type,
      //       name: "None or antagonism, N=".concat(dataProcessed.length),
      //       marker: this.state.box3.marker
      //     },
      //  });
    })
  }

  // Fetch p-value method


  // Render this compoenent
  render() {
    // const {
    //   box1, box2, box3, layout
    // } = this.state;
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
              this.state.box3,
            ]}
            layout={this.state.layout}
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
