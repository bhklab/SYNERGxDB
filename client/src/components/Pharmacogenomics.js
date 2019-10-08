import React, { Component } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

import 'react-table/react-table.css';
import colors from '../styles/colors';
// import transitions from '../styles/transitions';

const StyledDiv = styled.div`
  width: 100%;
  height: auto;
  background:white;
  padding:20px 30px;
  margin-bottom:20px;
`;

const CustomRadio = withStyles({
  root: {
    color: colors.color_main_2,
    height: 40,
    '&$checked': {
      color: colors.color_main_5,
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

class Pharmacogenomics extends Component {
  constructor() {
    super();
    this.state = {
      profileValue: 'metabolimic',
    };
    this.profileChange = this.profileChange.bind(this);
  }

  componentDidMount() {
  }

  profileChange(event) {
    this.setState({ profileValue: event.target.value });
  }

  render() {
    const { profileChange } = this;
    const { profileValue } = this.state;

    return (
      <main>
        <StyledDiv>
          <h2>Biomarker discovery in Pharmacogenomics</h2>
          <div className="profile-container">
            <FormControl component="fieldset">
              <FormLabel component="legend">Select a profile</FormLabel>
              <RadioGroup aria-label="profile" name="profile" value={profileValue} onChange={profileChange}>
                <FormControlLabel value="metabolimic" control={<CustomRadio />} label="metabolomic" />
                <FormControlLabel value="rnaseq" control={<CustomRadio />} label="molecular: expression, RNA-seq" />
                <FormControlLabel value="mutation" control={<CustomRadio />} label="molecular: mutation" />
                <FormControlLabel value="cna" control={<CustomRadio />} label="molecular: copy number" />
              </RadioGroup>
            </FormControl>
          </div>
        </StyledDiv>
      </main>
    );
  }
}
export default Pharmacogenomics;
