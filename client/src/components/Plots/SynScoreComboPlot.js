/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

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

class SynScoreComboPlot extends React.Component {
  // _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      layout: null,
      loading: true,
      displayPlot: true,
    };
  }

  // Methods called on loading
  componentDidMount() {
    // this._isMounted = true;
    const {
      drugsData, idSource, cellData,
    } = this.context;

    fetch(`/api/combos?drugId1=${drugsData[0].idDrug}&drugId2=${drugsData[1].idDrug}&dataset=${idSource}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((comboData) => {
        if (comboData.length > 1) {
          // bar values
          const synScores = ['Bliss', 'ZIP', 'HSA', 'Loewe'];
          let xBar = [];
          let xScatter = [];
          let sampleNames = [];
          for (let i = 0; i < synScores.length; i += 1) {
            const score = synScores[i].toLowerCase();
            xBar.push(Math.max(...comboData.map(item => item[score])));

            // scatter values
            xScatter.push(comboData.map(item => item[score]));

            // collecting all the sample ids to make hover data
            sampleNames.push(comboData.map(item => item.sampleName));
          }
          xScatter = xScatter.flat();
          sampleNames = sampleNames.flat();

          // Adding more length to each bar value because base offsets
          xBar = xBar.map(item => item + Math.abs(Math.min(...xScatter) - 0.05) + 0.05);

          // making all the bar lengths the same length (max)
          xBar = xBar.fill(Math.max(...xBar));

          // scatter labels
          let yScatter = [];
          synScores.forEach((x) => { yScatter.push(Array(comboData.length).fill(x)); });
          yScatter = yScatter.flat();

          // setting hover data based on value and the cell line name
          const hoverData = [];
          for (let i = 0; i < sampleNames.length; i += 1) {
            hoverData.push(`${sampleNames[i]}: ${xScatter[i]}`);
          }

          // find the indexes of xScatter where I need to highlight the cell line
          const highlight = [];
          comboData.find((item, i) => {
            if (item.idSample === cellData.idSample) {
              for (let j = 0; j < synScores.length; j += 1) {
                // xScatter and yScatter are flattened into bliss bliss
                // ..(to length comboData)..zip zip ....(length comboData)
                highlight.push((j * comboData.length) + i);
              }
            }
          });
          const xHighlight = highlight.map(i => xScatter[i]);
          const yHighlight = highlight.map(i => yScatter[i]);

          // getting the hover data for the highlight
          const highlightHoverData = [];
          for (let i = 0; i < synScores.length; i += 1) {
            highlightHoverData.push(`${cellData.name}: ${xHighlight[i]}`);
          }

          // first a bar chart for the max value, then a scatter for each individual value
          const data = [
            {
              x: xBar,
              base: Math.min(...xScatter) - 0.05,
              y: synScores,
              type: 'bar',
              orientation: 'h',
              hoverinfo: 'skip',
              marker: {
                color: '#4c84b1',
              },
            },
            {
              x: xScatter,
              y: yScatter,
              type: 'scatter',
              mode: 'markers',
              orientation: 'h',
              marker: {
                color: '#efa125', // "#4c84b1",
                symbol: 'line-ns-open',
                size: 37,
              },
              hoverinfo: 'text',
              hovertext: hoverData,
            }, {
              x: xHighlight,
              y: yHighlight,
              type: 'scatter',
              mode: 'markers',
              orientation: 'h',
              marker: {
                color: '#e47070', // "#4c84b1",
                symbol: 'diamond-tall',
                size: 37,
              },
              hoverinfo: 'text',
              hovertext: highlightHoverData,

            }];


          // if (this._isMounted) {
          this.setState({
            loading: false,
            displayPlot: true,
            data,
            layout: {
              height: 450,
              paper_bgcolor: 'white',
              plot_bgcolor: 'white',
              orientation: 'h',
              yaxis: { ticklen: 0 },
              xaxis: { title: `Synergy Score (Cell Lines, N=${comboData.length})`, zeroline: false },
              hovermode: 'closest',
              showlegend: false,
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
        } else {
          this.setState({ loading: false, displayPlot: false });
        }
      });
  }

  static contextType = ComboContext
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  // Render this compoenent
  render() {
    const {
      layout, loading, displayPlot, data,
    } = this.state;

    return displayPlot ? (
      <PlotlyContainer className="cumulative-container">
        { loading
          ? (
            <div className="loading-container">
              <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
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
          )
          }
      </PlotlyContainer>
    ) : null;
  }
}

export default SynScoreComboPlot;
