(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var styled_normalize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-normalize */ "./node_modules/styled-normalize/dist/index.js");
/* harmony import */ var styled_normalize__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_normalize__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SideNav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SideNav */ "./src/components/SideNav.js");
/* harmony import */ var _images_hero_image_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../images/hero-image.jpg */ "./src/images/hero-image.jpg");
/* harmony import */ var _images_hero_image_jpg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_hero_image_jpg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");
/* harmony import */ var _SearchCombos__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SearchCombos */ "./src/components/SearchCombos.js");
/* harmony import */ var _CellLines__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CellLines */ "./src/components/CellLines.js");
/* harmony import */ var _Datasets__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Datasets */ "./src/components/Datasets.js");
/* harmony import */ var _Drugs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Drugs */ "./src/components/Drugs.js");
/* harmony import */ var _Documentation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Documentation */ "./src/components/Documentation.js");
/* harmony import */ var _ComboDetails__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ComboDetails */ "./src/components/ComboDetails.js");

var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/App.js";

function _templateObject2() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  margin: 0 auto;\n  padding: 0 25px;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  flex-grow: 1;\n  min-width: 300px;\n  max-width: 1200px;\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  body {\n    font-family: 'Raleway', sans-serif;\n  }\n  * {\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  }  \n  html {\n    box-sizing: border-box;\n    line-height: 1.15;\n  }\n  ul {\n    padding: 0;\n    list-style: none;\n  }\n  li {\n    text-decoration: none;\n  }\n  a {\n    text-decoration: none;\n    color: black;\n    font-family: 'Raleway', sans-serif;\n  }\n  img {\n    width: 100%;\n    max-width: 100%;\n    display: block;\n  }\n  h1 {\n    margin: 30% 0 0;\n    font-size: 3em;\n    color: ", ";\n  }\n  h1,\n  h2,\n  h3,\n  h4 {\n    font-family: 'Paytone One', sans-serif;\n  }\n  main {\n    width: 100%;\n  }\n  table {\n    max-width: 100%;\n    width: 100%;\n    table-layout: fixed;\n    text-align: left;\n    border-spacing: 0;\n    margin: 20px 0;\n\n    th,\n    td {\n      overflow: hidden;\n      margin: 0;\n      padding: 5px;\n      border-bottom: 2px solid ", "\n    }\n\n    th:nth-child(3),\n    th:nth-child(4) {\n      max-width: calc(50% - 200px);\n    }\n    \n    td:nth-child(3),\n    td:nth-child(4) {\n      max-width: 100px;\n    }\n  }\n  p,\n  button {\n    font-family: 'Raleway', sans-serif;\n  }\n  \n  .main-wrapper {\n    width: calc(100% - 300px);\n    margin-left: 300px; \n  }\n  .app,\n  .js-plotly-plot {\n    width: 100%;\n  }\n\n  .grid-container {\n    width: 100%;  \n    display: grid;\n    height: auto;\n\n    span {\n      padding: 8px 4px;\n      overflow: hidden;\n    }\n  }\n\n  .table-header {\n    font-weight: bold;\n    border-bottom: 2px solid black;\n  }\n  .high-score {\n    font-weight: bold;\n  }\n  \n  #root {\n    width: 100vw;\n    display: flex;\n    background: linear-gradient(\n      to right top,\n      rgba(255, 255, 255, 0.85), \n      rgba(255, 255, 255, 0.85)\n    ),\n    url(", ");\n    background-size: cover;\n    background-attachment: fixed;\n    background-position: center;\n    flex-wrap: wrap;\n  }\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}














const GlobalStyles = Object(styled_components__WEBPACK_IMPORTED_MODULE_3__["createGlobalStyle"])(_templateObject(), _styles_colors__WEBPACK_IMPORTED_MODULE_7__["default"].color_main_2, _styles_colors__WEBPACK_IMPORTED_MODULE_7__["default"].color_main_1, _images_hero_image_jpg__WEBPACK_IMPORTED_MODULE_6___default.a);
const StyledApp = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject2());

