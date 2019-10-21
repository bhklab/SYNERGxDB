/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import List from 'react-virtualized/dist/commonjs/List';

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

class Pharmacogenomics extends Component {
  constructor() {
    super();
    this.state = {
      drugsData: [{ value: 'Any', label: 'Any Compound' }],
      profileValue: 'metabolimic',
      selectedDrug1: 'Any',
    };
    this.profileChange = this.profileChange.bind(this);
    this.getData = this.getData.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.drug1Change = this.drug1Change.bind(this);
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

  drug1Change(event) {
    console.log(event.target.value);
    this.setState({ selectedDrug1: event.target.value });
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
    const { profileChange, rowRenderer, drug1Change } = this;
    const { profileValue, drugsData, selectedDrug1 } = this.state;
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
          <div className="drug1-container">
            <FormControl component="fieldset">
              <FormLabel component="legend">Select compound A</FormLabel>
              <RadioGroup aria-label="profile" name="profile" value={selectedDrug1} onChange={drug1Change}>
                <List
                  width={300}
                  height={300}
                  rowCount={drugsData.length}
                  rowHeight={40}
                  rowRenderer={rowRenderer}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </StyledDiv>
      </main>
    );
  }
}
export default Pharmacogenomics;
