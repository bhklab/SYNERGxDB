/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import Select, { components } from 'react-select';

// import { FixedSizeList as List } from 'react-window';
import colors from '../styles/colors';
import transitions from '../styles/transitions';
import Stats from './Stats';
import MenuList from './MenuList';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    color: ${colors.nav_links};
    font-family:'Raleway', sans-serif;
    font-weight:700;
  }
  h1 span {
    color: ${colors.nav_link_hov};
    font-family:'Raleway', sans-serif;
    font-weight:800;
    font-size: 1.15em;
  }
`;

const StyledForm = styled.form`
  max-width: 800px;
  width: 100%;
  background-color: rgb(255,255,255,0.85); 
  border-radius:25px;
  margin: 5px;
  padding:25px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;

  .select-container {
    min-width: 300px;
    max-width: 49%
  }
  
  .button-container {
    min-width: 300px;
    width: 50%;
    display: flex;
    justify-content: space-between;
  }
  input {
    color: ${colors.nav_links};
    border: none;
    min-width: 350px;
    width: 50%;
    padding: 13px;
    margin: 10px auto;
    outline-style: none;
    background: transparent !important;

    &::placeholder {
      color: ${colors.nav_links};
    }
    &:focus {
      border: 2px solid ${colors.color_main_2};
      background-color: ${colors.trans_color_main_4};
      outline:none;
      
      &::placeholder {
      color: white;
    }
  }
  .option-label {
    font-size: 25px;
  }
  
`;

const customStyles = {
  control: provided => ({
    ...provided,
    background: 'rgb(0,0,0,0)',
    border: '1px solid #3a5386',
    margin: '5px 0px',
    '&:hover': {
      border: '1px solid #3a5386',
      cursor: 'text',
    },
  }),
  placeholder: provided => ({
    ...provided,
    color: '#3a5386',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: '#3a5386',
    '&:hover': {
      color: '#3a5386',
      cursor: 'pointer',
    },
  }),

  indicatorSeparator: provided => ({
    ...provided,
    background: '#3a5386',
    '&:hover': {
      background: '#3a5386',
    },
  }),
  singleValue: provided => ({
    ...provided,
    color: '#3a5386',
  }),
  option: (provided, state) => ({
    ...provided,
    textAlign: state.isDisabled ? 'left' : 'center',
    fontWeight: state.isDisabled ? '700' : state.isSelected ? '700' : '400',
    background: state.isDisabled ? colors.summary_bg : 'white',
    color: state.isSelected ? colors.color_main_2 : colors.nav_links,
  }),
};

// to style group label https://codesandbox.io/s/hhgf4?module=/example.js
const groupStyles = {
  fontSize: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom:"1px solid " + colors.blue_main,
  color: colors.blue_main,
  padding: "5px"
};
const groupBadgeStyles = {
  backgroundColor: colors.blue_main,
  borderRadius: "2em",
  color: "white",
  display: "inline-block",
  fontSize: 15,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.2em 0.5em",
  textAlign: "center"
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

// end group label style

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  background: ${colors.nav_links};
  border: 1px solid ${colors.nav_links};
  border-radius:10px;
  padding: 10px 20px;
  margin: 10px auto;
  color: #ffffff;
  transition: ${transitions.main_trans};
  outline-style: none;

  &:hover {
    color: ${colors.nav_links};
    background: ${colors.nav_bg};
    border: 1px solid ${colors.nav_links};
    cursor:pointer;
  }
  &[type="button"] {
    font-size: 2em;
  }
`;
const ExampleSpan = styled.span`
  font-size: 1.1rem;
  text-align: left;
  margin: 10px;
  font-style: italic;
  font-family: 'Raleway', sans-serif;
  font-weight:700;
  color:${colors.blue_main};

  a {
    font-style: normal;
    color:${colors.blue_main};
    font-weight:400;
    

    &:hover {
      color:${colors.nav_link_hov};
    }
  }
`;

// Wraps the react-select to use a better filter method, current one relies on indexOf which isn't great for searching large lists
// New custom search matches if all words in box are found anywhere in the option.label, case in-sensitive
const customFilterOption = (option, rawInput) => {
  if (option.data.isDisabled) {
    return true;
  }
  const words = rawInput.split(' ');
  return words.reduce(
    (acc, cur) => acc && option.label.toLowerCase().includes(cur.toLowerCase()),
    true,
  );
};

const CustomOption = innerProps => (
  <components.Option {...innerProps}>
    <div
      style={{
        backgroundColor: innerProps.isFocused ? !innerProps.isDisabled ? colors.trans_color_main_5 : 'inherit' : 'inherit',
        width: '350px',
        height: '50px',
        padding: 'auto',
        margin: '0',
        display: 'flex',
        justifyContent: innerProps.isDisabled ? 'flex-start' : 'center',
        alignItems: 'center',
      }}
    >
      <span>{innerProps.label}</span>
    </div>
  </components.Option>
);


class SearchCombos extends Component {
  constructor() {
    super();
    this.state = {
      drugId1: 'Any',
      drugId2: 'Any',
      sample: 'Any',
      dataset: 'Any',
      drugsData1: [],
      drugsData2: [],
      sampleData: [],
      datasetData: [],
      selectedSample: { value: 'Any', label: 'Any Sample' },
      selectedDrug1: null,
      selectedDrug2: null,
      selectedDataset: { value: 'Any', label: 'Any Dataset' },
      drug2Placeholder: 'Enter Drug B',
      allowRedirect: true,
    };
    this.handleDrug1Search = this.handleDrug1Search.bind(this);
    this.handleDrug2Search = this.handleDrug2Search.bind(this);
    this.handleSampleSearch = this.handleSampleSearch.bind(this);
    this.userRedirect = this.userRedirect.bind(this);
    // this.handleExample = this.handleExample.bind(this);
    this.handleDatasetSearch = this.handleDatasetSearch.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.checkUserInput = this.checkUserInput.bind(this);
  }

  componentDidMount() {
    fetch('/api/drugs')
      .then(response => response.json())
      .then((data) => {
        const drugsData1 = data.map(item => ({ value: item.idDrug, label: item.name }));
        this.setState({ drugsData1: [{ value: 'Any', label: 'Any Sample' }, ...drugsData1] });
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
        // this.setState({
        //   sampleData: [
        //     { value: 'Any', label: 'Any Sample' },
        //     {
        //       value: 'Tissue', label: 'Tissues', isDisabled: true, isSearchable: false,
        //     },
        //     ...tissueData,
        //     {
        //       value: 'Cells', label: 'Cell Lines', isDisabled: true, isSearchable: false,
        //     },
        //     ...cellsData,
        //   ],
        // });
        this.setState({
          sampleData: [
            {
              label: "Tissues",
              options: tissueData,
            },
            
            {
              label: "Cell Lines",
              options: cellsData,
            }
          ],
        });
      });
    fetch('/api/datasets/')
      .then(response => response.json())
      .then((data) => {
        const datasets = data.map(source => ({ value: source.idSource, label: source.name }));
        this.setState({ datasetData: [{ value: 'Any', label: 'Any Dataset' }, ...datasets] });
      });
  }

  userRedirect() {
    const {
      drugId1, drugId2, sample, dataset, allowRedirect,
    } = this.state;
    if (this.checkUserInput() && allowRedirect) {
      const { history } = this.props;
      let queryParams = '';
      if (drugId1 !== 'Any') queryParams = queryParams.concat(`drugId1=${drugId1}`);
      if (sample !== 'Any') queryParams = queryParams.concat(`&sample=${sample}`);
      if (dataset !== 'Any') queryParams = queryParams.concat(`&dataset=${dataset}`);
      if (drugId2 !== 'Any') queryParams = queryParams.concat(`&drugId2=${drugId2}`);
      // Redirects user to synergy scores page
      history.push('/synergy_score?'.concat(queryParams));
    }
    return null;
  }

  // verify if user inputs at least one serach parameter
  checkUserInput() {
    const {
      drugId1, drugId2, sample, dataset,
    } = this.state;
    return drugId1 !== 'Any' || sample !== 'Any' || dataset !== 'Any' || drugId2 !== 'Any';
  }

  handleEnterPress(e) {
    if (e.key === 'Enter') this.userRedirect();
  }

  handleDrug1Search(drugId, event) {
    const { value, label } = event;
    const { sample, dataset } = this.state;
    this.setState({ drugId1: value, selectedDrug1: { value, label } });

    // Sends a post request to the API to retrieve relevant combo drugs for drugsData2
    if (sample && dataset) this.updateDrug2Data(sample, dataset, value);
  }

  handleDrug2Search(event) {
    const { value, label } = event;
    this.setState({ drugId2: value, selectedDrug2: { value, label } });
  }

  handleSampleSearch(event) {
    const { value, label } = event;
    const { dataset, drugId1 } = this.state;
    this.setState({ sample: value, selectedSample: { value, label } });
    if (drugId1 !== 'Any') this.updateDrug2Data(value, dataset, drugId1);
  }

  handleDatasetSearch(event) {
    const { value, label } = event;
    const { sample, drugId1 } = this.state;
    this.setState({ dataset: value, selectedDataset: { value, label } });
    if (drugId1 !== 'Any') this.updateDrug2Data(sample, value, drugId1);
  }

  updateDrug2Data(sample, dataset, drugId) {
    const requestBody = { };
    if (drugId !== 'Any') requestBody.drugId = drugId;
    if (sample !== 'Any') requestBody.sample = sample;
    if (dataset !== 'Any') requestBody.dataset = dataset;
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
        this.setState({
          drugId2: 'Any', selectedDrug2: null, drugsData2: [],
        });
        if (data.length > 0) {
          const drugsData = data.map(item => ({ value: item.idDrug, label: item.name }));
          this.setState({ drugsData2: [{ value: 'Any', label: 'Any Drug' }, ...drugsData], drug2Placeholder: 'Enter Drug B', allowRedirect: true });
        } else {
          this.setState({ drug2Placeholder: 'No drug combos for entered request parameters', allowRedirect: false });
        }
      });
  }


  // Generates an example for user and updates react component
  // handleExample() {
  //   this.updateDrug2Data('Any', 11);
  //   // updateDrug2Data is asynchronous function and drugId2 can only be updated after it executes
  //   setTimeout(
  //     () => {
  //       this.setState({
  //         selectedSample: { value: 'Any', label: 'Any Sample' },
  //         selectedDrug1: { label: 'Bortezomib', value: 11 },
  //         selectedDrug2: { label: 'Topotecan', value: 97 },
  //         drugId1: 11,
  //         drugId2: 97,
  //       });
  //     },
  //     500,
  //   );
  // }

  render() {
    const {
      drugsData1, drugsData2, sampleData,
      selectedSample, selectedDrug1, selectedDrug2, drug2Placeholder, datasetData,
      selectedDataset,
    } = this.state;
    const {
      handleSampleSearch, handleDrug1Search, handleDrug2Search, userRedirect,
      handleDatasetSearch, handleEnterPress,
    } = this;

    const isDisabled = !(drugsData2.length > 0);
    const exampleDrugUrl = {
      pathname: '/synergy_score',
      search: '?drugId1=11&drugId2=97',
    };
    const exampleDatasetUrl = {
      pathname: '/synergy_score',
      search: '?&dataset=4',
    };
    const exampleSampleUrl = {
      pathname: '/synergy_score',
      search: '?&sample=bladder',
    };

    const searchForm = (
      <Fragment>
        <h1>
          <span>SYNERGxDB</span>
          {' '}
          is a comprehensive database to explore
          {' '}
          <br />
          synergistic drug combinations for biomarker discovery.
        </h1>
        <StyledForm className="search-combos" onKeyPress={handleEnterPress}>
          <div className="select-container">
            <Select
              components={{
                Option: CustomOption,
                // MenuList: props => (<MenuList {...props} />),
              }}
              styles={customStyles}
              options={sampleData}
              placeholder="Enter Cell Line or Tissue"
              onChange={handleSampleSearch}
              value={selectedSample}
              filterOption={customFilterOption}
              formatGroupLabel={formatGroupLabel}
            />
          </div>
          <div className="select-container">
            <Select
              components={{
                Option: CustomOption,
                MenuList: props => (<MenuList {...props} />),
              }}
              styles={customStyles}
              options={drugsData1}
              placeholder="Enter Drug A"
              onChange={e => handleDrug1Search('drugId1', e)}
              value={selectedDrug1}
              filterOption={customFilterOption}
            />
          </div>
          <div className="select-container">
            <Select
              components={{
                Option: CustomOption,
                MenuList: props => (<MenuList {...props} />),
              }}
              styles={customStyles}
              options={datasetData}
              placeholder="Enter Dataset"
              value={selectedDataset}
              onChange={handleDatasetSearch}
              filterOption={customFilterOption}
            />
          </div>
          <div className="select-container">
            <Select
              components={{
                Option: CustomOption,
                MenuList: props => (<MenuList {...props} />),
              }}
              styles={customStyles}
              options={drugsData2}
              isDisabled={isDisabled}
              placeholder={drug2Placeholder}
              value={selectedDrug2}
              onChange={handleDrug2Search}
              filterOption={customFilterOption}
            />
          </div>
          <ButtonContainer>
            <ExampleSpan>
            Examples:
              {' '}
              <Link className="hover" to={exampleSampleUrl}>BLADDER</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link className="hover" to={exampleDatasetUrl}>YALE-PDAC</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link className="hover" to={exampleDrugUrl}>Bortezomib + Topotecan</Link>
            </ExampleSpan>
            <StyledButton onClick={userRedirect} type="button">Search</StyledButton>
          </ButtonContainer>
        </StyledForm>
        <Stats />
      </Fragment>
    );

    return (
      <Fragment>
        <header />
        <main className="landing">
          <StyledWrapper className="form-wrapper">
            {searchForm}
          </StyledWrapper>
        </main>
      </Fragment>
    );
  }
}

export default withRouter(SearchCombos);
