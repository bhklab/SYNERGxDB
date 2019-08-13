import React, { Component } from 'react';
import styled from 'styled-components';
import SingleAgentPlot from './Plots/SingleAgentPlot';

import { ComboContext } from './Context/ComboContext';

import colors from '../styles/colors';

const StyledContainer = styled.div`
    padding-bottom: 10px;
    border-bottom: 2px solid ${colors.color_main_3};
    margin-bottom: 10px;
`;

const PlotContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 510px;
    padding: 0;
    margin: 20px 0;
`;

class SingleAgents extends Component {
  static contextType = ComboContext

  constructor() {
    super();
    this.state = {
      monoData: [],
      loading: true,
    };
  }

  componentDidMount() {
    console.log(this.context);

    const { drugsData, idSource, idSample } = this.context;
    fetch(`/api/drugs/mono?drugId1=${drugsData[0].idDrug}&drugId2=${drugsData[1].idDrug}&idSource=${idSource}&idSample=${idSample}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((monoData) => {
        console.log(monoData);
        this.setState({ monoData, loading: false });
      });
  }

  render() {
    return (
      <StyledContainer>
        <h2>Single-agents</h2>
        <PlotContainer>
          <SingleAgentPlot drugA />
          <SingleAgentPlot drugA={false} />
        </PlotContainer>
      </StyledContainer>
    );
  }
}

export default SingleAgents;
