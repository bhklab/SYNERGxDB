import React from 'react';
import styled from 'styled-components';
import SingleAgentPlot from './Plots/SingleAgentPlot';

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

const SingleAgents = () => (
  <StyledContainer>
    <h2>Single-agents</h2>
    <PlotContainer>
      <SingleAgentPlot drugA />
      <SingleAgentPlot drugA={false} />
    </PlotContainer>
  </StyledContainer>
);

export default SingleAgents;
