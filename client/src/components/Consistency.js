import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import colors from '../styles/colors';
import ConsistencyPlot from './Plots/ConsistencyPlot'

const QueryDiv = styled.div`
  width: 100%;
  background:white;
  padding:20px 30px;
  margin-bottom:30px;
  font-size:18px;
  color: ${colors.blue_main};

  .query-container {
    display:flex;
    align-items:center;
  }
  .col {
    position:inherit;
    flex: 1;
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
        const {location} = this.props;
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

        if (drugId1) {
            fetch('/api/drugs/'.concat(drugId1))
                .then(response => response.json())
                .then((data) => {
                this.setState({ drugName1: data[0].name });
                });
        }
    
        if (drugId2) {
            fetch('/api/drugs/'.concat(drugId2))
                .then(response => response.json())
                .then((data) => {
                this.setState({ drugName2: data[0].name });
                });
        }
    
        if (dataset) {
            fetch('/api/datasets/'.concat(dataset))
                .then(response => response.json())
                .then((data) => {
                this.setState({ datasetName: data[0].name });
                });
        }
    
        if (sample) {
            if (parseInt(sample, 10)) {
                fetch('/api/cell_lines/'.concat(sample))
                .then(response => response.json())
                .then((data) => {
                    this.setState({ cellLineName: data[0].name });
                });
            } else {
                this.setState({ cellLineName: sample.toUpperCase() });
            }
        }

    }

    render() {
        const {
            cellLineName, datasetName, drugName1, drugName2, 
            drugId1, drugId2, dataset, results
        } = this.state;

        return (
            <main>
                <Fragment>
                    <QueryDiv>
                        <h2>
                        Query:
                        </h2>
                        <div className="query-container">
                            <div className="col">
                            <b>Cell Line:</b>
                            {' '}
                            {cellLineName}
                            <p />
                            <b>Dataset:</b>
                            {' '}
                            {datasetName}
                            </div>
                            <div className="col">
                            <b>Drug A: </b>
                            {' '}
                            {drugName1}
                            <p />
                            <b>Drug B:</b>
                            {' '}
                            {drugName2}
                            <p />
                            </div>
                        </div>
                    </QueryDiv>
                    {results.length === 0 ? null : (
                        <ConsistencyPlot
                            plotId={`consistencyPlot`}
                            data={results}
                        />
                    )}
                </Fragment>
            </main>
        )
    }
}

export default Consistency;