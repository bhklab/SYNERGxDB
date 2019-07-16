import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';
import ReactTable from 'react-table';
// import colors from '../styles/colors';
import 'react-table/react-table.css';

// import transitions from '../styles/transitions';


class SynergyMatrices extends Component {
  constructor() {
    super();
    this.state = {
      synergyData: [],
      selectedComponent: null,
    };
  }

  componentDidMount() {
    fetch('/api/datasets/')
      .then(response => response.json())
      .then((synergyData) => {
        this.setState({ synergyData });
      });
  }

  render() {
    const columns = [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
    }, {
      Header: 'Source',
      accessor: 'author',
    }, {
      Header: '# of cell lines',
      accessor: 'no_samples',
    }, {
      Header: '# of drugs',
      accessor: 'no_drugs',
    }, {
      Header: 'Design',
      accessor: 'combo',
    }];
    return (
      <div className="synergy-matrix">
        <h2>Synergy Matrices</h2>
      </div>
    );
  }
}


export default SynergyMatrices;
