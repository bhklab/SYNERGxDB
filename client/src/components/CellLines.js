/* eslint-disable react/prop-types */
import React, {
  Fragment, useEffect, useState, useRef,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactTable from 'react-table';
// eslint-disable-next-line import/no-unresolved
import CsvDownloader from 'react-csv-downloader';
import 'react-table/react-table.css';
import ReactLoading from 'react-loading';

import LoadingComponent from './UtilComponents/Loading';
// import DownloadButton from './UtilComponents/DownloadButton';
import DonutPlot from './Plots/DonutPlot';

import colors from '../styles/colors';
import downloadIcon from '../images/icons/download.svg';
import transitions from '../styles/transitions';


const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  button {
    margin-left: 10px;
    color: #fff !important;
    background: ${colors.pagination};
    
    padding: 8px;
    border: 0;
    font-size: 13px;
    transition: ${transitions.main_trans}
    img {
        display: inline-block;
        height: 13px;
        width: auto;
        margin-left: 5px;
    }
    &:hover {
        background-color: ${colors.blue_main};
    }
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background:white;
  padding:0px 30px;
  position: relative;

  .syn-button {
    margin: 0;
    padding: 0;
    border: none;
    color: ${colors.color_main_1}
    background: transparent;
    font-weight: 300;
    cursor: pointer;

    &:hover {
      color: ${colors.color_main_5};
      transition: ${transitions.main_trans}
    }
  }
`;

const LoadingContainer = styled.div`
  opacity: 0.5;
  background-color: white;
  width: 100%;
  height: 100%;
  position: absolute;

  &.-loading.-active {
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const formatData = (data, keyName) => {
  // legend names
  const names = [...new Set(data.map(x => x[keyName]))];
  let result = [];

  if (keyName === 'age') {
    result = [
      {
        name: '50 or over',
        num: 0,
      },
      {
        name: 'Under 50',
        num: 0,
      },
      {
        name: 'Unknown',
        num: 0,
      },
    ];
    data.forEach((val) => {
      let ind = 0;
      if (val[keyName] >= 50) {
        ind = 0;
      } else if (val[keyName] < 50 && val[keyName] != null) {
        ind = 1;
      } else if (val[keyName] == null) {
        ind = 2;
      }

      // increment the counter
      result[ind].num += 1;
    });
  } else if (keyName === 'origin') {
    result = [
      {
        name: 'Primary',
        num: 0,
      },
      {
        name: 'Metastasis',
        num: 0,
      },
    ];
    data.forEach((val) => {
      let ind = 0;
      if (val[keyName] == null) {
        ind = 0;
      } else {
        ind = 1;
      }
      // increment the counter
      result[ind].num += 1;
    });
  } else if (keyName === 'sex') {
    result = [
      {
        name: 'Female',
        num: 0,
      },
      {
        name: 'Male',
        num: 0,
      },
      {
        name: 'Unknown',
        num: 0,
      },
    ];
    data.forEach((val) => {
      let ind = 0;
      if (val[keyName] === 'F') {
        ind = 0;
      } else if (val[keyName] === 'M') {
        ind = 1;
      } else if (val[keyName] == null) {
        ind = 2;
      }
      // increment the counter
      result[ind].num += 1;
    });
  } else {
    // populate result with names first
    names.forEach((val) => {
      result.push({
        name: val,
        num: 0,
      });
    });

    // count the number of each name
    data.forEach((val) => {
      // get index of the name in the result array
      const ind = result.findIndex(item => item.name === val[keyName]);

      // increment the counter
      result[ind].num += 1;
    });
  }

  return result;
};

const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;
  switch (typeof row[id]) {
    case 'object':
      // checks for metastasis label
      if (row[id] && row[id].origin) {
        return String('metastasis').includes(filter.value.toLowerCase());
      }
      // checks for disease name (additional check is to filter out null values)
      return row[id] && row[id].name
        ? String(row[id].name.toLowerCase()).includes(filter.value.toLowerCase())
        : false;
    // handles age filtering
    case 'number':
      return row[id].toString().includes(filter.value);
    case 'string':
      return String(row[id].toLowerCase()).includes(filter.value.toLowerCase());
    default:
      return false;
  }
};

const legendCallBack = () => null;

// plots formatting
const miniDims = {
  width: 300,
  height: 230,
  radius: 100,
  rectY: -30,
  textY: -30,
  translate: 85,
};
const normalDims = {
  width: 670,
  height: 400,
  radius: 230,
  rectY: 20,
  textY: 18,
  translate: 5,
};


const CellLines = () => {
  // Hooks
  const [{
    cellLineData, csvData, loading, donutData,
  }, setCellLineData] = useState({
    cellLineData: [],
    loading: true,
    donutData: [],
    csvData: [],
  });
  const [{
    cellSynScoreData, loadingSynScores, selectedCellLine,
  }, setCellSynScoreData] = useState({
    cellSynScoreData: null, loadingSynScores: false, selectedCellLine: null,
  });
  // reference to autodownload button
  const downloadRef = useRef(null);

  // retieves synergy scores for a given cell line
  const fetchCellSynScores = (sample) => {
    setCellSynScoreData({
      cellSynScoreData,
      loadingSynScores: true,
      selectedCellLine: sample.name,
    });
    fetch(`/api/combos?allowAll=true&sample=${sample.id}`)
      .then(response => response.json())
      .then((data) => {
        const updatedCSVData = data.map((row) => {
          const csvRow = { ...row };
          if (csvRow.drugNameA.includes(',')) csvRow.drugNameA = `"${csvRow.drugNameA}"`;
          if (csvRow.drugNameB.includes(',')) csvRow.drugNameB = `"${csvRow.drugNameB}"`;
          if (csvRow.disease && csvRow.disease.includes(',')) csvRow.disease = `"${csvRow.disease}"`;
          if (csvRow.atcCodeDrugA && csvRow.atcCodeDrugA.includes(',')) csvRow.atcCodeDrugA = `"${csvRow.atcCodeDrugA}"`;
          if (csvRow.atcCodeDrugB && csvRow.atcCodeDrugB.includes(',')) csvRow.atcCodeDrugB = `"${csvRow.atcCodeDrugB}"`;
          if (csvRow.inchikeyDrugA) csvRow.inchikeyDrugA = `"${csvRow.inchikeyDrugA}"`;
          if (csvRow.inchikeyDrugB) csvRow.inchikeyDrugB = `"${csvRow.inchikeyDrugB}"`;
          return csvRow;
        });

        setCellSynScoreData({
          cellSynScoreData: updatedCSVData,
          loadingSynScores: false,
          selectedCellLine: sample.name,
        });
      });
  };

  // react table/csv formatting
  const cellColumns = [{
    Header: 'Tissue',
    accessor: 'tissue', // String-based value accessors!
    Cell: props => props.value.toUpperCase(),
    maxWidth: 125,
    sortable: true,
  }, {
    Header: 'Name',
    accessor: 'name',
    Cell: (props) => {
      const { value, original } = props;
      const { idSample } = original;
      return (
        <button
          className="syn-button"
          type="button"
          onClick={() => fetchCellSynScores({ id: idSample, name: value })}
        >
          { value }
        </button>
      );
    },
    maxWidth: 125,
    sortable: true,
  }, {
    Header: 'Sex',
    accessor: 'sex',
    maxWidth: 55,
    minWidth: 55,
    // sortable: false,
  }, {
    Header: 'Age',
    accessor: 'age',
    style: { textAlign: 'right' },
    maxWidth: 50,
    sortable: true,
  }, {
    Header: 'Disease',
    accessor: 'disease',
    Cell: (disease) => {
      const { value } = disease;
      return value.origin ? (
        <span>
          {value.name}
          <em> (metastasis)</em>
        </span>
      ) : <span>{value.name}</span>;
    },
    // filterable: false,
    sortable: false,
  }, {
    Header: 'Cellosaurus',
    accessor: 'idCellosaurus',
    Cell: (props) => {
      const { value } = props;
      return (
        <a className="hover" target="_blank" rel="noopener noreferrer" href={`https://web.expasy.org/cellosaurus/${value}`}>{value}</a>
      );
    },
    maxWidth: 125,
    sortable: false,
  }];
  const cellHeaders = [
    { displayName: 'idSample', id: 'idSample' },
    { displayName: 'Name', id: 'name' },
    { displayName: 'Tissue', id: 'tissue' },
    { displayName: 'Sex', id: 'sex' },
    { displayName: 'Age', id: 'age' },
    { displayName: 'Disease', id: 'disease' },
    { displayName: 'Origin', id: 'origin' },
    { displayName: 'Cellosaurus', id: 'idCellosaurus' },
  ];
  const synHeaders = [
    { displayName: 'Tissue', id: 'tissue' },
    { displayName: 'Cell Line', id: 'sampleName' },
    { displayName: 'idSample', id: 'idSample' },
    { displayName: 'Cellosaurus ID', id: 'idCellosaurus' },
    { displayName: 'Sex', id: 'sex' },
    { displayName: 'Age', id: 'age' },
    { displayName: 'Cancer Type', id: 'disease' },
    { displayName: 'Compound A', id: 'drugNameA' },
    { displayName: 'ATC Code (Compound A)', id: 'atCodeDrugA' },
    { displayName: 'DrugBank ID (Compound A)', id: 'idDrugBankA' },
    { displayName: 'PubChem CID (Compound A)', id: 'idPubChemDrugA' },
    { displayName: 'SMILES (Compound A)', id: 'smilesDrugA' },
    { displayName: 'InChi Key (Compound A)', id: 'inchikeyDrugA' },
    { displayName: 'Compound B', id: 'drugNameB' },
    { displayName: 'ATC Code (Compound B)', id: 'atCodeDrugB' },
    { displayName: 'DrugBank ID (Compound B)', id: 'idDrugBankB' },
    { displayName: 'PubChem CID (Compound B)', id: 'idPubChemDrugB' },
    { displayName: 'SMILES (Compound B)', id: 'smilesDrugB' },
    { displayName: 'InChi Key (Compound B)', id: 'inchikeyDrugB' },
    { displayName: 'Dataset', id: 'sourceName' },
    { displayName: 'ZIP', id: 'zip' },
    { displayName: 'Bliss', id: 'bliss' },
    { displayName: 'Loewe', id: 'loewe' },
    { displayName: 'HSA', id: 'hsa' },
  ];

  useEffect(() => {
    fetch('/api/cell_lines/')
      .then(response => response.json())
      .then((data) => {
        // Restructures data for react table
        const newCSVData = [];
        const newCellLineData = [];

        data.forEach((cell) => {
          const {
            idSample, tissue, name, sex, origin, age, disease, idCellosaurus,
          } = cell;
          newCellLineData.push({
            idSample, tissue, name, sex, age, idCellosaurus, disease: { name: disease, origin },
          });
          newCSVData.push({
            idSample, tissue, name, sex, age, idCellosaurus, disease: disease ? disease.split(',')[0] : '', origin,
          });
        });

        setCellLineData({
          cellLineData: newCellLineData, csvData: newCSVData, loading: false, donutData: data,
        });
      });
  }, []);

  useEffect(() => {
    if (cellSynScoreData) {
      downloadRef.current.handleClick();
    }
  }, [cellSynScoreData]);


  return (
    <Fragment>
      {/* <style>{'#root { background: #e7f3f8  !important; }'}</style> */}
      <main className="summary">
        <StyledWrapper className="wrapper">
          <h1>
            Cell Lines,
            {' '}
            <i>N</i>
            {' '}
            =
            {' '}
            {donutData.length.toLocaleString()}
          </h1>
          {donutData.length === 0 ? null : (
            <Fragment>
              <DonutPlot
                keyName="tissue"
                plotId="cellTissuePlot"
                dimensions={normalDims}
                formatData={formatData}
                donutData={donutData}
                legendCallBack={legendCallBack}
              />
              <DonutPlot
                keyName="sex"
                plotId="cellMiniPlot"
                dimensions={miniDims}
                formatData={formatData}
                donutData={donutData}
                legendCallBack={legendCallBack}
              />
              <DonutPlot
                keyName="origin"
                plotId="cellMiniPlot"
                dimensions={miniDims}
                formatData={formatData}
                donutData={donutData}
                legendCallBack={legendCallBack}
              />
              <DonutPlot
                keyName="age"
                plotId="cellMiniPlot"
                dimensions={miniDims}
                formatData={formatData}
                donutData={donutData}
                legendCallBack={legendCallBack}
              />
            </Fragment>

          )}

        </StyledWrapper>
        <StyledWrapper className="wrapper">
          {loadingSynScores ? (
            <LoadingContainer className="-loading -active">
              <div className="-loading-inner">
                <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
              </div>
            </LoadingContainer>
          ) : null}
          <h1>List of Cell Lines</h1>
          <StyledButtonContainer>
            <div>
              <button type="button">
                <Link style={{ color: 'white' }} to="/dataset_zips/molecular_data.zip" target="_blank" download>
                  Download Molecular Data
                  {'   '}
                  <img src={downloadIcon} alt="download icon" />
                </Link>
              </button>
            </div>
            <div>
              <CsvDownloader
                datas={csvData}
                columns={cellHeaders}
                filename="samples"
              >
                <button type="button">
                  Download Cell Line Data
                  {'   '}
                  <img src={downloadIcon} alt="download icon" />
                </button>
              </CsvDownloader>
            </div>
          </StyledButtonContainer>
          <ReactTable
            data={cellLineData}
            columns={cellColumns}
            defaultPageSize={25}
            filterable
            defaultFilterMethod={filterCaseInsensitive}
            className="-highlight"
            loading={loading}
            LoadingComponent={LoadingComponent}
          />

        </StyledWrapper>
      </main>
      <footer>
        <div className="footer-wrapper">
          <p>Copyright © 2019. All rights reserved</p>
        </div>
      </footer>
      <div style={{ visibility: 'hidden' }}>
        <CsvDownloader
          // ref is needed for autoclick
          ref={downloadRef}
          datas={cellSynScoreData}
          columns={synHeaders}
          filename={`${selectedCellLine}.csv`}
        />
      </div>
    </Fragment>
  );
};


export default CellLines;
