/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';

import colors from '../../styles/colors';
import 'react-table/react-table.css';
import transitions from '../../styles/transitions';
import MoleculeList from './MoleculeList';
import GeneList from './GeneList';
import SampleList from './SampleList';
import DrugList from './DrugList';
import AdvancedAnalysis from './Plots/AdvancedAnalysis';

const dimensions = {
  left: 55,
  top: 30,
  bottom: 55,
};

const StyledDiv = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding: 0 30px;
  margin-bottom:20px;

  h2 {
    margin: 0;
    padding-top:15px; 
  }

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
      padding: 0 20px;
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
  .plot {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .analysis {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .analysis {
    padding-bottom: 25px;
  }
`;

const StyledButton = styled.button`
  background: ${colors.nav_links};
  border: 1px solid ${colors.nav_links};
  border-radius:10px;
  padding: 10px 20px;
  margin: 10px auto 20px;
  color: #ffffff;
  transition: ${transitions.main_trans};
  outline-style: none;
  text-align: center;

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

const generateSampleString = (data, keyStore) => {
  const arraySamples = [];
  data.forEach((item) => {
    if (item.checked) {
      if (typeof item.value === 'string') {
        if (item.value !== 'All') arraySamples.push(keyStore[item.value]);
      } else {
        arraySamples.push(item.value);
      }
    }
  });
  const cellLineSet = [...new Set(arraySamples.flat())].sort((a, b) => a - b);
  return cellLineSet.toString();
};

// generates drug labels for the plot
const generateDrugLabel = (drug, data) => {
  const maxLength = 20;
  const drugId = parseInt(drug, 10);
  let label = drug !== 'null' ? data[data.findIndex(i => i.value === drugId)].label : null;
  if (label && label.length > maxLength) label = label.substring(0, maxLength - 3).concat('...');
  return label;
};

class Pharmacogenomics extends Component {
  constructor() {
    super();
    this.state = {
      dataType: 'null',
      scoreValue: 'zip',
      // Material UI wants to have some initial value for the radio group, thus 'null'
      selectedDrug1: 'null',
      selectedDrug2: 'null',
      selectedMolecule: 'null',
      selectedGene: 'null',
      moleculeData: [],
      geneData: [],
      sampleData: [],
      drugsData1: [],
      drugsData2: [],
      biomarkerData: [],
      tissueObj: {},
      loading1: false,
      showPlot: false,
      loadingBiomarkerData: false,
      xRange: null,
      yRange: null,
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
    this.renderSampleDrugData = this.renderSampleDrugData.bind(this);
    this.renderPlot = this.renderPlot.bind(this);
    this.updateGeneData = this.updateGeneData.bind(this);
    this.updateMoleculeData = this.updateMoleculeData.bind(this);
    this.getPlotData = this.getPlotData.bind(this);
    this.processSynData = this.processSynData.bind(this);
  }

  // Updates drug data based on samples
  getDrugData(data, keyStore, type, drug) {
    const querySamples = generateSampleString(data, keyStore);
    let queryString = `/api/drugs/filter?sample=${querySamples}`;
    if (type === 'drugsData1' && drug) queryString = queryString.concat(`&drugId=${drug}`);
    if (type === 'drugsData2' && drug) queryString = queryString.concat(`&drugId=${drug}`);
    fetch(queryString)
      .then(response => response.json())
      .then((drugData) => {
        const drugsData = drugData.map(item => ({ value: item.idDrug, label: item.name }));
        this.setState({
          [type]: drugsData,
        });
      // eslint-disable-next-line no-console
      }).catch(err => console.log(err));
  }

  getSampleDrugData(dataType) {
    const { getDrugData } = this;
    fetch(`/api/pharmacogenomics/samples?datatype=${dataType}`)
      .then(response => response.json())
      .then((data) => {
        const cellData = data.map(item => ({
          value: item.idSample,
          label: item.name,
          checked: false,
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
            checked: false,
          }));
        const sampleData = [{ value: 'All', label: 'SELECT ALL', checked: false }, ...tissueData, ...cellData];
        this.setState({ sampleData, tissueObj, dataType });
        getDrugData(cellData, tissueObj, 'drugsData1');
        getDrugData(cellData, tissueObj, 'drugsData2');
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        this.setState({ dataType });
      });
  }

  getPlotData() {
    const {
      dataType, selectedDrug1, selectedDrug2,
      selectedGene, sampleData, selectedMolecule,
      tissueObj, scoreValue,
    } = this.state;
    const { processSynData } = this;
    this.setState({ loadingBiomarkerData: true, showPlot: true });

    const sampleString = generateSampleString(sampleData, tissueObj);
    let queryParams = `?drugId1=${selectedDrug1}&drugId2=${selectedDrug2}&sample=${sampleString}`;

    if (dataType === 'metabolomic') {
      queryParams = queryParams.concat(`&molecule=${selectedMolecule}`);
      fetch('/api/pharmacogenomics/metabolomics'.concat(queryParams), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(response => response.json())
        .then((data) => {
          processSynData(data, selectedMolecule, scoreValue);
          console.log(data);
        });
    }
    if (dataType === 'rnaseq') {
      queryParams = queryParams.concat(`&gene=${selectedGene}`);
      fetch('/api/biomarkers/association'.concat(queryParams), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }).then(response => response.json())
        .then((data) => {
          console.log(data);
          processSynData(data, 'fpkm', scoreValue);
        });
    } else {
      console.log('wrong datatype');
      this.setState({
        loadingBiomarkerData: false,
      });
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

  sampleChange(e) {
    const { value } = e.target;
    const { getDrugData } = this;
    const { sampleData, tissueObj } = this.state;
    let index;
    sampleData.forEach((item, i) => {
      if (item.value === value) index = i;
    });
    let updatedSamplesData;
    if (sampleData[index].value === 'All') {
      updatedSamplesData = sampleData.map(item => ({
        ...item,
        checked: !sampleData[index].checked,
      }));
      updatedSamplesData.shift();
    } else if (typeof sampleData[index].value === 'string') {
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
        ...changedSamplesData.slice(1, index),
        { ...changedSamplesData[index], checked: !changedSamplesData[index].checked },
        ...changedSamplesData.slice(index + 1),
      ];
    } else {
      updatedSamplesData = [
        ...sampleData.slice(1, index),
        { ...sampleData[index], checked: !sampleData[index].checked },
        ...sampleData.slice(index + 1),
      ];
    }
    // checks if all options selected and renders first control option accordingly
    const control = updatedSamplesData.every(item => item.checked)
      ? ({ value: 'All', label: 'UNSELECT ALL', checked: true })
      : ({ value: 'All', label: 'SELECT ALL', checked: false });

    this.setState({
      sampleData: [control, ...updatedSamplesData],
      selectedDrug1: 'null',
      selectedDrug2: 'null',
    });

    getDrugData(updatedSamplesData, tissueObj, 'drugsData1');
    getDrugData(updatedSamplesData, tissueObj, 'drugsData2');
  }

  profileChange(event) {
    const { getSampleDrugData, updateGeneData, updateMoleculeData } = this;

    const dataType = event.target.value;
    this.setState({
      loading1: true,
      selectedGene: 'null',
      selectedMolecule: 'null',
      selectedDrug1: 'null',
      selectedDrug2: 'null',
      sampleData: [],
      drugsData1: [],
      drugsData2: [],
    });
    if (dataType === 'rnaseq' || dataType === 'mutation' || dataType === 'cna') updateGeneData(dataType);
    if (dataType === 'metabolomic') updateMoleculeData();
    getSampleDrugData(dataType);
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

  handleDrug1Search(event) {
    const { getDrugData } = this;
    const { sampleData, tissueObj } = this.state;
    const selectedDrug1 = event.target.value;
    this.setState({ selectedDrug1 });
    getDrugData(sampleData, tissueObj, 'drugsData2', selectedDrug1);
  }

  handleDrug2Search(event) {
    const { getDrugData } = this;
    const { sampleData, tissueObj } = this.state;
    const selectedDrug2 = event.target.value;
    this.setState({ selectedDrug2 });
    getDrugData(sampleData, tissueObj, 'drugsData1', selectedDrug2);
  }

  processSynData(data, accessor, scoreValue) {
    const paddingPercent = 0.05;
    let lowestFPKM = 0;
    let highestFPKM = 0;
    let lowestSynScore = 0;
    let highestSynScore = 0;
    data.forEach((item) => {
      if (item[accessor] < lowestFPKM) lowestFPKM = item[accessor];
      if (item[accessor] > highestFPKM) highestFPKM = item[accessor];
      if (item[scoreValue] < lowestSynScore) lowestSynScore = item[scoreValue];
      if (item[scoreValue] > highestSynScore) highestSynScore = item[scoreValue];
    });
    const rangeFPKM = highestFPKM - lowestFPKM;
    let xRange;
    if (rangeFPKM) {
      xRange = [
        lowestFPKM - rangeFPKM * paddingPercent,
        highestFPKM + rangeFPKM * paddingPercent,
      ];
    } else {
      xRange = [-1, 1];
    }
    const rangeSynScore = highestSynScore - lowestSynScore;
    const yRange = [
      lowestSynScore - rangeSynScore * paddingPercent,
      highestSynScore + rangeSynScore * paddingPercent,
    ];
    this.setState({
      biomarkerData: data,
      xRange,
      yRange,
      loadingBiomarkerData: false,
    });
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
        <MoleculeList
          data={moleculeData}
          moleculeChange={moleculeChange}
          selectedMolecule={selectedMolecule}
        />
      );
    }
    if (dataType !== 'metabolomic' && geneData.length > 0) {
      return (
        <GeneList
          data={geneData}
          geneChange={geneChange}
          selectedGene={selectedGene}
        />
      );
    }
    return null;
  }

  renderSampleDrugData() {
    const {
      sampleChange,
      handleDrug1Search, handleDrug2Search,
    } = this;
    const {
      drugsData1, drugsData2, selectedDrug1, sampleData,
      selectedDrug2, selectedGene, selectedMolecule,
    } = this.state;
    if (selectedMolecule !== 'null' || selectedGene !== 'null') {
      return sampleData.length > 0 && drugsData1.length > 0 ? (
        <div className="selector">
          <SampleList
            data={sampleData}
            sampleChange={sampleChange}
          />
          <DrugList
            data={drugsData1}
            drugChange={handleDrug1Search}
            selectedDrug={selectedDrug1}
            drugLabel="A"
          />
          <DrugList
            data={drugsData2}
            drugChange={handleDrug2Search}
            selectedDrug={selectedDrug2}
            drugLabel="B"
          />
        </div>
      ) : null;
    }
    return null;
  }

  renderPlot(drugLabel1, drugLabel2) {
    const {
      scoreValue, showPlot, xRange, yRange,
      biomarkerData, selectedGene, loadingBiomarkerData,
    } = this.state;
    const checkBiomarkerData = biomarkerData.some(item => item[scoreValue] !== null);
    if (showPlot) {
      return !loadingBiomarkerData ? (
        <div className="plot">
          {checkBiomarkerData ? (
            <AdvancedAnalysis
              biomarkerData={biomarkerData}
              selectedBiomarker={selectedGene}
              dimensions={dimensions}
              xRange={xRange}
              yRange={yRange}
              selectedScore={scoreValue}
              drug1={drugLabel1}
              drug2={drugLabel2}
            />
          ) : (
            <div>
              <h4>No data found for a given set of parameters, please modify the query</h4>
            </div>
          )}
        </div>
      ) : (
        <div className="loading-container">
          <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
        </div>
      );
    }
    return null;
  }


  render() {
    const {
      profileChange, scoreChange, renderBiomarkerList,
      renderSampleDrugData, getPlotData, renderPlot,
    } = this;
    const {
      dataType, scoreValue, selectedDrug1,
      selectedDrug2, drugsData1, drugsData2,
    } = this.state;
    const showSynScore = selectedDrug1 !== 'null' && selectedDrug2 !== 'null';
    const drugLabel1 = generateDrugLabel(selectedDrug1, drugsData1);
    const drugLabel2 = generateDrugLabel(selectedDrug2, drugsData2);

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
          { renderSampleDrugData()}
          { showSynScore ? (
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
          ) : null}
          {showSynScore ? (
            <div className="analysis">
              <StyledButton onClick={getPlotData} type="button">Analysis</StyledButton>
              <div>
                {renderPlot(drugLabel1, drugLabel2)}
              </div>
            </div>
          ) : null}
        </StyledDiv>
      </main>
    );
  }
}
export default Pharmacogenomics;