const App = () => react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 149
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_normalize__WEBPACK_IMPORTED_MODULE_4__["Normalize"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 150
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(GlobalStyles, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 151
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_SideNav__WEBPACK_IMPORTED_MODULE_5__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 152
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
  className: "main-wrapper",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 153
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledApp, {
  className: "app",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 154
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 155
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
  exact: true,
  path: "/",
  component: _SearchCombos__WEBPACK_IMPORTED_MODULE_8__["default"],
  __source: {
    fileName: _jsxFileName,
    lineNumber: 156
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
  exact: true,
  path: "/cell-lines/",
  component: _CellLines__WEBPACK_IMPORTED_MODULE_9__["default"],
  __source: {
    fileName: _jsxFileName,
    lineNumber: 157
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
  exact: true,
  path: "/drugs/",
  component: _Drugs__WEBPACK_IMPORTED_MODULE_11__["default"],
  __source: {
    fileName: _jsxFileName,
    lineNumber: 158
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
  exact: true,
  path: "/datasets/",
  component: _Datasets__WEBPACK_IMPORTED_MODULE_10__["default"],
  __source: {
    fileName: _jsxFileName,
    lineNumber: 159
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
  exact: true,
  path: "/documentation/",
  component: _Documentation__WEBPACK_IMPORTED_MODULE_12__["default"],
  __source: {
    fileName: _jsxFileName,
    lineNumber: 160
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
  path: "/drug_combo",
  component: _ComboDetails__WEBPACK_IMPORTED_MODULE_13__["default"],
  __source: {
    fileName: _jsxFileName,
    lineNumber: 161
  },
  __self: undefined
})))));

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/components/BiomarkerPlot.js":
/*!*****************************************!*\
  !*** ./src/components/BiomarkerPlot.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BiomarkerPlot; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_plotly_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-plotly.js */ "./node_modules/react-plotly.js/react-plotly.js");
/* harmony import */ var react_plotly_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_plotly_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");
var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/BiomarkerPlot.js";

/* eslint-disable react/prop-types */



class BiomarkerPlot extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  // Defining initial state and layout
  constructor(props) {
    super(props);
    this.state = {
      box1: {
        y: null,
        type: 'box',
        name: '',
        marker: {
          color: _styles_colors__WEBPACK_IMPORTED_MODULE_2__["default"].color_accent_1
        }
      },
      box2: {
        y: null,
        type: 'box',
        name: '',
        marker: {
          color: _styles_colors__WEBPACK_IMPORTED_MODULE_2__["default"].color_accent_2
        }
      },
      box3: {
        y: null,
        type: 'box',
        name: '',
        marker: {
          color: _styles_colors__WEBPACK_IMPORTED_MODULE_2__["default"].color_main_4
        }
      },
      layout: {
        height: 450,
        paper_bgcolor: _styles_colors__WEBPACK_IMPORTED_MODULE_2__["default"].trans_color_main_3,
        plot_bgcolor: _styles_colors__WEBPACK_IMPORTED_MODULE_2__["default"].trans_color_main_3,
        yaxis: {
          title: 'FPKM'
        },
        xaxis: {
          title: 'Interaction Type'
        },
        showlegend: false,
        font: {
          size: 16,
          color: '#000000',
          family: 'Raleway'
        },
        title: {
          text: 'One-way ANOVA, p-val=',
          size: 18
        }
      }
    };
  } // Methods called on loading


  componentDidMount() {
    const _this$props = this.props,
          idDrugA = _this$props.idDrugA,
          idDrugB = _this$props.idDrugB,
          idSource = _this$props.idSource,
          gene = _this$props.gene,
          pValue = _this$props.pValue;
    this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'SYN');
    this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'MOD');
    this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'ANT');
    this.setPValue(pValue);
  }

  componentDidUpdate(prevProps) {
    const _this$props2 = this.props,
          gene = _this$props2.gene,
          idSource = _this$props2.idSource,
          idDrugA = _this$props2.idDrugA,
          idDrugB = _this$props2.idDrugB,
          pValue = _this$props2.pValue; // Always check if new props are different before updating state to avoid infinite loops
    // idDrugA and idDrugB are not gonna change, we just need check for gene and idSource

    if (gene !== prevProps.gene || idSource !== prevProps.idSource) {
      this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'SYN');
      this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'MOD');
      this.fetchFPKM(idSource, idDrugA, idDrugB, gene, 'ANT');
      this.setPValue(pValue);
    }
  }

  setPValue(pValue) {
    const layout = this.state.layout;
    this.setState({
      layout: {
        height: 450,
        title: {
          text: "One-way ANOVA, p-val=".concat(pValue),
          size: layout.title.size
        },
        plot_bgcolor: layout.plot_bgcolor,
        paper_bgcolor: layout.paper_bgcolor,
        font: layout.font,
        showlegend: layout.showlegend,
        yaxis: layout.yaxis,
        xaxis: layout.xaxis
      }
    });
  } // Fetch FPKM values from the database


  fetchFPKM(idSource, idDrugA, idDrugB, gene, interaction) {
    const _this$state = this.state,
          box1 = _this$state.box1,
          box2 = _this$state.box2,
          box3 = _this$state.box3;
    fetch('/api/biomarkers/fpkm', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idSource,
        idDrugA,
        idDrugB,
        gene,
        interaction
      })
    }).then(response => response.json()).then(data => {
      // Convert JSON array to int array
      const dataProcessed = data.map(item => item.FPKM); // eslint-disable-next-line default-case

      switch (interaction) {
        case 'SYN':
          this.setState({
            box1: {
              y: dataProcessed,
              type: box1.type,
              name: 'Synergy, N='.concat(dataProcessed.length),
              marker: box1.marker
            }
          });
          break;

        case 'MOD':
          this.setState({
            box2: {
              y: dataProcessed,
              type: box2.type,
              name: 'Moderate, N='.concat(dataProcessed.length),
              marker: box2.marker
            }
          });
          break;

        case 'ANT':
          this.setState({
            box3: {
              y: dataProcessed,
              type: box3.type,
              name: 'None/Antagonism, N='.concat(dataProcessed.length),
              marker: box3.marker
            }
          });
          break;
      }
    });
  } // Render this compoenent


  render() {
    const _this$state2 = this.state,
          box1 = _this$state2.box1,
          box2 = _this$state2.box2,
          box3 = _this$state2.box3,
          layout = _this$state2.layout;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_plotly_js__WEBPACK_IMPORTED_MODULE_1___default.a, {
      data: [box1, box2, box3],
      layout: layout,
      graphDiv: "graph",
      config: {
        responsive: true
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159
      },
      __self: this
    });
  }

}

/***/ }),

/***/ "./src/components/Biomarkers.js":
/*!**************************************!*\
  !*** ./src/components/Biomarkers.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");
/* harmony import */ var _BiomarkerPlot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BiomarkerPlot */ "./src/components/BiomarkerPlot.js");

var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/Biomarkers.js";

function _templateObject2() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  \n  grid-template-columns: repeat(4, 1fr);\n\n  span {\n    &:nth-child(8n-3),\n    &:nth-child(8n-2),\n    &:nth-child(8n-1),\n    &:nth-child(8n) {\n      background-color: ", ";\n    }\n  }\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  width: 100%;\n  height: auto;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}



 // import transitions from '../styles/transitions';


const StyledBiomarkers = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject());
const BiomarkerDiv = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject2(), _styles_colors__WEBPACK_IMPORTED_MODULE_3__["default"].trans_color_accent_1);

