import React, { Component } from 'react';
import Select from 'react-select';
import SearchItems from './SearchItems';

import '../styles/Home.css';

class SearchCombos extends Component {
  constructor() {
    super();
    this.state = {
      toggleForm: false,
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
    if (value.length > 2) this.setState({ [dataset]: filteredDrugs });
  }

  handleCellSearch(event) {
    const { value } = event.target;
    const processedCell = value.toLowerCase();
    const { cellData } = this.state;
    const filteredCells = cellData.filter(cell => cell.toLowerCase().includes(processedCell));
    this.setState({ searchCell: value });

    // Due to large number of cell lines, filtering starts once at least 2 characters have been entered
    if (value.length > 1) this.setState({ filteredCells });
  }

  render() {
    const {
      searchDrug1, searchDrug2, searchCell, drugsData, cellData, filteredDrugs1,
    } = this.state;
    const { handleCellSearch, handleDrugSearch } = this;

    return (
      <form className="search-combos">
        <SearchItems searchType="drug-1" value={searchDrug1} handleSearch={e => handleDrugSearch('filteredDrugs1', 'searchDrug1', e)} filteredData={filteredDrugs1} />
        {/* <SearchItems searchType="Drug 2" value={searchDrug2} handleSearch={e => handleDrugSearch('filteredDrugs2', 'searchDrug2', e)} />
        <SearchItems searchType="Cell Line" value={searchCell} handleSearch={handleCellSearch} />
        <Select isSearchable options={drugsData} /> */}

      </form>
    );
  }
}

export default SearchCombos;
