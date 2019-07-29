/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

import colors from '../../styles/colors';

const StyledDiv = styled.div`
    grid-column: 1;
`;

class SingleDrugInhibitionPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
  }

  // Render this compoenent
  render() {
    return (
      <StyledDiv>
        Single Drug Inhibition Plot
      </StyledDiv>
    );
  }
}

SingleDrugInhibitionPlot.propTypes = {
};

export default SingleDrugInhibitionPlot;
