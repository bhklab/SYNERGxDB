/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import List from 'react-virtualized/dist/commonjs/List';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import colors from '../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

const StyledDiv = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;

  h3 {
    color:${colors.color_main_5}
  }
  .list-container {
    height: 450px;
    min-width: 300px;
  }
`;

const CustomRadio = withStyles({
  root: {
    color: colors.color_main_2,
    height: 40,
    'margin-left': 10,
    '&$checked': {
      color: colors.color_main_5,
    },
  },
  checked: {},
})(props => (
  <Radio
  // color="default"
    {...props}
  />
));

const CustomFormLabel = withStyles({
  root: {
    '& .MuiFormControlLabel-label': {
      color: colors.color_main_2,
      overflow: 'hidden',
      background: 'white',
      padding: '10px 0',
    },
  },
})(props => (
  <FormControlLabel
    color="default"
    {...props}
  />
));

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});
class Pharmacogenomics extends Component {
  constructor() {
    super();
    this.state = {
      drugsData: [],
      profileValue: 'metabolimic',
      // Material UI wants to have some initial value for the radio group
      selectedDrug1: 'null',
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
        const processedData = data.map(item => ({ value: item.idDrug, label: item.name }));
        this.setState({ drugsData: processedData });
      });
  }

  profileChange(event) {
    this.setState({ profileValue: event.target.value });
  }

  handleDrug1Search(event) {
    this.setState({ selectedDrug1: event.target.value });
  }

  handleDrug2Search(event) {
    this.setState({ selectedDrug2: event.target.value });
  }


  rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    parent,
    style, // Style object to be applied to row (to position it)
  }) {
    const { drugsData } = this.state;
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        overscanRowCount={10}
        rowIndex={index}
      >
        <CustomFormLabel
          style={style}
          key={key}
          value={drugsData[index].value.toString()}
          control={<CustomRadio />}
          label={drugsData[index].label}
        />
      </CellMeasurer>
    );
  }

  render() {
    const {
      profileChange, rowRenderer,
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
              <h3>Select a profile</h3>
              <RadioGroup aria-label="profile" name="profile" value={profileValue} onChange={profileChange}>
                <CustomFormLabel value="metabolimic" control={<CustomRadio />} label="metabolomic" />
                <CustomFormLabel value="rnaseq" control={<CustomRadio />} label="molecular: expression, RNA-seq" />
                <CustomFormLabel value="mutation" control={<CustomRadio />} label="molecular: mutation" />
                <CustomFormLabel value="cna" control={<CustomRadio />} label="molecular: copy number" />
              </RadioGroup>
            </FormControl>
          </div>
          {drugsData.length > 0 ? (
            <div className="select-container">

              <FormControl component="fieldset">
                <h3>Select compound A</h3>
                <RadioGroup aria-label="drugA" name="drugA" value={selectedDrug1} onChange={handleDrug1Search}>
                  <div className="list-container">
                    <AutoSizer>
                      {({ width, height }) => (
                        <List
                          width={width}
                          height={height}
                          rowCount={drugsData.length}
                          deferredMeasurementCache={cache}
                          rowHeight={cache.rowHeight}
                          rowRenderer={rowRenderer}
                        />
                      )}
                    </AutoSizer>
                  </div>
                </RadioGroup>
              </FormControl>

            </div>
          ) : null}
        </StyledDiv>
      </main>
    );
  }
}
export default Pharmacogenomics;
