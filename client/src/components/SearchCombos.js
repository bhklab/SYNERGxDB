/* eslint-disable no-plusplus */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { FixedSizeList as List } from 'react-window';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

import ComboResults from './ComboResults';
import banner from '../images/banner.png';


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h2 {
    color: ${colors.color_main_2};
  }
`;

const StyledBanner = styled.img`
  max-width: 500px;
`;

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
    <List height={maxHeight} itemCount={children.length} itemSize={height} initialScrollOffset={initialOffset}>
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
};

class SearchCombos extends Component {
  constructor() {
    super();
    this.state = {
      drugId1: null,
      drugId2: null,
      drugName2: null,
      sample: null,
      drugsData1: [],
      drugsData2: [],
      sampleData: [],
      showResults: false,
      drug2Placeholder: 'Enter Drug 2',
      selectedTissue: null
    };
    this.handleDrug1Search = this.handleDrug1Search.bind(this);
    this.handleDrug2Search = this.handleDrug2Search.bind(this);
    this.handleSampleSearch = this.handleSampleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/getDrugs')
      .then(response => response.json())
      .then((data) => {
        const drugsData1 = data.map(item => ({ value: item.idDrug, label: item.name }));
        this.setState({ drugsData1 });
      });
    fetch('/api/getCellLines')
      .then(response => response.json())
      .then((data) => {
        // Generates an array of unique tissue names
        // const tissueList = [...new Set(data.map(item => item.tissue))];
        const tissueObject = {};
        data.forEach((item) => {
          if (!tissueObject[item.tissue]) {
            tissueObject[item.tissue] = 1;
          } else {
            tissueObject[item.tissue]++;
          }
        });
        // const tissueData = tissueList.map(item => ({ value: item, label: item }));
        const tissueData = Object.keys(tissueObject).map(tissue => ({ value: tissue, label: `${tissue} (${tissueObject[tissue]} cell lines)` }));
        const cellsData = data.map(item => ({ value: item.idSample, label: `${item.name} (${item.tissue})` }));
        this.setState({ sampleData: [...tissueData, ...cellsData] });
      });
  }

  updateDrug2Data(sample, drugId) {
    fetch('/api/getDrugs', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sample,
        drugId,
      }),
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({drugId2: null, drugName2: null, drugsData2: []})
        if (data.length > 0) {
          const drugsData = data.map(item => ({ value: item.idDrug, label: item.name }));
          this.setState({ drugsData2: [{ value: 'Any', label: 'Any Drug' }, ...drugsData], drug2Placeholder: 'Enter Drug 2' });
        } else {
          this.setState({drug2Placeholder: "No drug combos for this cell line and drug"})
        }
      });
  }

  handleDrug1Search(drugId, event) {
    const { value } = event;
    this.setState({ drugId1: value });

    const { sample } = this.state;

    // Sends a post request to the API to retrieve relevant combo drugs for drugsData2
    if (sample) this.updateDrug2Data(sample, value);
  }

  handleDrug2Search(event) {
    const { value, label } = event;
    this.setState({ drugId2: value, drugName2: {value, label} });
  }

  handleSampleSearch(event) {
    const { value } = event;
    this.setState({ sample: value });
    const { drugId1 } = this.state;
    if (drugId1) this.updateDrug2Data(value, drugId1);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      drugId1, drugId2, sample, showResults
    } = this.state;
    if (drugId1 && drugId2 && sample) {
      this.setState({ showResults: !showResults });
    }
  }

  render() {
    const {
      drugId1, drugId2, drugsData1, showResults, drugsData2, sampleData, sample, drug2Placeholder, drugName2
    } = this.state;
    const {
      handleSampleSearch, handleDrug1Search, handleDrug2Search, handleSubmit,
    } = this;

    const isDisabled = !(drugId1 && sample && drugsData2.length > 0);
    const searchForm = (
      <Fragment>
        <StyledBanner src={banner} alt="banner" />
          <h2>
              SYNERGxDB is a database that allows users to ... drug combinations.
              Synergistic drug combination ... in chemotherapy of cancer.
          </h2>
        <StyledForm className="search-combos" onSubmit={handleSubmit}>
          <Select components={{ MenuList }} options={sampleData} placeholder="Enter Cell Line or Tissue" onChange={handleSampleSearch} />
          <Select components={{ MenuList }} options={drugsData1} placeholder="Enter Drug 1" onChange={e => handleDrug1Search('drugId1', e)} />
          <Select components={{ MenuList }} options={drugsData2} value={drugName2} isDisabled={isDisabled} placeholder={drug2Placeholder} onChange={handleDrug2Search} />
          <div className="button-container">
            <StyledButton type="submit">Search</StyledButton>
            <StyledButton type="button">Example query</StyledButton>
          </div>
        </StyledForm>
      </Fragment>
    );
    const displayedComponent = showResults ? <ComboResults sample={sample} drugId1={drugId1} drugId2={drugId2} /> : searchForm;

    return (
      <Fragment>
        <header>
          <div className="wrapper">
            <h1>SYNERGxDB</h1>
          </div>
        </header>
        <main>
          <StyledWrapper className="wrapper">
            {displayedComponent}
          </StyledWrapper>
        </main>
        <footer>
          <div className="wrapper">
            <p>Copyright © 2019. All rights reserved</p>
          </div>
        </footer>
      </Fragment>
    )
  }
}

export default SearchCombos;
