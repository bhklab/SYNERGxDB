import React from 'react';
import styled from 'styled-components';
import SingleDrugInhibitionPlot from './Plots/SingleDrugInhibitionPlot';
import InhibitionHeatMap from './Plots/InhibitionHeatMap';

import colors from '../styles/colors';

const StyledContainer = styled.div`
    padding-bottom: 10px;
    border-bottom: 2px solid ${colors.color_main_3};
    margin-bottom: 10px;
`;

const InhibitionContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    width: 100%;
    height: 510px;
    padding: 0;
    margin: 20px 0;
`;

const SynergisticInhibition = () => (
  <StyledContainer>
    <h2>Synergistic Inhibition</h2>
    <InhibitionContainer>
      <SingleDrugInhibitionPlot drugA />
      <SingleDrugInhibitionPlot drugA={false} />
      <InhibitionHeatMap />
    </InhibitionContainer>
  </StyledContainer>
);

export default SynergisticInhibition;
