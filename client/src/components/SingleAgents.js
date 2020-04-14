import React, { Component } from 'react';
import styled from 'styled-components';
import ReactTable from 'react-table';

import SingleAgentPlot from './Plots/SingleAgentPlot';
import Loading from './UtilComponents/Loading';

import { ComboContext } from './Context/ComboContext';

import colors from '../styles/colors';
import 'react-table/react-table.css';

const StyledContainer = styled.div`
    padding-bottom: 10px;
    border-bottom: 2px solid ${colors.color_main_3};
    margin-bottom: 10px;
`;

const PlotContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    margin: 20px 0 50px;
`;

class SingleAgents extends Component {
  static contextType = ComboContext

  constructor() {
    super();
    this.state = {
      monoData: [],
      loading: true,
    };
    this.handleDrug = this.handleDrug.bind(this);
  }

  componentDidMount() {
    const { drugsData, idSource, idSample } = this.context;
    fetch(`/api/drugs/mono?drugId1=${drugsData[0].idDrug}&drugId2=${drugsData[1].idDrug}&idSource=${idSource}&idSample=${idSample}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then((monoData) => {
        this.setState({ monoData, loading: false });
      });
  }

  handleDrug(index) {
    const { drugsData } = this.context;
    window.location = `https://pubchem.ncbi.nlm.nih.gov/compound/${drugsData[index].idPubChem}`;
  }


  render() {
    const { handleDrug } = this;
    const { monoData, loading } = this.state;
    const { cellData } = this.context;
    const columns = [
      {
        Header: `${cellData.name}`,
        accessor: 'drugName',
      }, {
        Header: 'AAC',
        accessor: 'aac',
        Cell: prop => (prop.value ? prop.value.toFixed(4) : '0.0000'),
      }, {
        Header: 'IC50 (µM)',
        accessor: 'ic50',
        Cell: prop => (prop.value ? prop.value.toFixed(4) : '0.0000'),
      }, {
        Header: 'EC50 (µM)',
        accessor: 'ec50',
        Cell: prop => (prop.value ? prop.value.toFixed(4) : '0.0000'),
      },
    ];

    return (
      <StyledContainer>
        <h2>Single-agents</h2>
        <PlotContainer>
          <SingleAgentPlot drugA />
          <SingleAgentPlot drugA={false} />
        </PlotContainer>
        <ReactTable
          data={monoData}
          columns={columns}
          showPagination={false}
          sortable={false}
          filterable={false}
          loading={loading}
          LoadingComponent={Loading}
          defaultPageSize={2}
          className="-highlight"
          getTdProps={(state, rowInfo) => ({
            onClick: (e, handleOriginal) => {
              if (rowInfo) handleDrug(rowInfo.index);
              // IMPORTANT! React-Table uses onClick internally to trigger
              // events like expanding SubComponents and pivots.
              // By default a custom 'onClick' handler will override this functionality.
              // If you want to fire the original onClick handler, call the
              // 'handleOriginal' function.
              if (handleOriginal) {
                handleOriginal();
              }
            },
          })
          }
        />
      </StyledContainer>
    );
  }
}

export default SingleAgents;
