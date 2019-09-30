/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import colors from '../../styles/colors';


const PlotlyContainer = styled.div`
    min-height: 450px;
    padding-bottom: 10px;
    border-bottom: 2px solid ${colors.color_main_3};
    margin-bottom: 10px;
    display: flex;
    flex-direction: column; 
`;

class CumulativeDensity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      layout: {
        height: 450,
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        yaxis: { title: 'Synergy Score' },
        xaxis: { title: 'FPKM' },
        font: {
          size: 16,
          color: colors.nav_links,
          family: 'Raleway',
        },
        title: {
          text: `Zip x ${props.selectedBiomarker}`,
          size: 18,
        },
      },
    };
  }

  // Methods called on loading
  componentDidMount() {
    const { biomarkerData } = this.props;

    const scatterSize = 10;
    Object.values(biomarkerData).forEach(item => console.log(item));
    console.log(Object.keys(biomarkerData).map(item => item.fpkm));
    const data = [{
      x: Object.values(biomarkerData).map(item => item.fpkm),
      y: Object.values(biomarkerData).map(item => item.zip),
      name: 'Cell line',
      marker: { color: colors.color_main_2, size: scatterSize },
      showlegend: false,
      mode: 'markers',
      type: 'scatter',
      legendgroup: 'bliss',
    }];
    this.setState({ data });
  }

  render() {
    const {
      data, layout,
    } = this.state;
    return (
      <PlotlyContainer className="cumulative-container">
        <Plot
          data={data}
          layout={layout}
          graphDiv="graph"
          config={{
            responsive: true,
            displayModeBar: false,
          }}
        />
      </PlotlyContainer>
    );
  }
}

export default CumulativeDensity;
