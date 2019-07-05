/* eslint-disable react/prop-types */
import React from 'react';
import Plot from 'react-plotly.js';

import colors from '../styles/colors';

export default class BiomarkerPlot extends React.Component {
  // Defining initial state and layout
  constructor(props) {
    super(props);

    this.state = {
      box1: {
        y: null,
        type: 'box',
        name: '',
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
        height: 450,
        paper_bgcolor: colors.trans_color_main_3,
        plot_bgcolor: colors.trans_color_main_3,
        yaxis: { title: 'FPKM' },
        xaxis: { title: 'Interaction Type' },
        showlegend: false,
        font: {
          size: 16,
          color: '#000000',
          family: 'Raleway',
        },
        title: {
          text: 'One-way ANOVA, p-val=',
          size: 18,
        },
      },
    };
  }

  // Methods called on loading
  componentDidMount() {
    const {
      idDrugA, idDrugB, idSource, gene, pValue,
    } = this.props;
    this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'SYN');
    this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'MOD');
    this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'ANT');
    this.setPValue(pValue);
  }


  componentDidUpdate(prevProps) {
    const {
      gene, idSource, idDrugA, idDrugB, pValue,
    } = this.props;
    // Always check if new props are different before updating state to avoid infinite loops
    // idDrugA and idDrugB are not gonna change, we just need check for gene and idSource
    if (gene !== prevProps.gene || idSource !== prevProps.idSource) {
      this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'SYN');
      this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'MOD');
      this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'ANT');
      this.setPValue(pValue);
    }
  }


  setPValue(pValue) {
    const { layout } = this.state;
    this.setState({
      layout: {
        height: 450,
        title: {
          text: `One-way ANOVA, p-val=${pValue}`,
          size: layout.title.size,
        },
        plot_bgcolor: layout.plot_bgcolor,
        paper_bgcolor: layout.paper_bgcolor,
        font: layout.font,
        showlegend: layout.showlegend,
        yaxis: layout.yaxis,
        xaxis: layout.xaxis,
      },
    });
  }

  // Fetch FPKM values from the database
  fetchFPKM(idSource, idDrugA, idDrugB, gene, interaction) {
    const { box1, box2, box3 } = this.state;
    fetch('/api/biomarkers/fpkm', {
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
        const dataProcessed = data.map(item => item.FPKM);
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

  // Render this compoenent
  render() {
    const {
      box1, box2, box3, layout,
    } = this.state;
    return <Plot data={[box1, box2, box3]} layout={layout} graphDiv="graph" config={{ responsive: true }} />;
  }
}
