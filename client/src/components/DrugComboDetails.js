import React, { Component } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import colors from '../styles/colors';

export default class DrugComboDetails extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      requestParams: {},
    };
  }

  componentDidMount() {
    const requestParams = queryString.parse(this.props.location.search);
    this.setState({ requestParams });
    const {
      drug1, drug2, source, cell,
    } = requestParams;
  }

  render() {
    return (
      <header>
        <h2>Drug combination synergy</h2>
        <ul>
          <li>Sample</li>
          <li>Drug A</li>
          <li>Drug B</li>
          <li>Source</li>
        </ul>
      </header>
    );
  }
}
