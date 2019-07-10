import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledTable = styled.div`
    
  grid-template-columns: repeat(6, auto);

  span {
    &:nth-child(12n-5),
    &:nth-child(12n-4),
    &:nth-child(12n-3),
    &:nth-child(12n-2),
    &:nth-child(12n-1),
    &:nth-child(12n) {
      background-color: ${colors.trans_color_main_5};
    }
  }
`;

class Databases extends Component {
  constructor() {
    super();
    this.state = {
      cellLineData: [],
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
        this.setState({ cellLineData });
      });
  }

  render() {
    const { cellLineData } = this.state;
    // const listOfCells = cellLineData.map((cellLine, index) => (
    //   // eslint-disable-next-line react/no-array-index-key
    //   <Fragment key={index}>
    //     <span>{cellLine.tissue.toUpperCase()}</span>
    //     <span>{cellLine.name.toUpperCase()}</span>
    //     <span>{cellLine.sex}</span>
    //     <span>{cellLine.age}</span>
    //     <span>
    //       {cellLine.disease}
    //       {cellLine.origin ? (<em> (metastasis)</em>) : null}
    //     </span>
    //     <span><a className="hover" href={`https://web.expasy.org/cellosaurus/${cellLine.idCellosaurus}`}>{cellLine.idCellosaurus}</a></span>
    //   </Fragment>
    // ));
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
      maxWidth: 40,
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
    }, {
      Header: 'Cellosaurus',
      accessor: 'idCellosaurus',
      Cell: props => <a className="hover" href={`https://web.expasy.org/cellosaurus/${props.value}`}>{props.value}</a>,
      maxWidth: 125,
    }];
    return (
      <Fragment>
        <header>
          <h1>List of Cell Lines</h1>
        </header>
        <main>
          <StyledWrapper className="wrapper">
            <ReactTable
              data={cellLineData}
              columns={columns}
              sortable={false}
              defaultPageSize={25}
              filterable
              className="-striped -highlight"
            />
            {/* <StyledTable className="grid-container">
              <span className="table-header">Tissue</span>
              <span className="table-header">Name</span>
              <span className="table-header">Sex</span>
              <span className="table-header">Age</span>
              <span className="table-header">Disease</span>
              <span className="table-header">Cellosaurus</span>
              {listOfCells}
            </StyledTable> */}

          </StyledWrapper>
        </main>
        <footer>
          <div className="wrapper">
            <p>Copyright © 2019. All rights reserved</p>
          </div>
        </footer>
      </Fragment>
    );
  }
}


export default Databases;
