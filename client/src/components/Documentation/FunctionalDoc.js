/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';
import transitions from '../../styles/transitions';

import OverviewDoc from './FuncDocs/OverviewDoc';
import SearchDoc from './FuncDocs/SearchDoc';
import SynDoc from './FuncDocs/SynDoc';
import SampleDoc from './FuncDocs/SampleDoc';
import DrugDoc from './FuncDocs/DrugDoc';
import DatasetDoc from './FuncDocs/DatasetDoc';
import PharmacoDoc from './FuncDocs/PharmacoDoc';
import BiomarkerDoc from './FuncDocs/BiomarkerDoc';
import SensitivityDoc from './FuncDocs/SensitivityDoc';
import TissueEnrichDoc from './FuncDocs/TissueEnrichDoc';
import ConsistencyDoc from './FuncDocs/ConsistencyDoc';
import DetailedDoc from './FuncDocs/DetailedDoc';
import UseCaseDoc from './FuncDocs/UseCaseDoc';

const StyledAPIDocs = styled.div`
  a {
    font-family: Nunito Sans,sans-serif;
    color: ${colors.color_main_2};
    font-size: 20px;
    transition: ${transitions.main_trans}

    &:hover {
        color: ${colors.color_main_3};
        img {
          background-color: ${colors.color_main_3}
        }
    }
  }
  .doc-img {
    margin: 10px 0;
  }
  .doi {
    width: auto;
    height: 30px;
    margin-top: 30px;
  }
  .zenodo {
    width: 24px;
    padding: 3px;
    background-color: ${colors.color_main_2}
    display: inline-block
    transition: ${transitions.main_trans}
  }
`;

const FunctionalDoc = (props) => {
  const { display } = props;
  return (
    <StyledAPIDocs>
      <h1>SYNERGxDB</h1>
      <h2>Documentation</h2>
      {display === 'overview' ? <OverviewDoc /> : null}
      {display === 'search' ? <SearchDoc /> : null}
      {display === 'syn' ? <SynDoc /> : null}
      {display === 'samples' ? <SampleDoc /> : null}
      {display === 'compounds' ? <DrugDoc /> : null}
      {display === 'datasets' ? <DatasetDoc /> : null}
      {display === 'pharmaco' ? <PharmacoDoc /> : null}
      {display === 'biomarker' ? <BiomarkerDoc /> : null}
      {display === 'sensitivity' ? <SensitivityDoc /> : null}
      {display === 'enrichment' ? <TissueEnrichDoc /> : null}
      {display === 'consistency' ? <ConsistencyDoc /> : null}
      {display === 'detailed' ? <DetailedDoc /> : null}
      {display === 'use' ? <UseCaseDoc /> : null}
    </StyledAPIDocs>
  );
};

FunctionalDoc.propTypes = {
  display: PropTypes.string.isRequired,
};


export default FunctionalDoc;
