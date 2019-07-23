import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
// import styled from 'styled-components';

import colors from '../../styles/colors';

// const CumulativeContainer = styled.div`
//   width: 1000px;
// `;

class CumulativeDensity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comboData: [],
      bliss: {},
      loewe: {},
      hsa: {},
      zip: {},
      layout: {},
    };
  }

  // Methods called on loading
  componentDidMount() {
    const {
      drug1, drug2, comboId, sample, idSource,
    } = this.props;

    fetch(`/api/combos?drugId1=${drug1.idDrug}&drugId2=${drug2.idDrug}&dataset=${idSource}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((comboData) => {
        const { length } = comboData;
        const blissSortedData = comboData.sort((a, b) => (a.bliss > b.bliss ? 1 : -1));
        const blissCoordinates = {};
        blissSortedData.some((item, index) => {
          if (item.comboId === comboId) {
            blissCoordinates.x = item.bliss;
            blissCoordinates.y = index / (length - 1);
            return true;
          }
          return false;
        });
        const loeweSortedData = comboData.sort((a, b) => (a.loewe > b.loewe ? 1 : -1));
        const loeweCoordinates = {};
        loeweSortedData.some((item, index) => {
          if (item.comboId === comboId) {
            loeweCoordinates.x = item.loewe;
            loeweCoordinates.y = index / (length - 1);
            return true;
          }
          return false;
        });
        const hsaSortedData = comboData.sort((a, b) => (a.hsa > b.hsa ? 1 : -1));
        const hsaCoordinates = {};
        hsaSortedData.some((item, index) => {
          if (item.comboId === comboId) {
            hsaCoordinates.x = item.hsa;
            hsaCoordinates.y = index / (length - 1);
            return true;
          }
          return false;
        });
        const zipSortedData = comboData.sort((a, b) => (a.zip > b.zip ? 1 : -1));
        const zipCoordinates = {};
        zipSortedData.some((item, index) => {
          if (item.comboId === comboId) {
            zipCoordinates.x = item.zip;
            zipCoordinates.y = index / (length - 1);
            return true;
          }
          return false;
        });
        this.setState({
          comboData,
          bliss: {
            x: comboData.map(item => item.bliss),
            nbinsx: comboData.length,
            histnorm: 'probability',
            name: 'Bliss',
            opacity: 0.5,
            type: 'histogram',
            cumulative: { enabled: true },
            marker: { color: colors.color_main_2 },
            legendgroup: 'bliss',
          },
          blissMarker: {
            x: [blissCoordinates.x],
            y: [blissCoordinates.y],
            showlegend: false,
            name: `${sample} Bliss`,
            marker: { color: colors.color_main_2, size: 15 },
            mode: 'markers',
            type: 'scatter',
            legendgroup: 'bliss',
          },
          loewe: {
            x: comboData.map(item => item.loewe),
            nbinsx: comboData.length,
            histnorm: 'probability',
            name: 'Loewe',
            opacity: 0.5,
            type: 'histogram',
            cumulative: { enabled: true },
            marker: { color: colors.color_main_1 },
            visible: 'legendonly',
            legendgroup: 'loewe',
          },
          loeweMarker: {
            x: [loeweCoordinates.x],
            y: [loeweCoordinates.y],
            name: `${sample} Loewe`,
            showlegend: false,
            marker: { color: colors.color_main_1, size: 15 },
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
            opacity: 0.5,
            cumulative: { enabled: true },
            marker: { color: colors.color_main_4 },
            visible: 'legendonly',
            legendgroup: 'hsa',
          },
          hsaMarker: {
            x: [hsaCoordinates.x],
            y: [hsaCoordinates.y],
            showlegend: false,
            name: `${sample} HSA`,
            marker: { color: colors.color_main_4, size: 15 },
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
              opacity: 0.5,
              cumulative: { enabled: true },
              marker: { color: colors.color_main_5 },
              legendgroup: 'zip',
            },
          zipMarker: {
            x: [zipCoordinates.x],
            y: [zipCoordinates.y],
            showlegend: false,
            name: `${sample} ZIP`,
            marker: { color: colors.color_main_5, size: 15 },
            mode: 'markers',
            type: 'scatter',
            legendgroup: 'zip',
          },
          layout: {
            height: 450,
            paper_bgcolor: colors.trans_color_main_3,
            plot_bgcolor: colors.trans_color_accent_2,
            yaxis: { title: 'Cumulative density' },
            xaxis: { title: `Synergy Score (Cell Lines, N=${length})` },
            barmode: 'overlay',
            font: {
              size: 16,
              color: '#000000',
              family: 'Raleway',
            },
            title: {
              text: `${drug1.name} * ${drug2.name}`,
              size: 18,
            },
          },
        });
      });
  }

  // Render this compoenent
  render() {
    const {
      bliss, loewe, hsa, zip, blissMarker, loeweMarker, hsaMarker, zipMarker, layout, comboData,
    } = this.state;
    const data = [zipMarker, zip, bliss, blissMarker, loewe, loeweMarker, hsa, hsaMarker];
    // const data = [bliss, loewe, hsa, zip];
    // const data = [bliss, blissMarker, loewe, loeweMarker, hsa, hsaMarker];
    return (
      <div className="cumulative-container">
        {comboData.length > 0 ? (
          <Plot
            data={data}
            layout={layout}
            graphDiv="graph"
            config={{ responsive: true }}
            onLegendClick={e => console.log(e)}
          />
        ) : null}
      </div>
    );
  }
}

CumulativeDensity.propTypes = {
  drug1: PropTypes.shape({
    name: PropTypes.string,
    idDrug: PropTypes.number,
  }).isRequired,
  drug2: PropTypes.shape({
    name: PropTypes.string,
    idDrug: PropTypes.number,
  }).isRequired,
  comboId: PropTypes.number.isRequired,
  sample: PropTypes.string.isRequired,
  idSource: PropTypes.number.isRequired,
};

export default CumulativeDensity;
