import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';

import LoadingComponent from './Loading';
import DonutPlot from './Plots/DonutPlot';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background:white;
  padding:0px 30px;
`;



class Databases extends Component {
  constructor() {
    super();
    this.state = {
      cellLineData: [],
      loading: true,
      donutData: [],
    };
  }

  formatData(data, keyName) {
    // legend names
    const names = [...new Set(data.map(x => x[keyName]))];
    console.log(names)
    let result = [];

    if (keyName == 'age') {
      result = [
        {
          name: '> 50',
          num: 0,
        },
        {
          name: '<= 50',
          num: 0,
        },
        {
          name: 'Unknown',
          num: 0,
        },
      ];
      data.forEach((val) => {
        let ind = 0;
        if (val[keyName] > 50) {
          ind = 0;
        } else if (val[keyName] <= 50 && val[keyName] != null) {
          ind = 1;
        } else if (val[keyName] == null) {
          ind = 2;
        }

        // increment the counter
        result[ind].num = result[ind].num + 1;
      });
    } else if (keyName == 'origin') {
      result = [
        {
          name: 'Primary',
          num: 0,
        },
        {
          name: 'Metastasis',
          num: 0,
        },
      ];
      data.forEach((val) => {
        let ind = 0;
        if (val[keyName] == null) {
          ind = 0;
        } else {
          ind = 1;
        }
        // increment the counter
        result[ind].num = result[ind].num + 1;
      });
    } else if (keyName == 'sex') {
      result = [
        {
          name: 'Female',
          num: 0,
        },
        {
          name: 'Male',
          num: 0,
        },
        {
          name: 'Unknown',
          num: 0,
        },
      ];
      data.forEach((val) => {
        let ind = 0;
        if (val[keyName] == 'F') {
          ind = 0;
        } else if (val[keyName] == 'M') {
          ind = 1;
        } else if (val[keyName] == null) {
          ind = 2;
        }
        // increment the counter
        result[ind].num = result[ind].num + 1;
      });
    } else {
      // populate result with names first
      names.forEach((val) => {
        result.push({
          name: val,
          num: 0,
        });
      });

      // count the number of each name
      data.forEach((val) => {
        // get index of the name in the result array
        const ind = result.findIndex((item, i) => item.name === val[keyName]);

        // increment the counter
        result[ind].num = result[ind].num + 1;
      });
    }

    return result;
  }

  componentDidMount() {
    fetch('/api/cell_lines/')
      .then(response => response.json())
      .then((data) => {
        // Restructures data for react table
        const cellLineData = data.map((cell) => {
          const {
            tissue, name, sex, origin, age, disease, idCellosaurus,
          } = cell;
          return {
            tissue, name, sex, age, idCellosaurus, disease: { name: disease, origin },
          };
        });
        this.setState({ cellLineData, loading: false, donutData: data})
      })
  }

  render() {
    const { cellLineData, loading } = this.state;
    const columns = [{
      Header: 'Tissue',
      accessor: 'tissue', // String-based value accessors!
      Cell: props => props.value.toUpperCase(),
      maxWidth: 125,
      sortable: true,
    }, {
      Header: 'Name',
      accessor: 'name',
      Cell: props => props.value.toUpperCase(),
      maxWidth: 125,
      sortable: true,
    }, {
      Header: 'Sex',
      accessor: 'sex',
      maxWidth: 55,
      minWidth: 55,
      // sortable: false,
    }, {
      Header: 'Age',
      accessor: 'age',
      style: { textAlign: 'right' },
      maxWidth: 50,
      sortable: true,
    }, {
      Header: 'Disease',
      accessor: 'disease',
      Cell: (disease) => {
        const { value } = disease;
        return value.origin ? (
          <span>
            {value.name}
            <em> (metastasis)</em>
          </span>
        ) : <span>{value.name}</span>;
      },
      // filterable: false,
      sortable: false,
    }, {
      Header: 'Cellosaurus',
      accessor: 'idCellosaurus',
      Cell: props => <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://web.expasy.org/cellosaurus/${props.value}`}>{props.value}</a>,
      maxWidth: 125,
      sortable: false,
    }];

    const miniDims = {
      width: 300,
      height: 230,
      radius: 100,
      rectY: -30,
      textY: -43,
      translate:85
    }
    const normalDims = {
      width: 600,
      height: 400,
      radius: 230,
      rectY: 20,
      textY: 8,
      translate:5
    }
    const filterCaseInsensitive = (filter, row) => {
      console.log(filter);
      const id = filter.pivotId || filter.id;
      console.log(id, row);
      let rowData
      console.log(typeof row[id], row[id]);
      console.log(typeof undefined);
      switch (typeof row[id]) {
        case 'object':
          if (row[id] && row[id].origin) {
            return String('metastasis').includes(filter.value.toLowerCase())
          }
          return row[id] && row[id].name ? String(row[id].name.toLowerCase()).startsWith(filter.value.toLowerCase()) : false
          break
        default:
          return false
          break
      }
      // return !row[id] ? false : String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
    }
    return (

      <Fragment>
        {/* <style>{'#root { background: #e7f3f8  !important; }'}</style> */}
        <main className="summary">
          <StyledWrapper className="wrapper">
            <h1>Relative Percentage of Cell Lines</h1>
            {this.state.donutData.length == 0 ? null : (
              <Fragment>
                <DonutPlot
                  keyName="tissue"
                  plotId="cellTissuePlot"
                  dimensions={normalDims}
                  formatData={this.formatData}
                  donutData={this.state.donutData}
                />

                <DonutPlot
                  keyName="sex"
                  plotId="cellMiniPlot"
                  dimensions={miniDims}
                  formatData={this.formatData}
                  donutData={this.state.donutData}
                />

                <DonutPlot
                  keyName="origin"
                  plotId="cellMiniPlot"
                  dimensions={miniDims}
                  formatData={this.formatData}
                  donutData={this.state.donutData}
                />

                <DonutPlot
                  keyName="age"
                  plotId="cellMiniPlot"
                  dimensions={miniDims}
                  formatData={this.formatData}
                  donutData={this.state.donutData}
                />
              </Fragment>
              
            )}
            
          </StyledWrapper>
          <StyledWrapper className="wrapper">
            <h1>List of Cell Lines</h1>
            <ReactTable
              data={cellLineData}
              columns={columns}
              defaultPageSize={25}
              filterable
              defaultFilterMethod={filterCaseInsensitive}
              className="-highlight"
              loading={loading}
              LoadingComponent={LoadingComponent}
            />
          </StyledWrapper>
        </main>
        <footer>
          <div className="footer-wrapper">
            <p>Copyright © 2019. All rights reserved</p>
          </div>
        </footer>
      </Fragment>
    );
  }
}


export default Databases;
