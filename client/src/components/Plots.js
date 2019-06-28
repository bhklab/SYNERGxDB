import React from 'react';
import Plot from 'react-plotly.js';

export default class Plots extends React.Component {
  // Defining initial state and layout
  constructor(props) {
    super(props);

    this.state = {
      box1: {
        y: null,
        type: 'box',
        name: null,
        marker: { color: '#fb2b06' },
      },
      box2: {
        y: null,
        type: 'box',
        name: '',
        marker: { color: '#be9063' },
      },
      box3: {
        y: null,
        type: 'box',
        name: '',
        marker: { color: '#595959' },
      },
      layout: {
        width: 1000,
        height: 800,
        title: null,
        paper_bgcolor: 'f0f0f0',
        plot_bgcolor: '#f0f0f0',
        yaxis: { title: 'FPKM'},
        xaxis: { title: 'Interaction Type'},
        font: {
          size: null,
          color: null
        }
      }
    }
  }

  // Methods called on loading
  componentDidMount() {
    const idSource = 2; const idDrugA = 18; const idDrugB = 96; const
      gene = 'XBP1';

    this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'SYN');
    this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'MOD');
    this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'ANT');
    this.fetchANOVAp(idSource, idDrugA, idDrugB, gene);
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
<<<<<<< HEAD
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
=======
      .then(response => response.json())
      .then((data) => {
        const {
          box1, box2, box3,
        } = this.state;
        // Convert JSON array to int array
        let dataProcessed = data.map(item => item.FPKM);
        if (dataProcessed.length < 3) {
          dataProcessed = [];
        }
        // Selecting boxplot to update
        // eslint-disable-next-line default-case
        switch (interaction) {
          case 'SYN':
            this.setState({
              box1: {
                y: dataProcessed,
                type: box1.type,
                name: 'Synergy, N='.concat(dataProcessed.length),
                marker: box1.marker,
              },
            });
            break;
          case 'MOD':
            this.setState({
              box2: {
                y: dataProcessed,
                type: box2.type,
                name: 'Moderate, N='.concat(dataProcessed.length),
                marker: box2.marker,
              },
            });
            break;
          case 'ANT':
            this.setState({
              box3: {
                y: dataProcessed,
                type: box3.type,
                name: 'None/Antagonism, N='.concat(dataProcessed.length),
                marker: box3.marker,
              },
            });
            break;
        }
      });
>>>>>>> master
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
<<<<<<< HEAD
    .then(response => response.json())
    .then((data) => {
      this.setState({
        layout: {
          width: 1000,
          height: 800,
          title: 'One-way ANOVA, p-val='.concat(data.p),
          font: {
            size: 18,
            color: '#000000',
            family: 'Raleway'
          },
          plot_bgcolor: this.state.layout.plot_bgcolor,
          paper_bgcolor: this.state.layout.paper_bgcolor,
          yaxis: { title: 'FPKM'},
          xaxis: { title: 'Interaction Type'}
        }
      })
    })
=======
      .then(response => response.json())
      .then((data) => {
        this.setState({
          layout: {
            width: 1000,
            height: 800,
            title: 'One-way ANOVA, p-val='.concat(data.p),
            font: {
              size: 14,
              color: '#000000',
            },
            yaxis: { title: 'FPKM' },
            xaxis: { title: 'Interaction Type' },
          },
        });
      });
>>>>>>> master
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
