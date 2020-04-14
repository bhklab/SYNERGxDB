webpackHotUpdate("main",{

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

/***/ })

})
//# sourceMappingURL=main.42d92207b20e4c6928df.hot-update.js.map