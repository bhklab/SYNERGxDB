import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';

// import colors from '../styles/colors';
import ConsistencyPlot from './Plots/ConsistencyPlot';
import QueryCard from './UtilComponents/QueryCard';

const StyledWrapper = styled.div`

  .consistencyContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .selectX {
      margin-left: 460px;
      margin-top: 500px;
      
    }
  
    .selectY {
      margin-left: 0px;
      margin-top: 250px;
    }
  }

  .consistencyGrid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .consistencyContainer {
      flex: 45%;
      width: 45%;
    }

    .selectX {
      margin-left: 250px;
      margin-top: 400px;
      
    }
  
    .selectY {
      margin-left: 50px;
      margin-top: 20px;
    }
  }
  
  text-align: left;
  background:white;
  padding:10px 30px;

  select {
    position:absolute;
  }

  h2 {
    text-align:left;
  }
`;

class Consistency extends Component {
    static propTypes = {
      location: ReactRouterPropTypes.location.isRequired,
    }

    constructor() {
      super();
      this.state = {
        results: [],
        allResults: [],
        datasets: [],
      };
    }

    componentDidMount() {
      const { location } = this.props;
      const requestParams = queryString.parse(location.search);
      const {
        sample, drugId1, drugId2, dataset,
      } = requestParams;

      let queryParams = `?drugId1=${drugId1}`;
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
          // parse data into json for all and separate datasets
          const results = {};
          const datasets = [...new Set(data.map(x => x.sourceName))];
          datasets.forEach((x) => {
            results[x] = [];
          });

          data.forEach((x) => {
            results[x.sourceName].push(x);
          });

          this.setState({
            results,
            allResults: data,
          });
        });

      fetch('/api/datasets'.concat(queryParams), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({
            datasets: data,
          });
        });
    }

    render() {
      const {
        results, allResults, datasets,
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
            {(results.length === 0) ? null : (
              <StyledWrapper className="wrapper">
                {datasets.length === 0 ? null : (
                  <>
                    <h2>
                      Consistency in Synergy Scores,
                      {' '}
                      <i>N</i>
                      {' '}
                      =
                      {' '}
                      {allResults.length}
                    </h2>
                    <div className="consistencyContainer">
                      <ConsistencyPlot
                        plotId="consistencyPlotAll"
                        data={allResults}
                        datasets={datasets}
                      />
                    </div>
                    <div className="consistencyGrid">
                      {Object.keys(results).map(x => (
                        <div key={x} className="consistencyContainer">
                          {console.log(x, results[x])}
                          <ConsistencyPlot
                            plotId={`consistencyPlot${x}`}
                            data={results[x]}
                            datasets={datasets}
                          />
                        </div>
                      ))}
                    </div>

                  </>
                )}
              </StyledWrapper>
            )}


          </Fragment>
        </main>
      );
    }
}

export default Consistency;
