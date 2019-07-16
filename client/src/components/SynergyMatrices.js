import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
    const {
      idSource, comboId, drug1, drug2,
    } = this.props;
    console.log(comboId);
    fetch(`/api/combos/matrix?comboId=${comboId}&idSource=${idSource}`)
      .then(response => response.json())
      .then((synergyData) => {
        console.log(synergyData);
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

SynergyMatrices.propTypes = {
  drug1: PropTypes.string.isRequired,
  drug2: PropTypes.string.isRequired,
  comboId: PropTypes.number.isRequired,
  idSource: PropTypes.number.isRequired,
};

export default SynergyMatrices;
