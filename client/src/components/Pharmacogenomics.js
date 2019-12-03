/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import List from 'react-virtualized/dist/commonjs/List';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import ReactLoading from 'react-loading';

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
    color:${colors.color_main_2}
  }
  .list-container {
    height: 300px;
    min-width: 300px;
    padding-bottom: 10px;
    // border-bottom: 2px solid ${colors.color_main_3};
    // border-top: 2px solid ${colors.color_main_3};
  }
  
  .selector {
    width: 100%
    padding: 20px 0 20px;
    display: flex;
    justify-content: space-between;
    border-top: 2px solid ${colors.color_main_3};

    &.datatype-container {
      justify-content: space-between;
    }
    & > div {
      min-height: 300px;
      width: 30%;
    }
    &:nth-of-type(1) > div {
      padding: 20px;
      width: 50%;
      &:nth-of-type(2) {
        border-left: 2px solid ${colors.color_main_3};
      }
    }

    &:nth-of-type(2) > div {
      border-right: 2px solid ${colors.color_main_3};
      padding-right: 30px;
      &:nth-of-type(3) {
        border-right: none;
      }
    }

    &:nth-of-type(1) {
      border-top: none;
    }
  }
  .syn-score {
    display: flex;
    justify-content: space-between;
    h3 {
      padding-right: 50px;
    }
  }
  
  textarea {
    color: ${colors.color_main_5};
  }
  .loading-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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

const CustomCheckbox = withStyles({
  root: {
    color: colors.color_main_2,
    height: 40,
    'margin-left': 10,
    '&$checked': {
      color: colors.color_main_5,
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const CustomTextField = withStyles({
  root: {
    marginTop: 0,
    '& label': {
      color: colors.color_main_3,
    },
    '& label.Mui-focused': {
      color: colors.trans_color_main_3,
    },
    '& textarea::placeholder': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottom: `2px solid ${colors.color_main_5}`,
    },
    '& .MuiInput-underline:before': {
      borderBottom: `2px solid ${colors.color_main_3}`,
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: `2px solid ${colors.color_main_2}`,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);


// ///////////////////
// CelMeasurer cache
// ///////////////////
const cacheDrug1 = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});
const cacheDrug2 = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});
const cacheMolecules = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});
const cacheSamples = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});
const cacheGenes = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});

const rowRenderer = ({
  key, // Unique key within array of rows
  index, // Index of row within collection
  parent,
  style, // Style object to be applied to row (to position it)
  cache,
  data,
}) => (
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
      control={<CustomRadio />}
      value={data[index].value.toString()}
      label={data[index].label}
    />
  </CellMeasurer>
);

const rowRendererSamples = ({
  key,
  index, // Index of row within collection
  style, // Style object to be applied to row (to position it)
  data,
  cache,
  parent,
  sampleChange,
}) => (
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
      control={(
        <CustomCheckbox
          checked={data[index].checked}
          onChange={() => sampleChange(index)}
          value={data[index].value.toString()}
        />
        )}
      label={data[index].label}
    />
  </CellMeasurer>
);


class Pharmacogenomics extends Component {
  constructor() {
    super();
    this.state = {
      dataType: 'null',
      scoreValue: 'zip',
      // Material UI wants to have some initial value for the radio group
      selectedDrug1: 'null',
      selectedDrug2: 'null',
      selectedMolecule: 'null',
      selectedGene: 'null',
      moleculeData: [],
      geneData: [],
      sampleData: [],
      drugsData: [],
      filteredDrugsData1: null,
      filteredDrugsData2: null,
      tissueObj: {},
      loading1: false,
    };
    this.getDrugData = this.getDrugData.bind(this);
    this.getSampleDrugData = this.getSampleDrugData.bind(this);
    this.profileChange = this.profileChange.bind(this);
    this.scoreChange = this.scoreChange.bind(this);
    this.sampleChange = this.sampleChange.bind(this);
    this.moleculeChange = this.moleculeChange.bind(this);
    this.geneChange = this.geneChange.bind(this);
    this.handleDrug1Search = this.handleDrug1Search.bind(this);
    this.handleDrug2Search = this.handleDrug2Search.bind(this);
    this.renderBiomarkerList = this.renderBiomarkerList.bind(this);
    this.updateGeneData = this.updateGeneData.bind(this);
    this.updateMoleculeData = this.updateMoleculeData.bind(this);
  }

