import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';
import colors from '../styles/colors';
import 'react-table/react-table.css';
import transitions from '../styles/transitions';

import Plot3D from './Plots/Plot3D';

import { ComboContext } from './Context/ComboContext';

const SynergyContainer = styled.div`
  padding-bottom: 10px;
  border-bottom: 2px solid ${colors.color_main_3};
  margin-bottom: 10px;
`;


const ButtonContainer = styled.div`
  display: flex;

  button {
    font-size: 1.5em;
    background: ${colors.nav_links};
    border: 1px solid ${colors.nav_links};
    padding: 10px 20px;
    margin: 10px 0;
    color: #ffffff;
    transition: ${transitions.main_trans};
    outline-style: none;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    flex-grow: 1;
  
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
      color: white;
      
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
  static contextType = ComboContext

  constructor() {
    super();
    this.state = {
      selectedType: 0,
      dataTypes: ['raw_matrix', 'bliss_matrix', 'loewe_matrix', 'hsa_matrix', 'zip_matrix'],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(selectedType) {
    this.setState({ selectedType });
  }

  render() {
    const { handleClick } = this;
    const { drugsData, cellData, synergyData } = this.context;
    const {
      dataTypes, selectedType,
    } = this.state;
    console.log(synergyData);
    const generateTable = () => {
      const comboInfo = {};
      synergyData.forEach((item) => {
        // eslint-disable-next-line no-unused-expressions
        comboInfo[item.concA] === undefined
          ? comboInfo[item.concA] = [{
            concB: item.concB, [dataTypes[selectedType]]: item[dataTypes[selectedType]],
          }]
          : comboInfo[item.concA].push({
            concB: item.concB, [dataTypes[selectedType]]: item[dataTypes[selectedType]],
          });
      });
      const concBArray = [...new Set(synergyData.map(item => item.concB))];
      // Building column structure
      const subcolumns = concBArray.map((item, index) => ({
        Header: `${item} µM`,
        accessor: `${dataTypes[selectedType]}.${index}`,
        Cell: props => <div style={{ textAlign: 'center' }}>{props.value !== null ? props.value.toFixed(3) : '-'}</div>,
      }));
      const columns = [{
        Header: `${cellData.name}`,
        headerClassName: 'header-name',
        accessor: 'key',
        columns: [{
          Header: `${drugsData[0].name}`,
          headerClassName: 'header-name',
          accessor: 'key',
          Cell: props => (
            <div className="raw-names">
              {props.value}
              {' '}
              µM
            </div>
          ),
        }],
      }, {
        Header: `${drugsData[1].name}`,
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

    // checks if there is any dat for the given synergy score
    const scoreExist = accessor => synergyData.every(item => item[accessor] !== null);
    return (
      <SynergyContainer>
        <h2>Synergy Matrices</h2>
        <ButtonContainer>
          <button
            type="button"
            onClick={() => handleClick(0)}
            className={selectedType === 0 ? 'active-score' : null}
          >
            Input
          </button>
          { scoreExist('zip_matrix')
            ? (
              <button
                type="button"
                onClick={() => handleClick(4)}
                className={selectedType === 4 ? 'active-score' : null}
              >
                ZIP
              </button>
            ) : null }
          { scoreExist('bliss_matrix')
            ? (
              <button
                type="button"
                onClick={() => handleClick(1)}
                className={selectedType === 1 ? 'active-score' : null}
              >
                Bliss
              </button>
            ) : null }

          { scoreExist('loewe_matrix')
            ? (
              <button
                type="button"
                onClick={() => handleClick(2)}
                className={selectedType === 2 ? 'active-score' : null}
              >
                Loewe
              </button>
            ) : null }

          { scoreExist('hsa_matrix')
            ? (
              <button
                type="button"
                onClick={() => handleClick(3)}
                className={selectedType === 3 ? 'active-score' : null}
              >
                HSA
              </button>
            ) : null }

          

        </ButtonContainer>
        {synergyData.length > 0 ? generateTable() : null}
        {synergyData.length > 0 && selectedType !== 0
          ? (
            <Plot3D
              data={synergyData}
              type={selectedType}
            />
          ) : null}
      </SynergyContainer>
    );
  }
}

export default SynergyMatrices;
