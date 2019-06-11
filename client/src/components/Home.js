import React, { Component } from 'react';
import '../styles/Home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      drugsData: [],
      cellLineData: [],
      filteredDrugs1: [],
      filteredDrugs2: [],
      filteredCellLines: [],
    };
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

  render() {
    return (
      <div className="home">
        <h1>Landing page for SynergxDB</h1>
        <form>
          <input className="drug-select-1" placeholder="Please Select Drug1" />
          <input className="drug-select-2" placeholder="Please Select Drug2" />
          <input className="cell-line-select" placeholder="Please Select Cell Line" />
        </form>
      </div>
    );
  }
}

export default Home;
