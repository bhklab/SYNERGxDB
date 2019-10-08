import React, { Component } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import 'react-table/react-table.css';
// import colors from '../styles/colors';
// import transitions from '../styles/transitions';

const StyledDiv = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;
`;


class Pharmacogenomics extends Component {
  constructor() {
    super();
    this.state = {
      selectedValue: 'female',
    };
  }

  componentDidMount() {
    console.log('Mounted');
  }

  handleChange(event) {
    this.setState({ selectedValue: event.target.value });
  }

  render() {
    const { handleChange } = this;
    const { selectedValue } = this.state;
    console.log('HERE');

    return (
      <main>
        <StyledDiv>
          <h2>Biomarker discovery in Pharmacogenomics</h2>
          <div className="profile-container">
            <h3>Select a profile</h3>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={selectedValue} onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="(Disabled option)"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </StyledDiv>
      </main>
    );
  }
}
export default Pharmacogenomics;
