import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import heroImg from '../images/bg-3.jpg';
import transitions from './transitions';

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
    margin: 3rem 0 2rem 0; 
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
    margin-top:150px;
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
  
  .landing {
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    margin-top: 0px;

    @media (max-width: 649px) {
      margin-top: 150px;
    }
  }

  main.summary {
    padding-bottom:30px;
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
    // margin: 10px 0;
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
  
  .biomarkerPlot {
    margin-bottom:20px;
  }
  
  .plot {
    font-family: Nunito Sans, sans-serif;
  }

  .loading-container {
    align-item: center;
    margin: auto;
    width: 150px;
  }

  .app {
    display:flex;
    align-items: center;
    justify-content: center;
  }
  
  .popup-content {
    max-width: 400px;
  }
  
  #cellMiniPlot, #dsetMiniPlot {
    display:flex;
    justify-content: space-around;
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
    display: flex;
    z-index: 0

    .main-wrapper {
      overflow-x:hidden;
    }
  }
  // .ReactTable .-btn {
  //   background: ${colors.color_main_2} !important;
  //   color: white !important;
  // }

  .right {
    text-align: right;
  }
}
`;

export default GlobalStyles;
