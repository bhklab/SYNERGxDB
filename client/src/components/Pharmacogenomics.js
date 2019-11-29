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

    &:nth-of-type(1) {
      border-top: none;
    }
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
      drugsData: [],
      dataType: 'metabolomic',
      scoreValue: 'zip',
      // Material UI wants to have some initial value for the radio group
      selectedDrug1: 'null',
      selectedDrug2: 'null',
      selectedMolecule: 'null',
      selectedGene: 'null',
      moleculeData: [],
      geneData: [],
      sampleData: [],
      filteredDrugsData1: null,
      filteredDrugsData2: null,
      tissueObj: {},
    };
    this.profileChange = this.profileChange.bind(this);
    this.scoreChange = this.scoreChange.bind(this);
    this.sampleChange = this.sampleChange.bind(this);
    this.moleculeChange = this.moleculeChange.bind(this);
    this.geneChange = this.geneChange.bind(this);
    this.getInitialData = this.getInitialData.bind(this);
    this.handleDrug1Search = this.handleDrug1Search.bind(this);
    this.handleDrug2Search = this.handleDrug2Search.bind(this);
    this.renderBiomarkerList = this.renderBiomarkerList.bind(this);
    this.updateSampleData = this.updateSampleData.bind(this);
    this.updateGeneData = this.updateGeneData.bind(this);
  }

  componentDidMount() {
    this.getInitialData();
  }

  async getInitialData() {
    const { updateSampleData } = this;
    const { dataType } = this.state;
    let drugsData;
    let moleculeData;

    updateSampleData(dataType);

    await fetch('/api/drugs')
      .then(response => response.json())
      .then((data) => {
        drugsData = data.map(item => ({ value: item.idDrug, label: item.name }));
      });
    await fetch('/api/pharmacogenomics/molecules')
      .then(response => response.json())
      .then((data) => {
        moleculeData = data.map(item => ({ value: item, label: item }));
      });
    this.setState({
      drugsData, moleculeData,
    });
  }

  updateSampleData(dataType) {
    fetch(`/api/pharmacogenomics/samples?datatype=${dataType}`)
      .then(response => response.json())
      .then((data) => {
        const cellData = data.map(item => ({
          value: item.idSample,
          label: item.name,
          checked: true,
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
        // const cellData = data.map(item => ({
        //   value: item.idSample,
        //   label: item.name,
        //   checked: true,
        // }));
        // const sampleObj = {};
        // data.forEach((item) => {
        //   if (!sampleObj[item.tissue]) {
        //     sampleObj[item.tissue] = {
        //       value: item.tissue,
        //       label: `${item.tissue} (1 cell line)`,
        //       cells: [item.idSample],
        //       checked: true,
        //     };
        //   } else {
        //     sampleObj[item.tissue].cells.push(item.idSample);
        //     sampleObj[item.tissue]
        //      .label = `${item.tissue} (${sampleObj[item.tissue].cells.length} cell lines)`;
        //   }
        //   sampleObj[item.idSample] = {
        //     value: item.idSample,
        //     label: item.name,
        //     tissue: item.tissue,
        //     checked: true,
        //   };
        // });
      }).catch((err) => {
        console.log(err);
        this.setState({ dataType });
      });
  }

  updateGeneData(dataType) {
    fetch(`/api/pharmacogenomics/genes?datatype=${dataType}`)
      .then(response => response.json())
      .then((data) => {
        const geneData = data.map(item => ({ value: item.gene_id ? item.gene_id : item.gene, label: item.gene }));
        this.setState({ geneData });
      });
  }

  profileChange(event) {
    const { updateSampleData, updateGeneData } = this;
    const dataType = event.target.value;
    updateSampleData(dataType);
    if (dataType === 'rnaseq' || dataType === 'mutation' || dataType === 'cna') {
      updateGeneData(dataType);
    }
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
    const { sampleData } = this.state;
    const updatedSamplesData = [
      ...sampleData.slice(0, index),
      { ...sampleData[index], checked: !sampleData[index].checked },
      ...sampleData.slice(index + 1),
    ];
    this.setState({ sampleData: updatedSamplesData });
  }

  handleDrug1Search(event) {
    this.setState({ selectedDrug1: event.target.value });
  }

  handleDrug2Search(event) {
    this.setState({ selectedDrug2: event.target.value });
  }

  renderBiomarkerList() {
    const {
      dataType, moleculeData, geneData, selectedMolecule, selectedGene,
    } = this.state;
    const {
      moleculeChange, geneChange,
    } = this;
    if (dataType === 'metabolomic' && moleculeData.length > 0) {
      return (
        <div className="molecule-container selector">
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
        <div className="genes-container selector">
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
      scoreValue,
    } = this.state;
    return (
      <main>
        <StyledDiv>
          <h2>Biomarker discovery in Pharmacogenomics</h2>
          <div className="datatype-container selector">
            <FormControl component="fieldset">
              <h3>Select datatype</h3>
              <RadioGroup aria-label="datatype" name="datatype" value={dataType} onChange={profileChange}>
                <CustomFormLabel value="metabolomic" control={<CustomRadio />} label="metabolomic" />
                <CustomFormLabel value="rnaseq" control={<CustomRadio />} label="molecular: expression, RNA-seq" />
                <CustomFormLabel value="mutation" control={<CustomRadio />} label="molecular: mutation" />
                <CustomFormLabel value="cna" control={<CustomRadio />} label="molecular: copy number" />
              </RadioGroup>
            </FormControl>
          </div>
          {renderBiomarkerList()}
          <div className="selector">
            {sampleData.length > 0 ? (
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
            ) : null}
            {drugsData.length > 0 ? (
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
            ) : null}
            {drugsData.length > 0 ? (
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
            ) : null}
          </div>
          <div className="synscore-container selector">
            <FormControl component="fieldset">
              <h3>Select synergy score method</h3>
              <RadioGroup aria-label="synscore" name="synscore" value={scoreValue} onChange={scoreChange}>
                <CustomFormLabel value="zip" control={<CustomRadio />} label="ZIP" />
                <CustomFormLabel value="bliss" control={<CustomRadio />} label="Bliss" />
                <CustomFormLabel value="loewe" control={<CustomRadio />} label="Loewe" />
                <CustomFormLabel value="hsa" control={<CustomRadio />} label="HSA" />
              </RadioGroup>
            </FormControl>
          </div>

        </StyledDiv>
      </main>
    );
  }
}
export default Pharmacogenomics;
