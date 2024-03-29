import React, {
  Fragment, lazy, Suspense, useEffect,
} from 'react';
import ReactGA from 'react-ga';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Normalize } from 'styled-normalize';
import TopNav from './TopNav';
import GlobalStyles from '../styles/GlobalStyles';
import SearchCombos from './SearchCombos';

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
  order:2;
  z-index:1;
`;


const CellLines = lazy(() => import('./CellLines'));
const Drugs = lazy(() => import('./Drugs'));
const Datasets = lazy(() => import('./Datasets'));
const Documentation = lazy(() => import('./Documentation/MainDocument'));
const Pharmacogenomics = lazy(() => import('./Pharmacogenomics/Main'));
const ComboResults = lazy(() => import('./ComboResults'));
const ComboDetails = lazy(() => import('./ComboDetails/ComboDetails'));
const Biomarkers = lazy(() => import('./Biomarkers/BiomarkersMain'));
const Sensitivity = lazy(() => import('./Sensitivity'));
const Enrichment = lazy(() => import('./Enrichment'));
const Consistency = lazy(() => import('./Consistency'));
const Contact = lazy(() => import('./Contact'));
const CompareDatasets = lazy(() => import('./CompareDatasets'));

const App = () => {
  // Google analytics setup.
  useEffect(() => {
    ReactGA.initialize('UA-102362625-3');
    // To Report Page View
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Fragment>
      <Normalize />
      <GlobalStyles />
      <div className="main-wrapper">
        <StyledApp className="app">
          <Switch>
            <Suspense fallback={<div />}>
              <Route exact path="/" component={SearchCombos} />
              <Route exact path="/cell-lines/" component={CellLines} />
              <Route exact path="/drugs/" component={Drugs} />
              <Route exact path="/datasets/" component={Datasets} />
              <Route exact path="/datasets/comparison" component={CompareDatasets} />
              <Route exact path="/documentation/" component={Documentation} />
              <Route exact path="/pharmacogenomics/" component={Pharmacogenomics} />
              <Route exact path="/contact/" component={Contact} />
              <Route path="/synergy_score" component={ComboResults} />
              <Route path="/drug_combo" component={ComboDetails} />
              <Route path="/biomarker" component={Biomarkers} />
              <Route path="/sensitivity" component={Sensitivity} />
              <Route path="/enrichment" component={Enrichment} />
              <Route path="/consistency" component={Consistency} />
            </Suspense>
          </Switch>
        </StyledApp>
      </div>
      <TopNav />
    </Fragment>
  );
};


export default App;
