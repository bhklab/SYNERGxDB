import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { FixedSizeList as List } from 'react-window';
// import SearchItems from './SearchItems';
// import MenuList from './MenuList';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

const StyledForm = styled.form`
  max-width: 700px;
  width: 100%;
  background-color: ${colors.trans_color_main_3};
  margin: 5px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .button-container {
    min-width: 300px;
    width: 50%;
    display: flex;
    justify-content: space-between;
  }
  input {
    color: ${colors.color_main_1};
    border: 2px solid ${colors.trans_color_main_5};
    min-width: 300px;
    width: 50%;
    padding: 10px;
    margin: 10px auto;
    outline-style: none;
    background-color: ${colors.trans_color_main_5};

    &::placeholder {
      color: ${colors.color_main_4};
    }
    &:focus {
      border: 2px solid ${colors.color_main_2};
      background-color: ${colors.trans_color_main_4};
      &::placeholder {
      color: ${colors.color_main_3};
    }
  }
`;
const StyledButton = styled.button`
  font-size: 1.5em;
  font-weight: bold; 
  background: none;
  border: none;
  padding: 10px 2px;
  color: ${colors.color_main_1};
  transition: ${transitions.main_trans};
  outline-style: none;

  &:hover {
    color: ${colors.color_main_4}
  }
`;


const MenuList = (props) => {
  const height = 50;
  const {
    options, children, maxHeight, getValue,
  } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};

class SearchCombos extends Component {
  constructor() {
    super();
    this.state = {
      drugId1: 0,
      drugId2: 0,
      cellId: '',
      drugsData: [],
      cellsData: [],
    };
    this.handleDrugSearch = this.handleDrugSearch.bind(this);
    this.handleCellSearch = this.handleCellSearch.bind(this);
  }

  componentDidMount() {
    fetch('/api/getDrugs')
      .then(response => response.json())
      .then((data) => {
        const drugsData = data.map(item => ({ value: item.idDrug, label: item.name }));
        this.setState({ drugsData });
      });
    fetch('/api/getCellLines')
      .then(response => response.json())
      .then((data) => {
        const cellsData = data.map(item => ({ value: item.idSample, label: item.name }));
        this.setState({ cellsData });
      });
  }

  handleDrugSearch(drugId, event) {
    const { value } = event;
    this.setState({ [drugId]: value });
  }

  handleCellSearch(event) {
    const { value } = event;
    this.setState({ cellId: value });
  }

  render() {
    const {
      searchDrug1, searchDrug2, searchCell, filteredDrugs1, filteredDrugs2, filteredCells, cellsData, drugsData,
    } = this.state;
    const { handleCellSearch, handleDrugSearch } = this;

    return (
      <StyledForm className="search-combos">
        {/* <SearchItems placeholder="Enter cell line" searchType="cell-line-input" value={searchCell} handleSearch={handleCellSearch} filteredData={filteredCells} />
        <SearchItems placeholder="Enter drug name" searchType="drug-1-input" value={searchDrug1} handleSearch={e => handleDrugSearch('filteredDrugs1', 'searchDrug1', e)} filteredData={filteredDrugs1} />
        <SearchItems placeholder="Enter second drug name" searchType="drug-2-input" value={searchDrug2} handleSearch={e => handleDrugSearch('filteredDrugs2', 'searchDrug2', e)} filteredData={filteredDrugs2} /> */}
        <Select components={{ MenuList }} options={cellsData} placeholder="Cell Line..." onChange={handleCellSearch} />
        <Select components={{ MenuList }} options={drugsData} placeholder="Drug Name..." onChange={e => handleDrugSearch('drugId1', e)} />
        <Select components={{ MenuList }} options={drugsData} placeholder="Drug Name..." onChange={e => handleDrugSearch('drugId2', e)} />
        <Select components={{ MenuList }} options={cellsData} placeholder="Tissue..." />
        <div className="button-container">
          <StyledButton type="submit">Search</StyledButton>
          <StyledButton type="button">Example query</StyledButton>
        </div>
      </StyledForm>
    );
  }
}

export default SearchCombos;
