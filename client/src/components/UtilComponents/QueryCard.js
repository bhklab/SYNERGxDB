/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';

const QueryDiv = styled.div`
  width: 100%;
  background:white;
  padding: 10px 30px;
  margin-bottom:30px;
  font-size:18px;
  color: ${colors.blue_main};
  
  .query-container {
    display:flex;
  }

  .col {
    position:inherit;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .item {
    margin: 10px 0px;
  }
`;

class QueryCard extends Component {
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
        })
        .catch((err) => {
          console.log(err);
        });
    }


    if (drugId2) {
      fetch('/api/drugs/'.concat(drugId2))
        .then(response => response.json())
        .then((data) => {
          this.setState({ drugName2: data[0].name });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (dataset) {
      fetch('/api/datasets/'.concat(dataset))
        .then(response => response.json())
        .then((data) => {
          this.setState({ datasetName: data[0].name });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (sample) {
      if (parseInt(sample, 10)) {
        fetch('/api/cell_lines/'.concat(sample))
          .then(response => response.json())
          .then((data) => {
            this.setState({ cellLineName: data[0].name });
          })
          .catch((err) => {
            console.log(err);
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
          Query
        </h2>
        <div className="query-container">
          <div className="col">
            <div className="item">
              <b>Cell line:</b>
              {' '}
              {cellLineName}
            </div>
            <div className="item">
              <b>Dataset:</b>
              {' '}
              {datasetName}
            </div>
          </div>
          <div className="col">
            <div className="item">
              <b>Compound <i>A</i>: </b>
              {' '}
              {drugName1}
            </div>
           <div className="item">
            <b>Compound <i>B</i>:</b>
            {' '}
            {drugName2}
           </div>
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
