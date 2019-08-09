/* eslint-disable no-nested-ternary */
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ComboContext } from '../Context';

// import colors from '../../styles/colors';

const StyledDiv = styled.div`
    grid-column: 1;
    height: 250px;
`;

class SingleDrugInhibitionPlot extends React.Component {
  static contextType = ComboContext

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      layout: {},
    };
  }

  componentDidMount() {
    const { drugA } = this.props;
    const { synergyData, cellData, drugsData } = this.context;
    const monoDrugData = synergyData.filter(item => (drugA ? item.concB === 0 : item.concA === 0));
    monoDrugData.shift();
    const inhibData = monoDrugData.map(item => 100 - item.raw_matrix * 100);
    const concData = monoDrugData.map(item => (drugA ? item.concA : item.concB));
    console.log(this.context);
    const drugName = drugA ? drugsData[0].name : drugsData[1].name;
    const data = [{
      type: 'scatter',
      x: concData,
      y: inhibData,
      line: { shape: 'spline', smoothing: 1.3 },
    }];
    const layout = {
      title: `${cellData.name} treated with ${drugName}`,
      autosize: true,
      height: 250,
      margin: {
        l: 40,
        r: 0,
        t: 30,
        b: 40,
      },
      xaxis: {
        title: 'Concentration (µM)',
        type: 'log',
        tickmode: 'array',
        tickvals: concData,
        ticktext: concData,
      },
      yaxis: {
        title: 'Inhibtion',
      },
    };
    this.setState({ data, layout });
  }

  // Render this compoenent
  render() {
    const { data, layout } = this.state;
    return (
      <StyledDiv>
        <Plot
          graphDiv="graph"
          config={{
            responsive: true,
            displayModeBar: false,
          }}
          data={data}
          layout={layout}
        />
      </StyledDiv>
    );
  }
}

SingleDrugInhibitionPlot.propTypes = {
  drugA: PropTypes.bool.isRequired,
};

export default SingleDrugInhibitionPlot;
