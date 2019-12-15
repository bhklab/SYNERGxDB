/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React, { Fragment } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

class APIDocumentation extends React.Component {
  render() {
    const { text, imgPath } = this.props;
    return (
      <Fragment>
        <h2>API Documentation</h2>
        <p>{text}</p>
      </Fragment>
    );
  }
}


export default APIDocumentation;
