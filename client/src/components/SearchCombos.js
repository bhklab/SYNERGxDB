import React, { Component } from 'react';
import styled from 'styled-components';
import SearchItems from './SearchItems';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

const StyledForm = styled.form`
  max-width: 700px;
  background-color: ${colors.trans_color_main_3};
  margin: 5px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    min-width: 250px;
    max-width: 500px;
    padding: 5px 0;
    margin: 10px auto;
  }
`;

const StyledButton = styled.button`
  font-size: 1.5em;
  font-weight: bold; 
  background: none;
  border: none;
  padding: 10px;
  width: 100px;
  color: ${colors.color_main_1};
  transition: ${transitions.main_trans};
  outline-style: none;

  &:hover {
    color: ${colors.color_main_4}
  }
`;

class SearchCombos extends Component {
  constructor() {
    super();
    this.state = {
      searchDrug1: '',
      searchDrug2: '',
      searchCell: '',
      drugsData: [],
      cellData: [],
      filteredDrugs1: [],
      filteredDrugs2: [],
      filteredCells: [],
    };
    this.handleDrugSearch = this.handleDrugSearch.bind(this);
    this.handleCellSearch = this.handleCellSearch.bind(this);
  }

  componentDidMount() {
    fetch('/api/getDrugs')
      .then(response => response.json())
      .then((data) => {
        this.setState({ drugsData: data });
      });
    fetch('/api/getCellLines')
      .then(response => response.json())
      .then((data) => {
        this.setState({ cellData: data });
      });
  }

  handleDrugSearch(dataset, inputType, event) {
    const { value } = event.target;
    const processedDrug = value.toLowerCase();
    const { drugsData } = this.state;
    const filteredDrugs = drugsData.filter(drug => drug.toLowerCase().includes(processedDrug));
    this.setState({ [inputType]: value });

    // Due to large number of drugs, filtering starts after 3 characters have been entered
    value.length > 2 ? this.setState({ [dataset]: filteredDrugs }) : this.setState({ [dataset]: [] });
  }

  handleCellSearch(event) {
    const { value } = event.target;
    const processedCell = value.toLowerCase();
    const { cellData } = this.state;
    const filteredCells = cellData.filter(cell => cell.toLowerCase().includes(processedCell));
    this.setState({ searchCell: value });

    // Due to large number of cell lines, filtering starts once at least 2 characters have been entered
    value.length > 1 ? this.setState({ filteredCells }) : this.setState({ filteredCells: [] });
  }

  render() {
    const {
      searchDrug1, searchDrug2, searchCell, filteredDrugs1, filteredDrugs2, filteredCells,
    } = this.state;
    const { handleCellSearch, handleDrugSearch } = this;

    return (
      <StyledForm className="search-combos">
        <SearchItems placeholder="Enter drug name" searchType="drug-1-input" value={searchDrug1} handleSearch={e => handleDrugSearch('filteredDrugs1', 'searchDrug1', e)} filteredData={filteredDrugs1} />
        <SearchItems placeholder="Enter second drug name" searchType="drug-2-input" value={searchDrug2} handleSearch={e => handleDrugSearch('filteredDrugs2', 'searchDrug2', e)} filteredData={filteredDrugs2} />
        <SearchItems placeholder="Enter cell line" searchType="cell-line-input" value={searchCell} handleSearch={handleCellSearch} filteredData={filteredCells} />
        <StyledButton type="submit">Search</StyledButton>
      </StyledForm>
    );
  }
}

export default SearchCombos;