class Biomarkers extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super();
    this.state = {
      results: [],
      biomarkerData: false,
      selectedBiomarker: '0'
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const _this$props = this.props,
          drugId1 = _this$props.drugId1,
          drugId2 = _this$props.drugId2;
    fetch('/api/biomarkers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        drugId1,
        drugId2
      })
    }).then(response => response.json()).then(data => {
      this.setState({
        results: data
      });

      if (data.length > 0) {
        this.setState({
          biomarkerData: true
        });
      }
    });
  }

  handleSelect(e) {
    this.setState({
      selectedBiomarker: e.target.value
    });
  }

  render() {
    const _this$state = this.state,
          biomarkerData = _this$state.biomarkerData,
          results = _this$state.results,
          selectedBiomarker = _this$state.selectedBiomarker;
    const _this$props2 = this.props,
          drugId1 = _this$props2.drugId1,
          drugId2 = _this$props2.drugId2,
          sourceName = _this$props2.sourceName;

    if (biomarkerData) {
      const listOfBiomarkers = results.map((biomarker, index) => react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
        key: index,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, biomarker.gene), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, biomarker.p), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, biomarker.name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "radio",
        value: index,
        checked: index.toString() === selectedBiomarker,
        onChange: this.handleSelect,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }))));
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledBiomarkers, {
        className: "biomarkers",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        },
        __self: this
      }, "Potential Biomarkers, Top 10"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(BiomarkerDiv, {
        className: "grid-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "table-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        },
        __self: this
      }, "Gene Symbol"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "table-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        },
        __self: this
      }, "One-way ANOVA P"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "table-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, "Source"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "table-header",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }, "Select"), listOfBiomarkers)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_BiomarkerPlot__WEBPACK_IMPORTED_MODULE_4__["default"], {
        idDrugA: drugId1,
        idDrugB: drugId2,
        idSource: results[selectedBiomarker].idSource,
        gene: results[selectedBiomarker].gene,
        pValue: results[selectedBiomarker].p,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }));
    }

    return null;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Biomarkers);

/***/ }),

/***/ "./src/components/CellLines.js":
/*!*************************************!*\
  !*** ./src/components/CellLines.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");

var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/CellLines.js";

function _templateObject2() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n    \n  grid-template-columns: repeat(5, 1fr);\n\n  span {\n    &:nth-child(10n-4),\n    &:nth-child(10n-3),\n    &:nth-child(10n-2),\n    &:nth-child(10n-1),\n    &:nth-child(10n) {\n      background-color: ", ";\n    }\n  }\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}



 // import transitions from '../styles/transitions';

const StyledWrapper = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject());
const StyledTable = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject2(), _styles_colors__WEBPACK_IMPORTED_MODULE_3__["default"].trans_color_main_5);

class Databases extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super();
    this.state = {
      cellLineData: []
    };
  }

  componentDidMount() {
    fetch('/api/cell_lines/').then(response => response.json()).then(cellLineData => {
      this.setState({
        cellLineData
      });
    });
  }

  render() {
    const cellLineData = this.state.cellLineData;
    const listOfCells = cellLineData.map((cellLine, index) => // eslint-disable-next-line react/no-array-index-key
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, cellLine.name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }, cellLine.tissue), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, cellLine.sex), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }, cellLine.age), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      },
      __self: this
    }, cellLine.disease)));
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("header", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledWrapper, {
      className: "wrapper",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledTable, {
      className: "grid-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      },
      __self: this
    }, "Name"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65
      },
      __self: this
    }, "Tissue"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    }, "Sex"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, "Age"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    }, "Disease"), listOfCells))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("footer", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "wrapper",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76
      },
      __self: this
    }, "Copyright \xA9 2019. All rights reserved"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Databases);

/***/ }),

/***/ "./src/components/ComboDetails.js":
/*!****************************************!*\
  !*** ./src/components/ComboDetails.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ComboDetails; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");
var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/ComboDetails.js";




class ComboDetails extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor() {
    super();
    this.state = {
      cellData: {},
      drugsData: []
    };
  }

  componentDidMount() {
    const requestParams = query_string__WEBPACK_IMPORTED_MODULE_1___default.a.parse(this.props.location.search);
    this.setState({
      requestParams
    });
    const idSource = requestParams.idSource,
          idDrugA = requestParams.idDrugA,
          idDrugB = requestParams.idDrugB,
          idSample = requestParams.idSample;
    fetch("/api/cell_lines/info?idSample=".concat(idSample), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(cellData => {
      this.setState({
        cellData
      });
      console.log(this.state.cellData);
    });
    fetch("/api/drugs/info?idDrugA=".concat(idDrugA, "&idDrugB=").concat(idDrugB), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(drugsData => {
      this.setState({
        drugsData
      });
      console.log(this.state.drugsData);
    });
  }

  render() {
    const _this$state = this.state,
          cellData = _this$state.cellData,
          drugsData = _this$state.drugsData;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, "Drug combination synergy"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }, "Combo Summary"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }, "Sample:", ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      },
      __self: this
    }, cellData.name, ","), ' ', cellData.disease, ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "https://web.expasy.org/cellosaurus/".concat(cellData.idCellosaurus),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      },
      __self: this
    }, "View in Cellosaurus")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    }, "Drug A: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, "Drug B"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    }, "Source")));
  }

}

/***/ }),

/***/ "./src/components/ComboResults.js":
/*!****************************************!*\
  !*** ./src/components/ComboResults.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");
/* harmony import */ var _Biomarkers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Biomarkers */ "./src/components/Biomarkers.js");

var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/ComboResults.js";

function _templateObject() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  grid-template-columns: repeat(9, 1fr);\n  span {\n    &:nth-child(18n-8),\n    &:nth-child(18n-7),\n    &:nth-child(18n-6),\n    &:nth-child(18n-5),\n    &:nth-child(18n-4),\n    &:nth-child(18n-3),\n    &:nth-child(18n-2),\n    &:nth-child(18n-1),\n    &:nth-child(18n) {\n      background-color: ", ";\n    }\n  }\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

/* eslint-disable max-len */

/* eslint-disable react/prop-types */

