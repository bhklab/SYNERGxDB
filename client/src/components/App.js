import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import TopNav from './TopNav';
import heroImg from '../images/bg-3.jpg';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

import SearchCombos from './SearchCombos';
import CellLines from './CellLines';
import Datasets from './Datasets';
import Drugs from './Drugs';
import Documentation from './Documentation';
import ComboDetails from './ComboDetails';
import ComboResults from './ComboResults';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Raleway', sans-serif;
  }
  * {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  }  
  html {
    box-sizing: border-box;
    line-height: 1.15;
  }
  ul {
    padding: 0;
    list-style: none;
  }
  li {
    text-decoration: none;
  }
  a {
    text-decoration: none;
    color: black;
    font-family: 'Raleway', sans-serif;

    &:hover {
      cursor: pointer !important;
    }
  }
  img {
    width: 100%;
    max-width: 100%;
    display: block;
  }
  h1 {
    margin: 3rem 0; 
    font-size: 2em;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: 'Raleway', sans-serif;
    color:${colors.nav_links};
  }
  main {
    width: 100%;
  }
  table {
    max-width: 100%;
    width: 100%;
    table-layout: fixed;
    text-align: left;
    border-spacing: 0;
    margin: 20px 0;
    

    th,
    td {
      overflow: hidden;
      margin: 0;
      padding: 5px;
      color:${colors.nav_links};
      border-bottom: 2px solid ${colors.color_main_1}
    }

    th:nth-child(3),
    th:nth-child(4) {
      max-width: calc(50% - 200px);
    }
    
    td:nth-child(3),
    td:nth-child(4) {
      max-width: 100px;
    }
  }
  p,
  button {
    font-family: 'Raleway', sans-serif;
    font-weight:700;
  }
  
  main.landing {
    position:absolute;
    max-width:1000px;
    top:25%;
  }

  main.summary {
    margin-top:30px;
    padding-bottom:30px;
  }

  main.documentation {
    margin-top:30px;
    background:white;
    font-family: Nunito Sans, sans-serif;
    color:${colors.nav_links};

    h1, h2 {
      padding: 40px 20px 0px 0px;
      margin: 0px 25px 0px 50px;
    }
    
    span {
      padding: 0px 50px;
      font-size: 20px;
    }

    h2 {
      padding:20px 0px;
    }

    // h2::before {
    //   display: inline-block;
    //   content: "";
    //   border-top: 2px solid ${colors.nav_link_hov};
    //   width: 60px;
    //   margin: 50px 5px 0px 0px ;
    //   transform: translateY(-7px);
    // }
  }
  

  .main-wrapper {
    width: 100%;
    overflow-x:hidden;
  }
  .app,
  .js-plotly-plot {
    width: 100%;
  }

  .grid-container {
    width: 100%;  
    display: grid;
    height: auto;

    span {
      padding: 8px 4px;
      overflow: hidden;
    }
  }

  .table-header {
    font-weight: bold;
    border-bottom: 5px double black;
  }
  .score {
    width: 100%;
    text-align: right;
    padding-right: 5px;
  }
  .high-score {
    font-weight: bold;
  }
  .hover {
    color: ${colors.color_main_1}
    transition: ${transitions.main_trans};

    &:hover {
      color: ${colors.color_main_4}
    }
  }
  .react-select__option--is-focused:not(.react-select__option--is-selected) {
    background-color: ${colors.trans_color_main_5};
  }

  .ReactTable {
    width: 100%;
    text-align: left;
    margin: 10px 0;
    color:${colors.nav_links};
    font-family: Nunito Sans, sans-serif;

    .rt-thead.-header,
    .raw-names,
    .header-name {
      box-shadow:none !important;
      font-weight: 700;
      font-size: 18px;
    }

    .rt-thead.-header {
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    

    .pagination-bottom {
      box-shadow:none !important;
    }
    .-pagination {
      box-shadow:none !important;
      border-top:1px solid rgba(0,0,0,0.1) !important;
    }

    .-previous, .-next, .-btn   {
      background: ${colors.pagination};
      color:white !important;
    }

    
    input {
      background: ${colors.summary_bg} !important;
    }
  }
  .wrapper {
    color:${colors.nav_links};
    background:white;
    padding-bottom:20px;
    margin-bottom:30px;
  }

  .footer-wrapper {
    color:${colors.blue_main};
    background:none !important;
  }
  
  #root {
    width: 100vw;
    display: flex;
    background: ${colors.summary_bg};
    background: linear-gradient(
      to right top,
      rgba(255, 255, 255, 0.3), 
      rgba(255, 255, 255, 0.3)
    ),url('${heroImg}');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    flex-wrap: wrap;

    .main-wrapper {
      overflow-x:hidden;
    }

  }

  .plot {
    font-family: Nunito Sans, sans-serif;
  }

  #cellMiniPlot {
    display:flex;
    justify-content: space-around;
  }


`;

const StyledApp = styled.div`
  margin: 0 auto;
  padding: 12.5vh 0 25px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    <div className="main-wrapper ">
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
        </Switch>
      </StyledApp>
    </div>
  </Fragment>
);

export default App;
