import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';

import colors from '../styles/colors';
import ConsistencyPlot from './Plots/ConsistencyPlot';
import QueryCard from './UtilComponents/QueryCard';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background:white;
  padding:0px 30px;

  select {
    position:absolute;
  }

  .selectX {
    margin-left: 400px;
    margin-top: 500px;
  }

  .selectY {
    margin-left: -60px;
    margin-top: 250px;
  }
`;

class Consistency extends Component {
    static propTypes = {
      location: ReactRouterPropTypes.location.isRequired,
    }

    constructor() {
      super();
      this.state = {
        drugId1: null,
        drugId2: null,
        dataset: null,
        datasetName: 'Any',
        drugName1: 'Any',
        drugName2: 'Any',
        cellLineName: 'Any',
        results: [],
      };
    }

    componentDidMount() {
      const { location } = this.props;
      const requestParams = queryString.parse(location.search);
      const {
        sample, drugId1, drugId2, dataset, comboId,
      } = requestParams;

      let queryParams = `?drugId1=${drugId1}`;

      this.setState({
        drugId1: parseInt(drugId1, 10),
        drugId2: parseInt(drugId2, 10),
        dataset: parseInt(dataset, 10),
      });
      if (sample) queryParams = queryParams.concat(`&sample=${sample}`);
      if (dataset) queryParams = queryParams.concat(`&dataset=${dataset}`);
      if (drugId2) queryParams = queryParams.concat(`&drugId2=${drugId2}`);

      fetch('/api/combos'.concat(queryParams), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({ results: data, loading: false });
        });
    }

    render() {
      const {
        cellLineName, datasetName, drugName1, drugName2,
        results,
      } = this.state;
      const { location } = this.props;
      const requestParams = queryString.parse(location.search);
      const {
        sample, drugId1, drugId2, dataset,
      } = requestParams;

      return (
        <main>
            <Fragment>
                <QueryCard
                    drugId1={drugId1}
                    drugId2={drugId2}
                    dataset={dataset}
                    sample={sample}
                  />
                {results.length === 0 ? null : (
                    <StyledWrapper className="wrapper">
                    <div id="consistencyPlot" />
                    <ConsistencyPlot
                        plotId="consistencyPlot"
                        data={results}
                      />
                  </StyledWrapper>
                  )}


              </Fragment>
          </main>
      );
    }
}

export default Consistency;