/* eslint-disable react/no-array-index-key */



 // import transitions from '../styles/transitions';


const SynergyDiv = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject(), _styles_colors__WEBPACK_IMPORTED_MODULE_4__["default"].trans_color_main_4);

class ComboResults extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super();
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    const _this$props = this.props,
          sample = _this$props.sample,
          drugId1 = _this$props.drugId1,
          drugId2 = _this$props.drugId2;
    const requestBody = {
      drugId1,
      drugId2
    };
    if (sample !== 'Any') requestBody.sample = sample;
    fetch('/api/combos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }).then(response => response.json()).then(data => {
      this.setState({
        results: data
      });
    });
  }

  render() {
    const results = this.state.results;
    const _this$props2 = this.props,
          drugId1 = _this$props2.drugId1,
          drugId2 = _this$props2.drugId2;
    const showBiomarker = typeof drugId2 === 'number' && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Biomarkers__WEBPACK_IMPORTED_MODULE_5__["default"], {
      drugId1: drugId1,
      drugId2: drugId2,
      sourceName: results,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      },
      __self: this
    });
    const totalSynergyScores = results.length;
    const resultRows = results.map((synergyResult, index) => {
      const idSample = synergyResult.idSample,
            tissue = synergyResult.tissue,
            sampleName = synergyResult.sampleName,
            drugNameA = synergyResult.drugNameA,
            drugNameB = synergyResult.drugNameB,
            zip = synergyResult.zip,
            bliss = synergyResult.bliss,
            loewe = synergyResult.loewe,
            hsa = synergyResult.hsa,
            sourceName = synergyResult.sourceName,
            idSource = synergyResult.idSource,
            idDrugA = synergyResult.idDrugA,
            idDrugB = synergyResult.idDrugB;
      const url = {
        pathname: '/drug_combo',
        search: "?idSource=".concat(idSource, "&idDrugA=").concat(idDrugA, "&idDrugB=").concat(idDrugB, "&idSample=").concat(idSample)
      };
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
        key: index,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, tissue)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        },
        __self: this
      }, sampleName)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        },
        __self: this
      }, drugNameA)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, drugNameB)), zip >= 0.2 ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "high-score",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, zip)) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        },
        __self: this
      }, zip)), bliss >= 0.2 ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "high-score",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, bliss)) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }, bliss)), loewe >= 0.2 ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "high-score",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, loewe)) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, loewe)), hsa >= 0.2 ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: "high-score",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }, hsa)) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }, hsa)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: url,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        },
        __self: this
      }, sourceName)));
    });
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    }, showBiomarker, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "synergy-scores",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }, "Synergy Scores, N=", totalSynergyScores), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(SynergyDiv, {
      className: "grid-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 95
      },
      __self: this
    }, "Tissue"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 96
      },
      __self: this
    }, "Cell line"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97
      },
      __self: this
    }, "Drug A"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98
      },
      __self: this
    }, "Drug B"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99
      },
      __self: this
    }, "ZIP"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, "Bliss"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101
      },
      __self: this
    }, "Loewe"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102
      },
      __self: this
    }, "HSA"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 103
      },
      __self: this
    }, "Source"), resultRows)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ComboResults);

/***/ }),

/***/ "./src/components/Datasets.js":
/*!************************************!*\
  !*** ./src/components/Datasets.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");

var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/Datasets.js";

function _templateObject2() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n    \n  grid-template-columns: repeat(5, 1fr);\n\n  span {\n    &:nth-child(10n-4),\n    &:nth-child(10n-3),\n    &:nth-child(10n-2),\n    &:nth-child(10n-1),\n    &:nth-child(10n) {\n      background-color: ", ";\n    }\n  }\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}



 // import transitions from '../styles/transitions';

const StyledWrapper = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject());
const StyledTable = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject2(), _styles_colors__WEBPACK_IMPORTED_MODULE_3__["default"].trans_color_main_5);

class Datasets extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super();
    this.state = {
      databaseData: []
    };
  }

  componentDidMount() {
    fetch('/api/datasets/').then(response => response.json()).then(databaseData => {
      this.setState({
        databaseData
      });
    });
  }

  render() {
    const databaseData = this.state.databaseData;
    const listOfSources = databaseData.map((item, index) => // eslint-disable-next-line react/no-array-index-key
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, item.name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }, item.author), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, item.no_samples), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }, item.no_drugs), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      },
      __self: this
    }, item.combo)));
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("header", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledWrapper, {
      className: "wrapper",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledTable, {
      className: "grid-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      },
      __self: this
    }, "Name"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65
      },
      __self: this
    }, "Source"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    }, "# of cell lines"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, "# of drugs"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    }, "Design"), listOfSources))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("footer", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "wrapper",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76
      },
      __self: this
    }, "Copyright \xA9 2019. All rights reserved"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Datasets);

/***/ }),

/***/ "./src/components/Documentation.js":
/*!*****************************************!*\
  !*** ./src/components/Documentation.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/Documentation.js";

/* eslint-disable linebreak-style */

/* eslint-disable max-len */


