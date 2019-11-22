/* eslint-disable no-nested-ternary */

import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import List from 'react-virtualized/dist/commonjs/List';
// import colors from '../styles/colors';


import { withRouter, Link } from 'react-router-dom';
import Select, { components } from 'react-select';

import transitions from '../styles/transitions';
import Stats from './Stats';
import MenuList from './MenuList';

import 'react-table/react-table.css';
import colors from '../styles/colors';
// import transitions from '../styles/transitions';

const StyledDiv = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;
`;

const CustomRadio = withStyles({
  root: {
    color: colors.color_main_2,
    height: 40,
    'margin-left': 10,
    '&$checked': {
      color: colors.color_main_5,
    },
    label: {
      overflow: 'hidden',
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const customStyles = {
  control: provided => ({
    ...provided,
    background: 'rgb(0,0,0,0)',
    border: `1px solid ${colors.nav_links}`,
    margin: '5px 0px',
    '&:hover': {
      border: `1px solid ${colors.nav_links}`,
      cursor: 'text',
    },
  }),
  placeholder: provided => ({
    ...provided,
    color: `${colors.nav_links}`,
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: `${colors.nav_links}`,
    '&:hover': {
      color: `${colors.nav_links}`,
      cursor: 'pointer',
    },
  }),

  indicatorSeparator: provided => ({
    ...provided,
    background: `${colors.nav_links}`,
    '&:hover': {
      background: `${colors.nav_links}`,
    },
  }),
  singleValue: provided => ({
    ...provided,
    color: `${colors.nav_links}`,
  }),
  option: (provided, state) => ({
    ...provided,
    background: 'white',
    fontWeight: state.isSelected ? '700' : '400',
    color: state.isSelected ? colors.color_main_2 : state.isDisabled ? 'grey' : colors.nav_links,
  }),
};

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
        // justifyContent: innerProps.isDisabled ? 'flex-start' : 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span>{innerProps.label}</span>
    </div>
  </components.Option>
);

class Pharmacogenomics extends Component {
  constructor() {
    super();
    this.state = {
      drugsData: [{ value: 'Any', label: 'Any Compound' }],
      profileValue: 'metabolimic',
      selectedDrug1: null,
      selectedDrug2: null,
      filteredDrugsData1: null,
      filteredDrugsData2: null,

    };
    this.profileChange = this.profileChange.bind(this);
    this.getData = this.getData.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.handleDrug1Search = this.handleDrug1Search.bind(this);
    this.handleDrug2Search = this.handleDrug2Search.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    await fetch('/api/drugs')
      .then(response => response.json())
      .then((data) => {
        const { drugsData } = this.state;
        const processedData = data.map(item => ({ value: item.idDrug, label: item.name }));
        this.setState({ drugsData: [...drugsData, ...processedData] });
      });
  }

  profileChange(event) {
    this.setState({ profileValue: event.target.value });
  }

  handleDrug1Search(event) {
    console.log(event);
  }

  handleDrug2Search(event) {
    console.log(event);
  }

  rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) {
    const { drugsData } = this.state;
    console.log(drugsData[index]);
    return (
      <FormControlLabel
        style={style}
        key={key}
        value={drugsData[index].value.toString()}
        control={<CustomRadio />}
        label={drugsData[index].label}
      />
    );
  }


  render() {
    const {
      profileChange, rowRenderer, drug1Change,
      handleDrug1Search, handleDrug2Search,
    } = this;
    const {
      profileValue, drugsData, selectedDrug1,
      filteredDrugsData1, filteredDrugsData2, selectedDrug2,
    } = this.state;
    return (
      <main>
        <StyledDiv>
          <h2>Biomarker discovery in Pharmacogenomics</h2>
          <div className="profile-container">
            <FormControl component="fieldset">
              <FormLabel component="legend">Select a profile</FormLabel>
              <RadioGroup aria-label="profile" name="profile" value={profileValue} onChange={profileChange}>
                <FormControlLabel value="metabolimic" control={<CustomRadio />} label="metabolomic" />
                <FormControlLabel value="rnaseq" control={<CustomRadio />} label="molecular: expression, RNA-seq" />
                <FormControlLabel value="mutation" control={<CustomRadio />} label="molecular: mutation" />
                <FormControlLabel value="cna" control={<CustomRadio />} label="molecular: copy number" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="select-container">
            {/* <Select
              components={{
                Option: CustomOption,
              }}
              styles={customStyles}
              options={filteredSampleData || sampleData}
              placeholder="Enter Cell Line or Tissue"
              onChange={handleSampleSearch}
              value={selectedSample}
              filterOption={customFilterOption}
              formatGroupLabel={formatGroupLabel}
            /> */}
          </div>
          <div className="select-container">
            <Select
              components={{
                Option: CustomOption,
                MenuList: props => (<MenuList {...props} />),
              }}
              styles={customStyles}
              options={filteredDrugsData1 || drugsData}
              placeholder="Enter Compound A"
              onChange={e => handleDrug1Search(e)}
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
              options={filteredDrugsData2 || drugsData}
              placeholder="Enter Compound B"
              value={selectedDrug2}
              onChange={handleDrug2Search}
              filterOption={customFilterOption}
            />
          </div>
        </StyledDiv>
      </main>
    );
  }
}
export default Pharmacogenomics;
