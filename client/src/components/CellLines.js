import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';
import CellLinePlot from './Plots/CellLinePlot';

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
    };
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
        this.setState({ cellLineData, loading: false });
      });

    
  }

  render() {
    const { cellLineData, loading } = this.state;
    const columns = [{
      Header: 'Tissue',
      accessor: 'tissue', // String-based value accessors!
      Cell: props => props.value.toUpperCase(),
      maxWidth: 125,
    }, {
      Header: 'Name',
      accessor: 'name',
      Cell: props => props.value.toUpperCase(),
      maxWidth: 125,
    }, {
      Header: 'Sex',
      accessor: 'sex',
      maxWidth: 55,
      minWidth:55,
    }, {
      Header: 'Age',
      accessor: 'age',
      maxWidth: 50,
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
      filterable: false,
    }, {
      Header: 'Cellosaurus',
      accessor: 'idCellosaurus',
      Cell: props => <a className="hover" href={`https://web.expasy.org/cellosaurus/${props.value}`}>{props.value}</a>,
      maxWidth: 125,
    }];
    return (
      
        <Fragment>
          {/* <style>{'#root { background: #e7f3f8  !important; }'}</style> */}
          <main className="summary">
            <StyledWrapper className="wrapper">
              <h1>Relative Percentage of Cell Lines Per Tissue</h1>
              <CellLinePlot
                keyName="tissue" 
                mini={false}
                plotId="cellTissuePlot"
              />

              <CellLinePlot
                keyName="sex"
                mini={true}
                plotId="cellMiniPlot"
              />

              <CellLinePlot
                keyName="origin"
                mini={true}
                plotId="cellMiniPlot"
              />

              <CellLinePlot
                keyName="age"
                mini={true}
                plotId="cellMiniPlot"
              />
            </StyledWrapper>
            <StyledWrapper className="wrapper">
              <h1>List of Cell Lines</h1>
              <ReactTable
                data={cellLineData}
                columns={columns}
                sortable={false}
                defaultPageSize={25}
                filterable
                className="-highlight"
                loading={loading}
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