const Documentation = () => {
  const divStyle = {
    fontSize: '20px'
  };
  const noStyle = {
    listStyleType: 'none'
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "wrapper",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }, "SYNERGxDB"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }, "Documentation"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", {
    type: "A",
    style: divStyle,
    align: "justify",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: undefined
  }, "SYNERGxDB"), ' ', "is a comprehensive database to explore synergistic drug combinations for biomarker discovery."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: undefined
  }, "Overview"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    style: noStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: undefined
  }, "Many studies have highlighted the use of drug combination approaches in the treatment of tumors, which have been shown to provide aid in", ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: undefined
  }, "overcoming cancer treatment failures."), ' ', "However, the impact of genetics on variability in combo responses for discovering predictive and prognostic biomarkers is currently unknown. To help solve this issue, we created", ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: undefined
  }, "SYNERGxDB"), ", a web-application that possesses the largest database of seven collections of pharmacological and molecular profiles of corresponding cell lines (123 cell lines in 11 tissue types and 1,965 unique drugs/compounds - 14,634 unique combos). This application allows researchers and clinicians to identify novel synergistic drug combinations, in order to discover potential prognostic and predictive biomarkers that can help improve patient prognosis and selection."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: undefined
  }, "Features"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", {
    type: "i",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: undefined
  }, "Search: The SYNERGxDB search engine allows users to identify potential biomarkers and novel drug combinations according to the predicted synergy scores, by querying for a subset of cell lines or one cell line, first drug in combo, second drug in combo, and/or dataset of choice to explore."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: undefined
  }, "Samples: All of the cell lines in SYNERGxDB are visually represented in a pie-chart based upon the following categories: (age, sex, tissues, biopsy). By hovering over each slice of a chart, users can gain additional information about the cell lines (e.g. number of cell lines derived from a male). Metadata is provided for each cell line in SYNERGxDB (N = 123), which includes: (cell line name, tissue origin, sex, age, associated disease, and", ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: undefined
  }, "Cellosaurus"), ' ', "accession ID)."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: undefined
  }, "Drugs: Metadata is provided for each drug compound in SYNERGxDB (N = 1,965), which includes: (compound name, ATC code, PubChem CID, and DrugBank ID). In addition, users may browse drugs with ATC code in tree at the top panel."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: undefined
  }, "Datasets: Each study (dataset) is summarized through the following characteristics: (dataset name, source of study, number of cell lines, number of drug compounds, and concentration design - e.g. 3-by-3 concentrations)."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: undefined
  }, "Synergy scores: Synergy scores are calculated for each drug combo experiment in SYNERGxDB (N = 475,278), which includes: (tissue, cell line, first drug in combo, second drug in combo, ZIP, Bliss, Loewe, and HSA)."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: undefined
  }, "Potential biomarkers: From these synergy scores, potential biomarkers were identified by ANOVA for FPKM values in three cell line groups based on the synergy score via ZIP model (synergy, ZIP", ' ', '>', ' ', "0.2; moderate, 0", ' ', '<', ' ', "ZIP", ' ', '<=', ' ', "0.2; none or antagonism for the others), with the following characteristics provided: (HUGO gene symbol and P-value)."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105
    },
    __self: undefined
  }, "Detailed synergy scores: Users are able to delve into the synergy scores calculated for each drug combo experiment through a detailed synergy pane. Cumulative density is plotted across all of the synergy scores for a drug combo experiment of interest. Experiment consists of sample, drug combo one (drugA) and drug combo two (drugB).", ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110
    },
    __self: undefined
  }), "Synergy matrices are provided for each score that is calculated for an experiment, where concentrations of drugA and drugB and corresponding inhibition values (%) are presented. Users are able to further investigate the relationship between each drug combination and synergy score through 3D-surface plots, where synergism is depicted through colour intensity. In addition, the drug-dose response curves are generated for each drug and cell line combination, along with an inhibition heat map, and computed AAC, IC50, and EC50."))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 121
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "wrapper",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    align: "center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123
    },
    __self: undefined
  }, "Copyright \xA9 2019. All rights reserved"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Documentation);

/***/ }),

/***/ "./src/components/Drugs.js":
/*!*********************************!*\
  !*** ./src/components/Drugs.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");

var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/Drugs.js";

function _templateObject2() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n    \n  grid-template-columns: minmax(25%, 400px) minmax(25%, 400px) auto auto;\n\n  span {\n    &:nth-child(8n-3),\n    &:nth-child(8n-2),\n    &:nth-child(8n-1),\n    &:nth-child(8n) {\n      background-color: ", ";\n    }\n  }\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

/* eslint-disable react/no-array-index-key */


 // import transitions from '../styles/transitions';

const StyledWrapper = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject());
const StyledTable = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(_templateObject2(), _styles_colors__WEBPACK_IMPORTED_MODULE_3__["default"].trans_color_main_5);

class Drugs extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super();
    this.state = {
      drugsData: []
    };
  }

  componentDidMount() {
    fetch('/api/drugs/').then(response => response.json()).then(drugsData => {
      drugsData.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      this.setState({
        drugsData
      });
    });
  }

  render() {
    const drugsData = this.state.drugsData; // splits data into chunks, css grid collapses data if more than ~990 rows

    const drugChunks = [];

    for (let i = 0; i < drugsData.length; i += 9051) {
      drugChunks.push(drugsData.slice(i, i + 901));
    }

    const listOfDrugs = drugChunks.length > 0 ? drugChunks[0].map((drug, index) => react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
      key: index,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    }, drug.name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }, drug.atcCode), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      },
      __self: this
    }, drug.idPubChem), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63
      },
      __self: this
    }, drug.idDrugBank))) : null;
    drugChunks.shift();
    const restDrugs = drugChunks.map((chunk, index) => {
      const chunkData = chunk.map((drug, i) => react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
        key: i,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }, drug.name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      }, drug.atcCode), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: this
      }, drug.idPubChem), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }, drug.idDrugBank)));
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledTable, {
        key: index,
        className: "grid-container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, chunkData);
    });
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("header", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledWrapper, {
      className: "wrapper",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledTable, {
      className: "grid-container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88
      },
      __self: this
    }, "Name"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89
      },
      __self: this
    }, "ATC Code"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }, "PubChem CID"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "table-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91
      },
      __self: this
    }, "DrugBank ID"), listOfDrugs), restDrugs)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("footer", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 97
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "wrapper",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99
      },
      __self: this
    }, "Copyright \xA9 2019. All rights reserved"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Drugs);

/***/ }),

