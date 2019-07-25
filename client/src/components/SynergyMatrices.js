/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../styles/colors';
import 'react-table/react-table.css';
import transitions from '../styles/transitions';

import Plot3D from './Plots/Plot3D';

const SynergyContainer = styled.div`

  button {
    font-size: 1.5em;
    background: ${colors.nav_links};
    border: 1px solid ${colors.nav_links};
    padding: 10px 20px;
    margin: 10px 0;
    color: #ffffff;
    transition: ${transitions.main_trans};
    outline-style: none;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    width: 20%;
  
    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${colors.button_hover};
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transform-origin: 0 50%;
      transform-origin: 0 50%;
      -webkit-transition-property: transform;
      transition-property: transform;
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
    }
  
    &:hover,
    &:focus,
    &.active-score {
      color: ${colors.nav_links};
      
      border: 1px solid ${colors.nav_links};
      cursor:pointer;

      &:before {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }
  }
`;

class SynergyMatrices extends Component {
  constructor() {
    super();
    this.state = {
      synergyData: [],
      selectedType: 0,
      dataTypes: ['raw_matrix', 'bliss_matrix', 'loewe_matrix', 'hsa_matrix', 'zip_matrix'],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const {
      idSource, comboId,
    } = this.props;

    fetch(`/api/combos/matrix?comboId=${comboId}&idSource=${idSource}`)
      .then(response => response.json())
      .then((synergyData) => {
        this.setState({ synergyData });
      });
  }

  handleClick(selectedType) {
    this.setState({ selectedType });
  }

  render() {
    const { handleClick } = this;
    const { drug1, drug2 } = this.props;
    const { synergyData, dataTypes, selectedType } = this.state;
    const generateTable = () => {
      const comboInfo = {};
      synergyData.forEach((item) => {
        // eslint-disable-next-line no-unused-expressions
        comboInfo[item.concA] === undefined ? comboInfo[item.concA] = [{ concB: item.concB, [dataTypes[selectedType]]: item[dataTypes[selectedType]] }] : comboInfo[item.concA].push({ concB: item.concB, [dataTypes[selectedType]]: item[dataTypes[selectedType]] });
      });
      // Building column structure
      const subcolumns = Object.values(comboInfo).map((item, index) => ({
        Header: `${item[index].concB} µM`,
        accessor: `${dataTypes[selectedType]}.${index}`,
        Cell: props => <div style={{ textAlign: 'center' }}>{props.value.toFixed(4)}</div>,
      }));
      const columns = [{
        Header: `${drug2.name}`,
        accessor: 'key',
        Cell: props => (
          <div className="raw-names">
            {props.value}
            {' '}
            µM
          </div>
        ),
      }, {
        Header: `${drug1.name}`,
        headerClassName: 'header-name',
        columns: subcolumns,
      }];
      // Format the data to be usable by react table
      const tableData = Object.entries(comboInfo).map((item) => {
        const scoreObj = {};
        item[1].forEach((conc, index) => {
          scoreObj[index] = conc[dataTypes[selectedType]];
        });
        return ({ key: item[0], [dataTypes[selectedType]]: scoreObj });
      });
      return (
        <ReactTable
          data={tableData}
          columns={columns}
          showPagination={false}
          sortable={false}
          defaultPageSize={tableData.length}
          className="-highlight"
        />
      );
    };
    console.log(synergyData instanceof Array);
    return (
      <div className="synergy-matrix">
        <h2>Synergy Matrices</h2>
        <SynergyContainer>
          <button
            type="button"
            onClick={() => handleClick(0)}
            className={selectedType === 0 ? 'active-score' : null}
          >
            Input
          </button>
          <button
            type="button"
            onClick={() => handleClick(1)}
            className={selectedType === 1 ? 'active-score' : null}
          >
            Bliss
          </button>
          <button
            type="button"
            onClick={() => handleClick(2)}
            className={selectedType === 2 ? 'active-score' : null}
          >
            Loewe
          </button>
          <button
            type="button"
            onClick={() => handleClick(3)}
            className={selectedType === 3 ? 'active-score' : null}
          >
          HSA
          </button>
          <button
            type="button"
            onClick={() => handleClick(4)}
            className={selectedType === 4 ? 'active-score' : null}
          >
            ZIP
          </button>
        </SynergyContainer>
        {synergyData.length > 0 ? generateTable() : null}
        {synergyData.length > 0 && selectedType !== 0
          ? (
            <Plot3D
              drug1={drug1}
              drug2={drug2}
              data={synergyData}
              type={dataTypes[selectedType]}
            />
          ) : null}
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
