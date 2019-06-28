import React from 'react';
import Plot from 'react-plotly.js';

export default class Plots extends React.Component {
  // Defining initial state and layout
  constructor(props) {
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
        // width: 800,
        // height: 600,
        title: 'A Fancy Plot',
        // paper_bgcolor: '#aaa9a9',
        // plot_bgcolor: '#aaa9a9',
        font: {
          size: 14,
          color: '#000000',
        },
      },
    };
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
