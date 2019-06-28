import React from 'react';
import Plot from 'react-plotly.js';

import colors from '../styles/colors';

export default class Plots extends React.Component {
  // Defining initial state and layout
  constructor(props) {
    super(props);

    this.state = {
      box1: {
        y: null,
        type: 'box',
        name: null,
        marker: { color: colors.color_accent_1 },
      },
      box2: {
        y: null,
        type: 'box',
        name: '',
        marker: { color: colors.color_accent_2 },
      },
      box3: {
        y: null,
        type: 'box',
        name: '',
        marker: { color: colors.color_main_4 },
      },
      layout: {
        height: 600,
        paper_bgcolor: colors.trans_color_main_3,
        plot_bgcolor: colors.trans_color_main_3,
        yaxis: { title: 'FPKM'},
        xaxis: { title: 'Interaction Type'},
        showlegend: false,
        font: {
          size: 16,
          color: '#000000',
          family: 'Raleway'
        },
        title: {
          text: 'One-way ANOVA, p-val=',
          size: 18
        }
      }
    }
  }

  // Methods called on loading
  componentDidMount() {
    //const gene = 'XBP1';
    const { idDrugA, idDrugB, sourceName } = this.props 

    console.log(idDrugA)
    console.log(idDrugB)
    console.log(sourceName)
    // this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'SYN');
    // this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'MOD');
    // this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'ANT');
    // this.fetchANOVAp(idSource, idDrugA, idDrugB, gene);
  }

  // Fetch FPKM values from the database
  fetchFPKM(idSource, idDrugA, idDrugB, gene, interaction) {
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
        gene,
        interaction,
      }),
    })
    .then(response => response.json())
    .then((data) => {
      // Convert JSON array to int array
      let dataProcessed = data.map(item => item.FPKM)
      // if (dataProcessed.length < 3 ) {
      //   dataProcessed = [];
      // }
      // Selecting boxplot to update
      switch(interaction){
        case 'SYN':
          this.setState({
            box1: {
             y: dataProcessed, 
             type: this.state.box1.type,
             name: "Synergy, N=".concat(dataProcessed.length),
             marker: this.state.box1.marker
            }
          })
          break;
        case 'MOD':
          this.setState({
            box2: {
             y: dataProcessed, 
             type: this.state.box2.type,
             name: "Moderate, N=".concat(dataProcessed.length),
             marker: this.state.box2.marker
            }
          })
          break;
        case 'ANT':
          this.setState({
            box3: {
             y: [60, 80, 100],//dataProcessed, 
             type: this.state.box3.type,
             name: "None/Antagonism, N=".concat(dataProcessed.length),
             marker: this.state.box3.marker
            }
          })
          break;
      }
    })
  }

  // Fetch ANOVA p-value from the database
  fetchANOVAp(idSource, idDrugA, idDrugB, gene) {
    fetch('/api/getANOVAp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idSource,
        idDrugA,
        idDrugB,
        gene,
      }),
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        layout: {
          height: 600,
          title: {
            text: 'One-way ANOVA, p-val='.concat(data.p),
            size: this.state.layout.title.size
          },
          plot_bgcolor: this.state.layout.plot_bgcolor,
          paper_bgcolor: this.state.layout.paper_bgcolor,
          font: this.state.layout.font,
          showlegend: this.state.layout.showlegend,
          yaxis: this.state.layout.yaxis,
          xaxis: this.state.layout.xaxis
        }
      })
    })
  }

  // Render this compoenent
  render() {
    const {
      box1, box2, box3, layout,
    } = this.state;
    return (
      <Plot
        data={[
          box1,
          box2,
          box3,
        ]}
        layout={layout}
        graphDiv="graph"
      />
    );
  }
}
