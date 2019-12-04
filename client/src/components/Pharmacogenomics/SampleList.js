/* eslint-disable react/prop-types */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import List from 'react-virtualized/dist/commonjs/List';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

const rowRendererSamples = ({
  key,
  index, // Index of row within collection
  style, // Style object to be applied to row (to position it)
  data,
  cache,
  parent,
  sampleChange,
}) => (
  <CellMeasurer
    key={key}
    cache={cache}
    parent={parent}
    columnIndex={0}
    overscanRowCount={10}
    rowIndex={index}
  >
    <CustomFormLabel
      style={style}
      control={(
        <CustomCheckbox
          checked={data[index].checked}
          onChange={e => sampleChange(e, index)}
          value={data[index].value.toString()}
        />
          )}
      label={data[index].label}
    />
  </CellMeasurer>
);

const CustomFormLabel = withStyles({
  root: {
    '& .MuiFormControlLabel-label': {
      color: colors.color_main_2,
      overflow: 'hidden',
      background: 'white',
      padding: '10px 0',
    },
  },
})(props => (
  <FormControlLabel
    color="default"
    {...props}
  />
));

const CustomCheckbox = withStyles({
  root: {
    color: colors.color_main_2,
    height: 40,
    'margin-left': 10,
    '&$checked': {
      color: colors.color_main_5,
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const CustomTextField = withStyles({
  root: {
    marginTop: 0,
    '& label': {
      color: colors.color_main_3,
    },
    '& label.Mui-focused': {
      color: colors.trans_color_main_3,
    },
    '& textarea::placeholder': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottom: `2px solid ${colors.color_main_5}`,
    },
    '& .MuiInput-underline:before': {
      borderBottom: `2px solid ${colors.color_main_3}`,
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: `2px solid ${colors.color_main_2}`,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const cacheSamples = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});

class SampleList extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      data,
      value: '',
      filteredData: data,
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.setState({ data });
    }
  }

  handleFilter(e) {
    const { value } = e.target;
    this.setState({ value });
  }

  render() {
    const { handleFilter } = this;
    const { value, data } = this.state;
    const { sampleChange } = this.props;
    const searchValue = value.toLowerCase();
    const filteredData = [];
    data.forEach((item) => {
      if (item.label.toLowerCase().includes(searchValue)) {
        filteredData.push(item);
      }
    });
    cacheSamples.clearAll();
    return (
      <div className="samples-container">
        <FormControl component="fieldset">
          <h3>Select samples</h3>
          <FormGroup>
            <CustomTextField
              id="standard-textarea"
              label="Search by cell line/tissue"
              placeholder="Enter sample name"
              multiline
              margin="normal"
              value={value}
              onChange={e => handleFilter(e)}
            />
            <div className="list-container">
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    width={width}
                    height={height}
                    rowCount={filteredData.length}
                    deferredMeasurementCache={cacheSamples}
                    rowHeight={cacheSamples.rowHeight}
                    rowRenderer={({
                      key, index, parent, style,
                    }) => rowRendererSamples({
                      key,
                      index,
                      parent,
                      style,
                      data: filteredData,
                      cache: cacheSamples,
                      sampleChange,
                    })}
                  />
                )}
              </AutoSizer>
            </div>
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}
export default SampleList;


SampleList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sampleChange: PropTypes.func.isRequired,
};
