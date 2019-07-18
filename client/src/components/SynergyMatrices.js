/* eslint-disable max-len */
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
    fetch(`/api/combos/matrix?comboId=${comboId}&idSource=${idSource}`)
      .then(response => response.json())
      .then((synergyData) => {
        console.log(synergyData);
        this.setState({ synergyData });
      });
  }

  render() {
    const { synergyData } = this.state;
    const {
      idSource, comboId, drug1, drug2,
    } = this.props;
    const generateTable = (accessor, dataset) => {
      const comboInfo = {};
      dataset.forEach((item) => {
        // eslint-disable-next-line no-unused-expressions
        comboInfo[item.concB] === undefined ? comboInfo[item.concB] = [{ concA: item.concA, [accessor]: item[accessor] }] : comboInfo[item.concB].push({ concA: item.concA, [accessor]: item[accessor] });
      });
      const columns = Object.keys(comboInfo).map(key => ({ Header: `${key} µM`, accessor }));
      columns.unshift({ Header: `${drug1.name}`, accessor: 'concA' });
      console.log(columns, comboInfo);
    };
    const columnsRaw = [{
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
    generateTable('raw_matrix', synergyData);
    return (
      <div className="synergy-matrix">
        <h2>Synergy Matrices</h2>
      </div>
    );
  }
}

SynergyMatrices.propTypes = {
  drug1: PropTypes.shape({
    name: PropTypes.string,
    idDrug: PropTypes.number,
  }).isRequired,
  drug2: PropTypes.shape({
    name: PropTypes.string,
    idDrug: PropTypes.number,
  }).isRequired,
  comboId: PropTypes.number.isRequired,
  idSource: PropTypes.number.isRequired,
};

export default SynergyMatrices;
