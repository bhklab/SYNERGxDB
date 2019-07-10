/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';
import { FixedSizeList as List } from 'react-window';
import colors from '../styles/colors';
import transitions from '../styles/transitions';

import ComboResults from './ComboResults';
import Stats from './Stats';
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
  max-height: 400px;
`;

const StyledForm = styled.form`
  max-width: 700px;
  width: 100%;
  background-color: ${colors.trans_color_main_3};
  margin: 5px;
  padding: 10px;
  padding-top: 25px;
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
    min-width: 350px;
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
  &[type="button"] {
    font-size: 1.2em;
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
      drugId1: null,
      drugId2: null,
      sample: 'Any',
      drugsData1: [],
      drugsData2: [],
      sampleData: [],
      showResults: false,
      selectedSample: { value: 'Any', label: 'Any Sample' },
      selectedDrug1: null,
      selectedDrug2: null,
      drug2Placeholder: 'Enter Drug B',
    };
    this.handleDrug1Search = this.handleDrug1Search.bind(this);
    this.handleDrug2Search = this.handleDrug2Search.bind(this);
    this.handleSampleSearch = this.handleSampleSearch.bind(this);
    this.userRedirect = this.userRedirect.bind(this);
    this.handleExample = this.handleExample.bind(this);
  }

  componentDidMount() {
    fetch('/api/drugs')
      .then(response => response.json())
      .then((data) => {
        const drugsData1 = data.map(item => ({ value: item.idDrug, label: item.name }));
        this.setState({ drugsData1 });
      });
    fetch('/api/cell_lines')
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
        const tissueData = Object.keys(tissueObject).map(tissue => ({ value: tissue, label: `${tissue.toUpperCase()} (${tissueObject[tissue]} cell lines)` }));
        const cellsData = data.map(item => ({ value: item.idSample, label: `${item.name.toUpperCase()} (${item.tissue.toUpperCase()})` }));
        this.setState({ sampleData: [{ value: 'Any', label: 'Any Sample' }, ...tissueData, ...cellsData] });
      });
  }

  userRedirect() {
    const {
      drugId1, drugId2, sample,
    } = this.state;
    if (drugId1 && drugId2 && sample) {
      const { history } = this.props;
      // Redirects user to synergy scores page
      history.push(`/synergy_score?drugId1=${drugId1}&drugId2=${drugId2}&sample=${sample}`);
    }
    return null;
  }

  handleDrug1Search(drugId, event) {
    const { value, label } = event;
    this.setState({ drugId1: value, selectedDrug1: { value, label } });
    const { sample } = this.state;

    // Sends a post request to the API to retrieve relevant combo drugs for drugsData2
    if (sample) this.updateDrug2Data(sample, value);
  }

  handleDrug2Search(event) {
    const { value, label } = event;
    this.setState({ drugId2: value, selectedDrug2: { value, label } });
  }

  handleSampleSearch(event) {
    const { value, label } = event;
    this.setState({ sample: value, selectedSample: { value, label } });
    const { drugId1 } = this.state;
    if (drugId1) this.updateDrug2Data(value, drugId1);
  }

  updateDrug2Data(sample, drugId) {
    const requestBody = { drugId };
    if (sample !== 'Any') requestBody.sample = sample;
    fetch('/api/drugs', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ drugId2: null, selectedDrug2: null, drugsData2: [] });
        if (data.length > 0) {
          const drugsData = data.map(item => ({ value: item.idDrug, label: item.name }));
          drugsData.sort((a, b) => {
            if (a.value > b.value) return 1;
            if (a.value < b.value) return -1;
            return 0;
          });
          this.setState({ drugsData2: [{ value: 'Any', label: 'Any Drug' }, ...drugsData], drug2Placeholder: 'Enter Drug B' });
        } else {
          this.setState({ drug2Placeholder: 'No drug combos for this cell line and drug' });
        }
      });
  }


  // Generates an example for user and updates react component
  handleExample() {
    this.updateDrug2Data('Any', 11);
    // updateDrug2Data is asynchronous function and drugId2 can only be updated after it executes
    setTimeout(
      () => {
        this.setState({
          selectedSample: { value: 'Any', label: 'Any Sample' },
          selectedDrug1: { label: 'Bortezomib', value: 11 },
          selectedDrug2: { label: 'Topotecan', value: 97 },
          drugId1: 11,
          drugId2: 97,
        });
      },
      500,
    );
  }

  render() {
    const {
      drugId1, drugId2, drugsData1, showResults, drugsData2, sampleData, sample,
      selectedSample, selectedDrug1, selectedDrug2, drug2Placeholder,
    } = this.state;
    const {
      handleSampleSearch, handleDrug1Search, handleDrug2Search, userRedirect, handleExample,
    } = this;

    const isDisabled = !(drugId1 && sample && drugsData2.length > 0);
    const searchForm = (
      <Fragment>
        <Stats />
        <StyledBanner src={banner} alt="banner" />
        <h2>
          SYNERGxDB is a comprehensive database to explore synergistic drug combinations for biomarker discovery.
        </h2>
        <StyledForm className="search-combos">
          <Select
            components={{ MenuList }}
            options={sampleData}
            placeholder="Enter Cell Line or Tissue"
            onChange={handleSampleSearch}
            value={selectedSample}
          />
          <Select
            components={{ MenuList }}
            options={drugsData1}
            placeholder="Enter Drug A"
            onChange={e => handleDrug1Search('drugId1', e)}
            value={selectedDrug1}
          />
          <Select
            components={{ MenuList }}
            options={drugsData2}
            isDisabled={isDisabled}
            placeholder={drug2Placeholder}
            value={selectedDrug2}
            onChange={handleDrug2Search}
          />
          <StyledButton onClick={handleExample} type="button">Example Query</StyledButton>
          <StyledButton onClick={userRedirect} type="button">Search</StyledButton>
        </StyledForm>
      </Fragment>
    );
    const displayedComponent = showResults ? <ComboResults sample={sample} drugId1={drugId1} drugId2={drugId2} /> : searchForm;

    return (
      <Fragment>
        <header />
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
    );
  }
}

export default withRouter(SearchCombos);