  // Updates drug data based on samples
  getDrugData(data, keyStore) {
    console.log(data);
    console.log(keyStore);
    const arraySamples = [];
    data.forEach((item) => {
      if (item.checked) {
        if (typeof item.value === 'string') {
          arraySamples.push(keyStore[item.value]);
        } else {
          arraySamples.push(item.value);
        }
      }
    });
    arraySamples.flat();
    arraySamples.sort((a, b) => a - b);
    const querySamples = arraySamples.toString();
    console.log(querySamples);
    fetch('/api/drugs/filter?sample='.concat(querySamples))
      .then(response => response.json())
      .then((res) => {
        console.log(res);
        const drugsData = res.map(item => ({ value: item.idDrug, label: item.name }));
        this.setState({
          drugsData,
        });
      });
  }

  getSampleDrugData(dataType) {
    const { getDrugData } = this;
    fetch(`/api/pharmacogenomics/samples?datatype=${dataType}`)
      .then(response => response.json())
      .then((data) => {
        const cellData = data.map(item => ({
          value: item.idSample,
          label: item.name,
          checked: true,
          tissue: item.tissue,
        }));
        const tissueObj = {};
        data.forEach((item) => {
          if (!tissueObj[item.tissue]) {
            tissueObj[item.tissue] = [item.idSample];
          } else {
            tissueObj[item.tissue].push(item.idSample);
          }
        });
        const tissueData = Object.entries(tissueObj)
          .map(item => ({
            value: item[0],
            label: `${item[0].toUpperCase()} (${item[1].length} cell line${item[1].length > 1 ? 's' : null})`,
            checked: true,
          }));
        const sampleData = [...tissueData, ...cellData];
        this.setState({ sampleData, tissueObj, dataType });
        getDrugData(cellData, tissueObj);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        this.setState({ dataType });
      });
  }

  updateGeneData(dataType) {
    fetch(`/api/pharmacogenomics/genes?datatype=${dataType}`)
      .then(response => response.json())
      .then((data) => {
        const geneData = data.map(item => ({
          value: item.gene_id ? item.gene_id : item.gene, label: item.gene,
        }));
        this.setState({ geneData, loading1: false });
      });
  }

  updateMoleculeData() {
    fetch('/api/pharmacogenomics/molecules')
      .then(response => response.json())
      .then((data) => {
        const moleculeData = data.map(item => ({ value: item, label: item }));
        this.setState({ moleculeData, loading1: false });
      });
  }

  profileChange(event) {
    const { getSampleDrugData, updateGeneData, updateMoleculeData } = this;

    const dataType = event.target.value;
    this.setState({
      loading1: true,
      selectedGene: 'null',
      selectedMolecule: 'null',
      sampleData: [],
      drugsData: [],
      filteredDrugsData1: null,
      filteredDrugsData2: null,
    });
    if (dataType === 'rnaseq' || dataType === 'mutation' || dataType === 'cna') updateGeneData(dataType);
    if (dataType === 'metabolomic') updateMoleculeData();
    getSampleDrugData(dataType);
  }

  scoreChange(event) {
    this.setState({ scoreValue: event.target.value });
  }

  moleculeChange(event) {
    this.setState({ selectedMolecule: event.target.value });
  }

  geneChange(event) {
    this.setState({ selectedGene: event.target.value });
  }

