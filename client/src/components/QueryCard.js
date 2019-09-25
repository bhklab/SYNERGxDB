import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import transitions from '../styles/transitions';
import ReactRouterPropTypes from 'react-router-prop-types';
import queryString from 'query-string';
import colors from '../styles/colors';

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

class QueryCard extends Component {
    static propTypes = {
      location: ReactRouterPropTypes.location.isRequired,
    }

    constructor() {
      super();
      this.state = {
        datasetName: 'Any',
        drugName1: 'Any',
        drugName2: 'Any',
        cellLineName: 'Any',
      };
      // this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
      const {
        sample, drugId1, drugId2, dataset,
      } = this.props;
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
        cellLineName,
        datasetName,
        drugName1,
        drugName2,
      } = this.state;
      return (
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
      );
    }
}

QueryCard.propTypes = {
  drugId1: PropTypes.string,
  drugId2: PropTypes.string,
  dataset: PropTypes.string,
  sample: PropTypes.string,
};

export default QueryCard;