/***/ "./src/components/SearchCombos.js":
/*!****************************************!*\
  !*** ./src/components/SearchCombos.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-window */ "./node_modules/react-window/dist/index.esm.js");
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");
/* harmony import */ var _styles_transitions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../styles/transitions */ "./src/styles/transitions.js");
/* harmony import */ var _ComboResults__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ComboResults */ "./src/components/ComboResults.js");
/* harmony import */ var _Stats__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Stats */ "./src/components/Stats.js");
/* harmony import */ var _images_banner_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../images/banner.png */ "./src/images/banner.png");
/* harmony import */ var _images_banner_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_images_banner_png__WEBPACK_IMPORTED_MODULE_10__);


var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/SearchCombos.js";

function _templateObject4() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__["default"])(["\n  font-size: 1.5em;\n  font-weight: bold; \n  background: none;\n  border: none;\n  padding: 10px 2px;\n  color: ", ";\n  transition: ", ";\n  outline-style: none;\n\n  &:hover {\n    color: ", "\n  }\n  &[type=\"button\"] {\n    font-size: 1.2em;\n  }\n"]);

  _templateObject4 = function () {
    return data;
  };

  return data;
}

function _templateObject3() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__["default"])(["\n  max-width: 700px;\n  width: 100%;\n  background-color: ", ";\n  margin: 5px;\n  padding: 10px;\n  padding-top: 25px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  \n  .button-container {\n    min-width: 300px;\n    width: 50%;\n    display: flex;\n    justify-content: space-between;\n  }\n  input {\n    color: ", ";\n    border: 2px solid ", ";\n    min-width: 350px;\n    width: 50%;\n    padding: 10px;\n    margin: 10px auto;\n    outline-style: none;\n    background-color: ", ";\n\n    &::placeholder {\n      color: ", ";\n    }\n    &:focus {\n      border: 2px solid ", ";\n      background-color: ", ";\n      \n      &::placeholder {\n      color: ", ";\n    }\n  }\n"]);

  _templateObject3 = function () {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__["default"])(["\n  max-width: 500px;\n  max-height: 400px;\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__["default"])(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n\n  h2 {\n    color: ", ";\n  }\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

/* eslint-disable max-len */

/* eslint-disable no-plusplus */









const StyledWrapper = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject(), _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].color_main_2);
const StyledBanner = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].img(_templateObject2());
const StyledForm = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].form(_templateObject3(), _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].trans_color_main_3, _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].color_main_1, _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].trans_color_main_5, _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].trans_color_main_5, _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].color_main_4, _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].color_main_2, _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].trans_color_main_4, _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].color_main_3);
const StyledButton = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].button(_templateObject4(), _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].color_main_1, _styles_transitions__WEBPACK_IMPORTED_MODULE_7__["default"].main_trans, _styles_colors__WEBPACK_IMPORTED_MODULE_6__["default"].color_main_4);

const MenuList = props => {
  const height = 50;
  const options = props.options,
        children = props.children,
        maxHeight = props.maxHeight,
        getValue = props.getValue;

  const _getValue = getValue(),
        _getValue2 = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_getValue, 1),
        value = _getValue2[0];

  const initialOffset = options.indexOf(value) * height;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_window__WEBPACK_IMPORTED_MODULE_5__["FixedSizeList"], {
    height: maxHeight,
    itemCount: children.length,
    itemSize: height,
    initialScrollOffset: initialOffset,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100
    },
    __self: undefined
  }, ({
    index,
    style
  }) => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    style: style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 106
    },
    __self: undefined
  }, children[index]));
};

class SearchCombos extends react__WEBPACK_IMPORTED_MODULE_2__["Component"] {
  constructor() {
    super();
    this.state = {
      drugId1: null,
      drugId2: null,
      sample: 'Any',
      drugsData1: [],
      drugsData2: [],
      sampleData: [],
      showResults: false,
      selectedSample: {
        value: 'Any',
        label: 'Any Sample'
      },
      selectedDrug1: null,
      selectedDrug2: null,
      drug2Placeholder: 'Enter Drug 2'
    };
    this.handleDrug1Search = this.handleDrug1Search.bind(this);
    this.handleDrug2Search = this.handleDrug2Search.bind(this);
    this.handleSampleSearch = this.handleSampleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExample = this.handleExample.bind(this);
  }

  componentDidMount() {
    fetch('/api/drugs').then(response => response.json()).then(data => {
      const drugsData1 = data.map(item => ({
        value: item.idDrug,
        label: item.name
      }));
      this.setState({
        drugsData1
      });
    });
    fetch('/api/cell_lines').then(response => response.json()).then(data => {
      // Generates an array of unique tissue names
      // const tissueList = [...new Set(data.map(item => item.tissue))];
      const tissueObject = {};
      data.forEach(item => {
        if (!tissueObject[item.tissue]) {
          tissueObject[item.tissue] = 1;
        } else {
          tissueObject[item.tissue]++;
        }
      }); // const tissueData = tissueList.map(item => ({ value: item, label: item }));

      const tissueData = Object.keys(tissueObject).map(tissue => ({
        value: tissue,
        label: "".concat(tissue, " (").concat(tissueObject[tissue], " cell lines)")
      }));
      const cellsData = data.map(item => ({
        value: item.idSample,
        label: "".concat(item.name, " (").concat(item.tissue, ")")
      }));
      this.setState({
        sampleData: [{
          value: 'Any',
          label: 'Any Sample'
        }, ...tissueData, ...cellsData]
      });
    });
  }