  sampleChange(index) {
    const { getDrugData } = this;
    const { sampleData, tissueObj } = this.state;
    let updatedSamplesData;
    if (typeof sampleData[index].value === 'string') {
      const changedSamplesData = sampleData.map((item) => {
        if (item.tissue === sampleData[index].value) {
          return {
            ...item,
            checked: !sampleData[index].checked,
          };
        }
        return item;
      });
      updatedSamplesData = [
        ...changedSamplesData.slice(0, index),
        { ...changedSamplesData[index], checked: !changedSamplesData[index].checked },
        ...changedSamplesData.slice(index + 1),
      ];
    } else {
      updatedSamplesData = [
        ...sampleData.slice(0, index),
        { ...sampleData[index], checked: !sampleData[index].checked },
        ...sampleData.slice(index + 1),
      ];
    }
    this.setState({ sampleData: updatedSamplesData });
    getDrugData(updatedSamplesData, tissueObj);
  }

  handleDrug1Search(event) {
    this.setState({ selectedDrug1: event.target.value });
  }

  handleDrug2Search(event) {
    this.setState({ selectedDrug2: event.target.value });
  }

  renderBiomarkerList() {
    const {
      dataType, moleculeData, geneData, selectedMolecule, selectedGene, loading1,
    } = this.state;
    const {
      moleculeChange, geneChange,
    } = this;
    if (loading1) {
      return (
        <div className="loading-container">
          <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
        </div>
      );
    }
    if (dataType === 'metabolomic' && moleculeData.length > 0) {
      return (
        <div className="molecule-container">
          <FormControl component="fieldset">
            <h3>Select biological molecule</h3>
            <RadioGroup aria-label="molecule" name="molecule" value={selectedMolecule} onChange={moleculeChange}>
              <CustomTextField
                id="standard-textarea"
                label="Search by biological molecule name"
                placeholder="Enter biological molecule"
                multiline
                margin="normal"
              />
              <div className="list-container">
                <AutoSizer>
                  {({ width, height }) => (
                    <List
                      width={width}
                      height={height}
                      rowCount={moleculeData.length}
                      deferredMeasurementCache={cacheMolecules}
                      rowHeight={cacheMolecules.rowHeight}
                      rowRenderer={({
                        key, index, parent, style,
                      }) => rowRenderer({
                        key, index, parent, style, cache: cacheMolecules, data: moleculeData,
                      })}
                    />
                  )}
                </AutoSizer>
              </div>
            </RadioGroup>
          </FormControl>
        </div>
      );
    }
    if (dataType !== 'metabolomic' && geneData.length > 0) {
      return (
        <div className="genes-container">
          <FormControl component="fieldset">
            <h3>Select gene</h3>
            <RadioGroup aria-label="gene" name="gene" value={selectedGene} onChange={geneChange}>
              <CustomTextField
                id="standard-textarea"
                label="Search by gene name"
                placeholder="Enter gene"
                multiline
                margin="normal"
              />
              <div className="list-container">
                <AutoSizer>
                  {({ width, height }) => (
                    <List
                      width={width}
                      height={height}
                      rowCount={geneData.length}
                      deferredMeasurementCache={cacheGenes}
                      rowHeight={cacheGenes.rowHeight}
                      rowRenderer={({
                        key, index, parent, style,
                      }) => rowRenderer({
                        key, index, parent, style, cache: cacheGenes, data: geneData,
                      })}
                    />
                  )}
                </AutoSizer>
              </div>
            </RadioGroup>
          </FormControl>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      profileChange, scoreChange, sampleChange,
      handleDrug1Search, handleDrug2Search, renderBiomarkerList,
    } = this;
    const {
      dataType, drugsData, selectedDrug1, sampleData,
      filteredDrugsData1, filteredDrugsData2, selectedDrug2,
      selectedGene, selectedMolecule,
      scoreValue,
    } = this.state;
    return (
      <main>
        <StyledDiv>
          <h2>Biomarker discovery in Pharmacogenomics</h2>
          <div className="datatype-container selector">
            <div>
              <FormControl component="fieldset">
                <h3>Select datatype</h3>
                <div style={{ marginTop: '37px' }}>
                  <RadioGroup aria-label="datatype" name="datatype" value={dataType} onChange={profileChange}>
                    <CustomFormLabel value="metabolomic" control={<CustomRadio />} label="metabolomic" />
                    <CustomFormLabel value="rnaseq" control={<CustomRadio />} label="molecular: expression, RNA-seq" />
                    <CustomFormLabel value="mutation" control={<CustomRadio />} label="molecular: mutation" />
                    <CustomFormLabel value="cna" control={<CustomRadio />} label="molecular: copy number" />
                  </RadioGroup>
                </div>
              </FormControl>
            </div>
            {renderBiomarkerList()}
          </div>
          { sampleData.length > 0 && drugsData.length > 0 ? (
            <div className="selector">
              <div className="samples-container">
                <FormControl component="fieldset">
                  <h3>Select samples</h3>
                  <FormGroup>
                    <CustomTextField
                      id="standard-textarea"
                      label="Search by cell line/tissue"
                      placeholder="Enter name"
                      multiline
                      margin="normal"
                    />
                    <div className="list-container">
                      <AutoSizer>
                        {({ width, height }) => (
                          <List
                            width={width}
                            height={height}
                            rowCount={sampleData.length}
                            deferredMeasurementCache={cacheSamples}
                            rowHeight={cacheSamples.rowHeight}
                            rowRenderer={({
                              key, index, parent, style,
                            }) => rowRendererSamples({
                              key,
                              index,
                              parent,
                              style,
                              data: sampleData,
                              cache: cacheSamples,
                              sampleChange,
                            })}
                          />
                        )}
                      </AutoSizer>
                    </div>
                  </FormGroup>
                </FormControl>
              </div>
              <div className="drug-container">
                <FormControl component="fieldset">
                  <h3>Select compound A</h3>
                  <RadioGroup aria-label="drugA" name="drugA" value={selectedDrug1} onChange={handleDrug1Search}>
                    <CustomTextField
                      id="standard-textarea"
                      label="Search by compound name"
                      placeholder="Enter compound A"
                      multiline
                      margin="normal"
                    />
                    <div className="list-container">
                      <AutoSizer>
                        {({ width, height }) => (
                          <List
                            width={width}
                            height={height}
                            rowCount={drugsData.length}
                            deferredMeasurementCache={cacheDrug1}
                            rowHeight={cacheDrug1.rowHeight}
                            rowRenderer={({
                              key, index, parent, style,
                            }) => rowRenderer({
                              key, index, parent, style, cache: cacheDrug1, data: drugsData,
                            })}
                          />
                        )}
                      </AutoSizer>
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="drug-container">
                <FormControl component="fieldset">
                  <h3>Select compound B</h3>
                  <RadioGroup aria-label="drugB" name="drugB" value={selectedDrug2} onChange={handleDrug2Search}>
                    <CustomTextField
                      id="standard-textarea"
                      label="Search by compound name"
                      placeholder="Enter compound B"
                      multiline
                      margin="normal"
                    />
                    <div className="list-container">
                      <AutoSizer>
                        {({ width, height }) => (
                          <List
                            width={width}
                            height={height}
                            rowCount={drugsData.length}
                            deferredMeasurementCache={cacheDrug2}
                            rowHeight={cacheDrug2.rowHeight}
                            rowRenderer={({
                              key, index, parent, style,
                            }) => rowRenderer({
                              key, index, parent, style, cache: cacheDrug2, data: drugsData,
                            })}
                          />
                        )}
                      </AutoSizer>
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          ) : null}
          <div className="synscore-container selector">
            <FormControl component="fieldset">
              <RadioGroup aria-label="synscore" name="synscore" value={scoreValue} onChange={scoreChange}>
                <div className="syn-score">
                  <h3>Select synergy score method</h3>
                  <CustomFormLabel value="zip" control={<CustomRadio />} label="ZIP" />
                  <CustomFormLabel value="bliss" control={<CustomRadio />} label="Bliss" />
                  <CustomFormLabel value="loewe" control={<CustomRadio />} label="Loewe" />
                  <CustomFormLabel value="hsa" control={<CustomRadio />} label="HSA" />
                </div>
              </RadioGroup>
            </FormControl>
          </div>

        </StyledDiv>
      </main>
    );
  }
}
export default Pharmacogenomics;
