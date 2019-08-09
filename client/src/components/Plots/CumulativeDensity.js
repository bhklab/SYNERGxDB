/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import Loading from 'react-loading-components';

import colors from '../../styles/colors';
import { ComboContext } from '../Context/ComboContext';


const PlotlyContainer = styled.div`
    min-height: 450px;
    padding-bottom: 10px;
    border-bottom: 2px solid ${colors.color_main_3};
    margin-bottom: 10px;
    display: flex;
    flex-direction: column; 
`;

class CumulativeDensity extends React.Component {
  static contextType = ComboContext

  constructor(props) {
    super(props);
    this.state = {
      bliss: {},
      loewe: {},
      hsa: {},
      zip: {},
      layout: {},
      loading: true,
    };
  }

  // Methods called on loading
  componentDidMount() {
    const {
      drugsData, comboId, idSource, cellData,
    } = this.context;
    const scatterSize = 10;

    fetch(`/api/combos?drugId1=${drugsData[0].idDrug}&drugId2=${drugsData[1].idDrug}&dataset=${idSource}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((comboData) => {
        const generateCoordinates = (data, type) => {
          const outputCoordinates = {};
          const rawData = data.filter(item => (item[type] !== null));
          const sortedData = rawData.sort(
            (a, b) => (a[type] > b[type] ? 1 : a[type] < b[type] ? -1 : 0),
          );
          let value = null;
          sortedData.some((item, index) => {
            if (item.comboId === comboId) {
              value = item[type];
              outputCoordinates.x = item[type];
            }
            // Checks for last item that had same synergy score to define y axis
            // value !== null instead of value is used to avoid scenerios when value might be zero
            if (value !== null && value !== item[type]) {
              outputCoordinates.y = (index) / (sortedData.length - 1);
              return true;
            }
            return false;
          });
          return outputCoordinates;
        };

        const blissCoordinates = generateCoordinates(comboData, 'bliss');
        const zipCoordinates = generateCoordinates(comboData, 'zip');
        const hsaCoordinates = generateCoordinates(comboData, 'hsa');
        const loeweCoordinates = generateCoordinates(comboData, 'loewe');

        this.setState({
          loading: false,
          bliss: {
            x: comboData.map(item => item.bliss),
            nbinsx: comboData.length,
            histnorm: 'probability',
            name: 'Bliss',
            opacity: 0.35,
            type: 'histogram',
            cumulative: { enabled: true },
            marker: { color: colors.color_main_2 },
            legendgroup: 'bliss',
          },
          blissMarker: {
            x: [blissCoordinates.x],
            y: [blissCoordinates.y],
            name: `${cellData.name} Bliss`,
            marker: { color: colors.color_main_2, size: scatterSize },
            showlegend: false,
            mode: 'markers',
            type: 'scatter',
            legendgroup: 'bliss',
          },
          loewe: {
            x: comboData.map(item => item.loewe),
            nbinsx: comboData.length,
            histnorm: 'probability',
            name: 'Loewe',
            opacity: 0.35,
            type: 'histogram',
            cumulative: { enabled: true },
            marker: { color: colors.color_main_1 },
            visible: 'legendonly',
            legendgroup: 'loewe',
          },
          loeweMarker: {
            x: [loeweCoordinates.x],
            y: [loeweCoordinates.y],
            name: `${cellData.name} Loewe`,
            showlegend: false,
            marker: { color: colors.color_main_1, size: scatterSize },
            mode: 'markers',
            type: 'scatter',
            visible: 'legendonly',
            legendgroup: 'loewe',
          },
          hsa: {
            x: comboData.map(item => item.hsa),
            nbinsx: comboData.length,
            histnorm: 'probability',
            name: 'HSA',
            type: 'histogram',
            opacity: 0.35,
            cumulative: { enabled: true },
            marker: { color: colors.color_main_4 },
            visible: 'legendonly',
            legendgroup: 'hsa',
          },
          hsaMarker: {
            x: [hsaCoordinates.x],
            y: [hsaCoordinates.y],
            showlegend: false,
            name: `${cellData.name} HSA`,
            marker: { color: colors.color_main_4, size: scatterSize },
            mode: 'markers',
            type: 'scatter',
            visible: 'legendonly',
            legendgroup: 'hsa',
          },
          zip:
            {
              x: comboData.map(item => item.zip),
              nbinsx: comboData.length,
              histnorm: 'probability',
              type: 'histogram',
              name: 'ZIP',
              opacity: 0.35,
              cumulative: { enabled: true },
              marker: { color: colors.color_main_5 },
              legendgroup: 'zip',
            },
          zipMarker: {
            x: [zipCoordinates.x],
            y: [zipCoordinates.y],
            showlegend: false,
            name: `${cellData.name} ZIP`,
            marker: { color: colors.color_main_5, size: scatterSize },
            mode: 'markers',
            type: 'scatter',
            legendgroup: 'zip',
          },
          layout: {
            height: 450,
            paper_bgcolor: 'white',
            plot_bgcolor: 'white',
            yaxis: { title: 'Cumulative density' },
            xaxis: { title: `Synergy Score (Cell Lines, N=${comboData.length})` },
            barmode: 'overlay',
            font: {
              size: 16,
              color: colors.nav_links,
              family: 'Raleway',
            },
            title: {
              text: `${drugsData[0].name} * ${drugsData[1].name}`,
              size: 18,
            },
          },
        });
      });
  }

  // Render this compoenent
  render() {
    const {
      bliss, loewe, hsa, zip, blissMarker, loeweMarker,
      hsaMarker, zipMarker, layout, loading,
    } = this.state;
    const data = [zipMarker, zip, bliss, blissMarker, loewe, loeweMarker, hsa, hsaMarker];
    // const data = [bliss, loewe, hsa, zip];
    // const data = [bliss, blissMarker, loewe, loeweMarker, hsa, hsaMarker];
    return (
      <PlotlyContainer className="cumulative-container">
        { loading
          ? (
            <div className="loading-container">
              <Loading type="ball_triangle" width={100} height={100} fill={colors.color_main_2} />
            </div>
          )
          : (
            <Plot
              data={data}
              layout={layout}
              graphDiv="graph"
              config={{
                responsive: true,
                displayModeBar: false,
              }}
            />
          ) }
      </PlotlyContainer>
    );
  }
}

export default CumulativeDensity;