  updateDrug2Data(sample, drugId) {
    const requestBody = {
      drugId
    };
    if (sample !== 'Any') requestBody.sample = sample;
    fetch('/api/drugs', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }).then(response => response.json()).then(data => {
      this.setState({
        drugId2: null,
        selectedDrug2: null,
        drugsData2: []
      });

      if (data.length > 0) {
        const drugsData = data.map(item => ({
          value: item.idDrug,
          label: item.name
        }));
        drugsData.sort((a, b) => {
          if (a.value > b.value) return 1;
          if (a.value < b.value) return -1;
          return 0;
        });
        this.setState({
          drugsData2: [{
            value: 'Any',
            label: 'Any Drug'
          }, ...drugsData],
          drug2Placeholder: 'Enter Drug 2'
        });
      } else {
        this.setState({
          drug2Placeholder: 'No drug combos for this cell line and drug'
        });
      }
    });
  }

  handleDrug1Search(drugId, event) {
    const value = event.value,
          label = event.label;
    this.setState({
      drugId1: value,
      selectedDrug1: {
        value,
        label
      }
    });
    const sample = this.state.sample; // Sends a post request to the API to retrieve relevant combo drugs for drugsData2

    if (sample) this.updateDrug2Data(sample, value);
  }

  handleDrug2Search(event) {
    const value = event.value,
          label = event.label;
    this.setState({
      drugId2: value,
      selectedDrug2: {
        value,
        label
      }
    });
  }

  handleSampleSearch(event) {
    const value = event.value,
          label = event.label;
    this.setState({
      sample: value,
      selectedSample: {
        value,
        label
      }
    });
    const drugId1 = this.state.drugId1;
    if (drugId1) this.updateDrug2Data(value, drugId1);
  }

  handleSubmit(event) {
    event.preventDefault();
    const _this$state = this.state,
          drugId1 = _this$state.drugId1,
          drugId2 = _this$state.drugId2,
          sample = _this$state.sample,
          showResults = _this$state.showResults;

    if (drugId1 && drugId2 && sample) {
      this.setState({
        showResults: !showResults
      });
    }
  } // Generates an example for user and updates react component


  handleExample() {
    const _this$state2 = this.state,
          selectedSample = _this$state2.selectedSample,
          selectedDrug1 = _this$state2.selectedDrug1,
          selectedDrug2 = _this$state2.selectedDrug2;
    this.updateDrug2Data('Any', 11); // updateDrug2Data is asynchronous function and drugId2 can only be updated after it executes

    setTimeout(() => {
      this.setState({
        selectedSample: {
          value: 'Any',
          label: 'Any Sample'
        },
        selectedDrug1: {
          label: 'Bortezomib',
          value: 11
        },
        selectedDrug2: {
          label: 'Topotecan',
          value: 97
        },
        drugId1: 11,
        drugId2: 97
      });
    }, 500);
  }

  render() {
    const _this$state3 = this.state,
          drugId1 = _this$state3.drugId1,
          drugId2 = _this$state3.drugId2,
          drugsData1 = _this$state3.drugsData1,
          showResults = _this$state3.showResults,
          drugsData2 = _this$state3.drugsData2,
          sampleData = _this$state3.sampleData,
          sample = _this$state3.sample,
          selectedSample = _this$state3.selectedSample,
          selectedDrug1 = _this$state3.selectedDrug1,
          selectedDrug2 = _this$state3.selectedDrug2,
          drug2Placeholder = _this$state3.drug2Placeholder;
    const handleSampleSearch = this.handleSampleSearch,
          handleDrug1Search = this.handleDrug1Search,
          handleDrug2Search = this.handleDrug2Search,
          handleSubmit = this.handleSubmit,
          handleExample = this.handleExample;
    const isDisabled = !(drugId1 && sample && drugsData2.length > 0);
    const searchForm = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 251
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Stats__WEBPACK_IMPORTED_MODULE_9__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 252
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledBanner, {
      src: _images_banner_png__WEBPACK_IMPORTED_MODULE_10___default.a,
      alt: "banner",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 253
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 254
      },
      __self: this
    }, "SYNERGxDB is a comprehensive database to explore synergistic drug combinations for biomarker discovery."), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledForm, {
      className: "search-combos",
      onSubmit: handleSubmit,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 257
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_4__["default"], {
      components: {
        MenuList
      },
      options: sampleData,
      placeholder: "Enter Cell Line or Tissue",
      onChange: handleSampleSearch,
      value: selectedSample,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 258
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_4__["default"], {
      components: {
        MenuList
      },
      options: drugsData1,
      placeholder: "Enter Drug 1",
      onChange: e => handleDrug1Search('drugId1', e),
      value: selectedDrug1,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 265
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_4__["default"], {
      components: {
        MenuList
      },
      options: drugsData2,
      isDisabled: isDisabled,
      placeholder: drug2Placeholder,
      value: selectedDrug2,
      onChange: handleDrug2Search,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 272
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledButton, {
      onClick: handleExample,
      type: "button",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 280
      },
      __self: this
    }, "Example Query"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledButton, {
      type: "submit",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 281
      },
      __self: this
    }, "Search")));
    const displayedComponent = showResults ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ComboResults__WEBPACK_IMPORTED_MODULE_8__["default"], {
      sample: sample,
      drugId1: drugId1,
      drugId2: drugId2,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 285
      },
      __self: this
    }) : searchForm;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 288
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("header", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 289
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("main", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 290
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledWrapper, {
      className: "wrapper",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 291
      },
      __self: this
    }, displayedComponent)), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("footer", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 295
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "wrapper",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 296
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 297
      },
      __self: this
    }, "Copyright \xA9 2019. All rights reserved"))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SearchCombos);

/***/ }),

/***/ "./src/components/SideNav.js":
/*!***********************************!*\
  !*** ./src/components/SideNav.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/logo.png */ "./src/images/logo.png");
/* harmony import */ var _images_logo_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_images_logo_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");
/* harmony import */ var _styles_transitions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/transitions */ "./src/styles/transitions.js");

var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/SideNav.js";

function _templateObject2() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  max-width: 250px;\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  padding: 20px;    \n  max-width: 300px;\n  height: 100vh;\n  width: 30%\n  background-color: ", ";\n  position: fixed;\n\n  li {\n    margin-top: 20px;\n    font-size: 1.25em;\n    font-weight: bold;\n\n    a {\n      color: ", ";\n      transition: ", "\n\n      &:hover {\n        color: ", ";\n      }\n    }\n  }\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}







