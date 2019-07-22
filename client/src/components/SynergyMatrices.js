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
      type: 'raw_matrix',
    };
  }

  componentDidMount() {
    const {
      idSource, comboId, drug1, drug2,
    } = this.props;

    fetch(`/api/combos/matrix?comboId=${comboId}&idSource=${idSource}`)
      .then(response => response.json())
      .then((synergyData) => {
        console.log('raw data', synergyData);
        this.setState({ synergyData });
      });
  }

  render() {
    const {
      idSource, comboId, drug1, drug2,
    } = this.props;
    const { synergyData, type } = this.state;
    const generateTable = () => {
      const comboInfo = {};
      synergyData.forEach((item) => {
        // eslint-disable-next-line no-unused-expressions
        comboInfo[item.concB] === undefined ? comboInfo[item.concB] = [{ concA: item.concA, [type]: item[type] }] : comboInfo[item.concB].push({ concA: item.concA, [type]: item[type] });
      });
      // Building column structure
      const columns = Object.values(comboInfo).map((item, index) => {
        console.log('here', index);
        return ({
          Header: `${item[index].concA} µM`,
          accessor: `${type}.${index}`,
        });
      });
      columns.unshift({
        Header: `${drug2.name}`,
        accessor: 'key',
        Cell: props => (
          <span className="number">
            {props.value}
            {' '}
            µM
          </span>
        ),
      });
      // Format the data to be usable by react table
      const tableData = Object.entries(comboInfo).map((item) => {
        const scoreObj = {};
        item[1].forEach((conc, index) => {
          scoreObj[index] = conc[type];
        });
        return ({ key: item[0], [type]: scoreObj });
      });
      // console.log('combo info', comboInfo);
      console.log('table data', tableData);
      console.log('Columns', columns);
      console.log('comboInfo', comboInfo);
      return (
        <ReactTable
          data={tableData}
          columns={columns}
          sortable
          showPagination={false}
          defaultPageSize={tableData.length}
          className="-highlight"
        />
      );
    };
    generateTable();

    return (
      <div className="synergy-matrix">
        <h2>Synergy Matrices</h2>
        {synergyData.length > 0 ? generateTable() : null}
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
