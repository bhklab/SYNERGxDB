/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import SampleDoc from './APIDocs/SampleDoc';
import DrugDoc from './APIDocs/DrugDoc';
import DatasetDoc from './APIDocs/DatasetDoc';
import ComboDoc from './APIDocs/ComboDoc';
import BiomarkerDoc from './APIDocs/BiomarkerDoc';

const StyledAPIDocs = styled.div`
  p {
    font-size: 20px;
    font-weight: 400;
  }  
  .code {
    width: 100%;
    background-color: #444444;
    padding: 5px;
    color: #fff;
    margin: 0;
  }
  .output {
    width: 100%;
    background-color: #444444;
    padding: 5px;
    font-size: 15px;
    color: ${colors.color_main_5};
  }
  .api-section {
    width: 100%;
    margin: 10px;
    border-bottom: 2px solid ${colors.trans_color_main_2}

    &.nth-last-of-type {
      border-bottom: none;
    }
  }
`;


const APIDocumentation = (props) => {
  const { display } = props;
  return (
    <StyledAPIDocs>
      <h2>API Documentation</h2>
      <p>SYNERGxDB supports RESTful API which allows users to directly query the database without having to use web app interface</p>
      {display === 'api-cells' ? <SampleDoc /> : null}
      {display === 'api-drugs' ? <DrugDoc /> : null}
      {display === 'api-datasets' ? <DatasetDoc /> : null}
      {display === 'api-combos' ? <ComboDoc /> : null}
      {display === 'api-biomarkers' ? <BiomarkerDoc /> : null}
    </StyledAPIDocs>
  );
};


export default APIDocumentation;