const StyledNav = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].nav(_templateObject(), _styles_colors__WEBPACK_IMPORTED_MODULE_5__["default"].trans_color_main_3, _styles_colors__WEBPACK_IMPORTED_MODULE_5__["default"].color_main_1, _styles_transitions__WEBPACK_IMPORTED_MODULE_6__["default"].main_trans, _styles_colors__WEBPACK_IMPORTED_MODULE_5__["default"].color_main_4);
const StyledLogo = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].img(_templateObject2());

const Home = () => react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledNav, {
  className: "side-nav",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 37
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledLogo, {
  src: _images_logo_png__WEBPACK_IMPORTED_MODULE_4___default.a,
  alt: "logo",
  className: "logo",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 38
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 39
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 40
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
  to: "/",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 40
  },
  __self: undefined
}, "Synergy Scores")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 41
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
  to: "/cell-lines/",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 41
  },
  __self: undefined
}, "Cell lines")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 42
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
  to: "/drugs/",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 42
  },
  __self: undefined
}, "Drugs")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 43
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
  to: "/datasets/",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 43
  },
  __self: undefined
}, "Datasets")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 44
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
  to: "/documentation/",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 44
  },
  __self: undefined
}, "Documentation"))));

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./src/components/Stats.js":
/*!*********************************!*\
  !*** ./src/components/Stats.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-countup */ "./node_modules/react-countup/build/index.js");
/* harmony import */ var react_countup__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_countup__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _styles_colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/colors */ "./src/styles/colors.js");

var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/components/Stats.js";

function _templateObject() {
  const data = Object(_Users_denistkachuk_BHKLab_Projects_SYNERGxDB_Web_App_client_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n    width: 100%    \n    display: flex;\n    align-items: flex-end;\n    justify-content: space-around;\n    flex-wrap: wrap\n\n    &:div {\n        width: 200px;\n        min-width: 150px;\n        margin: 20px\n    }\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}





const StyledDiv = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(_templateObject());

class Stats extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor() {
    super();
    this.state = {
      cells: 0,
      tissues: 0,
      combos: 0,
      experiments: 0,
      datapoints: 0
    };
  }

  componentDidMount() {
    // database call (takes too long, using hardcoded values for now)
    // fetch('/api/stats/')
    //   .then(response => response.json())
    //   .then((data) => {
    //     const {
    //       cells, tissues, combos, experiments, datapoints,
    //     } = data;
    //     this.setState({
    //       cells, tissues, combos, experiments, datapoints,
    //     });
    //   });
    this.setState({
      cells: 184,
      tissues: 13,
      combos: 14634,
      experiments: 477608,
      datapoints: 6059248
    });
  }

  render() {
    const _this$state = this.state,
          cells = _this$state.cells,
          tissues = _this$state.tissues,
          combos = _this$state.combos,
          experiments = _this$state.experiments,
          datapoints = _this$state.datapoints;

    const easeInOut = (t, b, c, d) => {
      if (t === 0) return b;
      if (t === d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StyledDiv, {
      className: "stasts",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: this
    }, "Cell Lines"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_2___default.a, {
      start: 0,
      end: cells,
      duration: 3,
      easingFn: easeInOut,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77
      },
      __self: this
    }, "Tissues"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_2___default.a, {
      start: 0,
      end: tissues,
      duration: 3,
      easingFn: easeInOut,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 88
      },
      __self: this
    }, "Drug Combinations"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_2___default.a, {
      start: 0,
      end: combos,
      duration: 3,
      easingFn: easeInOut,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 99
      },
      __self: this
    }, "Experiments"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_2___default.a, {
      start: 0,
      end: experiments,
      duration: 3,
      easingFn: easeInOut,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110
      },
      __self: this
    }, "Datapoints"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_countup__WEBPACK_IMPORTED_MODULE_2___default.a, {
      start: 0,
      end: datapoints,
      duration: 3,
      easingFn: easeInOut,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112
      },
      __self: this
    }))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Stats);

/***/ }),

/***/ "./src/images/banner.png":
/*!*******************************!*\
  !*** ./src/images/banner.png ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/banner.e20ef990.png";

/***/ }),

/***/ "./src/images/hero-image.jpg":
/*!***********************************!*\
  !*** ./src/images/hero-image.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/hero-image.edc3e907.jpg";

/***/ }),

/***/ "./src/images/logo.png":
/*!*****************************!*\
  !*** ./src/images/logo.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAABRCAYAAABCIz1YAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAewgAAHsIBbtB1PgAABCdpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjE8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjIwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MjAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTcwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj44MTwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAg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"

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/App */ "./src/components/App.js");
var _jsxFileName = "/Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/index.js";




Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_3__["default"], {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9
  },
  __self: undefined
})), document.getElementById('root'));

/***/ }),

/***/ "./src/styles/colors.js":
/*!******************************!*\
  !*** ./src/styles/colors.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  color_main_1: '#040C0E',
  color_main_2: '#132226',
  color_main_3: '#525B56',
  trans_color_main_3: 'rgba(82,91,86, 0.5)',
  color_main_4: '#BE9063',
  trans_color_main_4: 'rgba(190, 144, 99, 0.5)',
  color_main_5: '#A4978E',
  trans_color_main_5: 'rgba(164,151,142, 0.5)',
  color_accent_1: '#fb2b06',
  trans_color_accent_1: 'rgba(251,43,6, 0.5)',
  color_accent_2: '#f0f0f0'
});

/***/ }),

/***/ "./src/styles/transitions.js":
/*!***********************************!*\
  !*** ./src/styles/transitions.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  main_trans: 'all ease-out 0.25s'
});

/***/ }),

/***/ 0:
/*!**********************************************************************************!*\
  !*** multi ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /Users/denistkachuk/BHKLab-Projects/SYNERGxDB-Web-App/client/src/index.js */"./src/index.js");


/***/ })

},[[0,"runtime~main",0]]]);
//# sourceMappingURL=main.chunk.js.map