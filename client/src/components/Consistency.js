/* eslint-disable class-methods-use-this */
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import ReactLoading from 'react-loading';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import colors from '../styles/colors';
import ConsistencySynContainer from './ConsistencySynContainer';
import ConsistencyDsetContainer from './ConsistencyDsetContainer';
import QueryCard from './UtilComponents/QueryCard';
import 'react-tabs/style/react-tabs.css';

const StyledWrapper = styled.div`  
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
        dsetData: {},
        loading: true,
      };
      this.formatDsetData = this.formatDsetData.bind(this);
    }

    componentDidMount() {
      const { location } = this.props;
      const requestParams = queryString.parse(location.search);
      const {
        sample, drugId1, drugId2, dataset,
      } = requestParams;

      let queryParams = `?allowAll=true&drugId1=${drugId1}`;
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
          const dsetData = this.formatDsetData(results);
          this.setState({
            results,
            allResults: data,
            dsetData,
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
            loading: false,
          });
        });
    }

    formatDsetData(data) {
      // getting pairs of datasets
      const x = Object.keys(data);
      let y = Object.keys(data);
      const result = {};
      const pairs = [];
      y = y.slice(1);
      x.forEach((item) => {
        y.forEach((item2) => {
          result[`${item}+${item2}`] = {};
          pairs.push([item, item2]);
        });
        y = y.slice(1);
      });

      pairs.forEach((pair) => {
        // get the intersect of samples between datasets for each pair
        const samplesA = data[pair[0]].map(n => n.sampleName);
        const samplesB = data[pair[1]].map(n => n.sampleName);
        let samples = samplesA.filter((n) => {
          if (samplesB.indexOf(n) !== -1) return true;
          return false;
        });
        // samples = the intersection of samples
        samples = [...new Set(samples)];

        // getting points from those samples
        // { sample: [{point1}, {point2}], ...}
        const pointsA = data[pair[0]].filter(n => samples.includes(n.sampleName));
        const pointsB = data[pair[1]].filter(n => samples.includes(n.sampleName));

        // getting json of points by sample
        const sampleMap = {};
        samples.forEach((n) => {
          sampleMap[n] = [];
        });
        pointsA.forEach((n) => {
          sampleMap[n.sampleName].push(n);
        });
        pointsB.forEach((n) => {
          sampleMap[n.sampleName].push(n);
        });

        // making into easier format
        // {zip: [{x: 0, y: 0, sample: ""}, {}, ...], bliss: ...}
        const scores = ['zip', 'bliss', 'loewe', 'hsa'];
        const pairData = {};
        scores.forEach((n) => {
          pairData[n] = [];
        });

        Object.keys(sampleMap).forEach((n) => {
          // determining x or y axis - pair[0] is x, 1 is y
          if (sampleMap[n][0].sourceName === pair[0]) {
            scores.forEach((s) => {
              pairData[s].push({
                x: sampleMap[n][0][s],
                y: sampleMap[n][1][s],
                sample: n,
              });
            });
          } else {
            scores.forEach((s) => {
              pairData[s].push({
                x: sampleMap[n][1][s],
                y: sampleMap[n][0][s],
                sample: n,
              });
            });
          }
        });

        result[`${pair[0]}+${pair[1]}`] = pairData;
      });


      Object.keys(result).forEach((n) => {
        // if any have no data, remove
        if (result[n].zip.length === 0) {
          delete result[n];
        }
      });
      return result;
    }

    render() {
      const {
        results, allResults, dsetData, datasets, loading,
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
                    {loading ? (
                      <div className="loading-container">
                        <ReactLoading type="bubbles" width={150} height={150} color={colors.color_main_2} />
                      </div>
                    ) : (
                      <Tabs>
                        <TabList>
                          <Tab>Consistency of Synergy Metrics</Tab>
                          <Tab>Consistency Across Datasets</Tab>
                        </TabList>

                        <TabPanel>
                          <ConsistencySynContainer
                            data={results}
                            allData={allResults}
                            datasets={datasets}
                          />
                        </TabPanel>
                        <TabPanel>
                          <ConsistencyDsetContainer
                            data={dsetData}
                          />
                        </TabPanel>
                      </Tabs>


                    )}
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
