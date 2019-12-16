/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

import OverviewDoc from './FuncDocs/OverviewDoc';
import SearchDoc from './FuncDocs/SearchDoc';

const StyledAPIDocs = styled.div`
  a {
    font-family: Nunito Sans,sans-serif;
    color: #3a5386;
    font-size: 20px;
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
    </StyledAPIDocs>
  );
};


export default FunctionalDoc;
