import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Normalize } from 'styled-normalize';
import TopNav from './TopNav';

import SearchCombos from './SearchCombos';
import CellLines from './CellLines';
import Datasets from './Datasets';
import Drugs from './Drugs';
import Documentation from './Documentation';
import ComboDetails from './ComboDetails';
import ComboResults from './ComboResults';
import Biomarkers from './Biomarkers';
import GlobalStyles from '../styles/GlobalStyles';

import Sensitivity from './Sensitivity';
import Enrichment from './Enrichment';
import Consistency from './Consistency';

const StyledApp = styled.div`
  margin: 0 auto;
  // padding: 12.5vh 0 25px;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;
  min-width: 300px;
  max-width: 1200px;
  overflow-x:hidden;
`;


const App = () => (
  <Fragment>
    <Normalize />
    <GlobalStyles />
    {/* <SideNav /> */}
    <div className="main-wrapper">
      <TopNav />
      <StyledApp className="app">
        <Switch>
          <Route exact path="/" component={SearchCombos} />
          <Route exact path="/cell-lines/" component={CellLines} />
          <Route exact path="/drugs/" component={Drugs} />
          <Route exact path="/datasets/" component={Datasets} />
          <Route exact path="/documentation/" component={Documentation} />
          <Route path="/drug_combo" component={ComboDetails} />
          <Route path="/synergy_score" component={ComboResults} />
          <Route path="/biomarker" component={Biomarkers} />
          <Route path="/sensitivity" component={Sensitivity} />
          <Route path="/enrichment" component={Enrichment} />
          <Route path="/consistency" component={Consistency} />
        </Switch>
      </StyledApp>
    </div>
  </Fragment>
);

export default App;
