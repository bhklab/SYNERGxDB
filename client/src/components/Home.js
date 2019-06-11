import React, { Component } from 'react';
import SearchItems from './SearchItems';
import '../styles/Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      toggleForm: false,
      searchDrug1: '',
      searchDrug2: '',
      searchCell: '',
      drugsData: [],
      cellLineData: [],
      filteredDrugs1: [],
      filteredDrugs2: [],
      filteredCellLines: [],
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
        this.setState({ cellLineData: data });
      });
  }

  handleDrugSearch(event) {
    const { value } = event.target;
  }

  handleCellSearch(event) {
    const { value } = event.target;
  }

  render() {
    const { searchDrug1, searchDrug2, searchCell } = this.state;
    const { handleCellSearch, handleDrugSearch } = this;

    return (
      <div className="home">
        <h1>Landing page for SynergxDB</h1>
        <form>
          <SearchItems searchType="Drug 1" value={searchDrug1} handleSearch={handleDrugSearch} />
          <SearchItems searchType="Drug 2" value={searchDrug2} handleSearch={handleDrugSearch} />
          <SearchItems searchType="Cell Line" value={searchCell} handleSearch={handleCellSearch} />
        </form>
      </div>
    );
  }
}

export default Home;
