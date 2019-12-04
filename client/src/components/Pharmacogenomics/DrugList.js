/* eslint-disable react/prop-types */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from 'react-virtualized/dist/commonjs/List';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import PropTypes from 'prop-types';
import colors from '../../styles/colors';
import 'react-table/react-table.css';
// import transitions from '../styles/transitions';

const CustomRadio = withStyles({
  root: {
    color: colors.color_main_2,
    height: 40,
    'margin-left': 10,
    '&$checked': {
      color: colors.color_main_5,
    },
  },
  checked: {},
})(props => (
  <Radio
  // color="default"
    {...props}
  />
));

const rowRenderer = ({
  key, // Unique key within array of rows
  index, // Index of row within collection
  parent,
  style, // Style object to be applied to row (to position it)
  cache,
  data,
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
      key={key}
      control={<CustomRadio />}
      value={data[index].value.toString()}
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

const cacheDrug1 = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});
const cacheDrug2 = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});

class DrugList extends Component {
  constructor(props) {
    super(props);
    const { selectedDrug, data } = this.props;
    this.state = {
      data,
      value: '',
      selectedDrug,
      filteredData: data,
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { selectedDrug, data, drugLabel } = this.props;
    if (data !== prevProps.data) {
      if (drugLabel === 'A') cacheDrug1.clearAll();
      if (drugLabel === 'B') cacheDrug2.clearAll();
      this.setState({ data, filteredData: data, value: '' });
    }
    if (selectedDrug !== prevProps.selectedDrug) {
      this.setState({ selectedDrug });
    }
  }

  handleFilter(e) {
    const { value } = e.target;
    const { data } = this.state;
    const { drugLabel } = this.props;
    const searchValue = value.toLowerCase();
    const filteredData = [];
    data.forEach((item) => {
      if (item.label.toLowerCase().includes(searchValue)) {
        filteredData.push(item);
      }
    });
    this.setState({ value, filteredData });
    if (drugLabel === 'A') cacheDrug1.clearAll();
    if (drugLabel === 'B') cacheDrug2.clearAll();
  }

  render() {
    const {
      handleFilter,
    } = this;
    const {
      value, selectedDrug, filteredData,
    } = this.state;
    const { drugChange, drugLabel } = this.props;
    return (
      <div className="drug-container">
        <FormControl component="fieldset">
          <h3>
            Select compound
            {' '}
            {drugLabel}
          </h3>
          <RadioGroup aria-label={`drug${drugLabel}`} name={`drug${drugLabel}`} value={selectedDrug} onChange={drugChange}>
            <CustomTextField
              id="standard-textarea"
              label="Search by compound name"
              placeholder={`Enter compound ${drugLabel}`}
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
                    deferredMeasurementCache={drugLabel === 'A' ? cacheDrug1 : cacheDrug2}
                    rowHeight={drugLabel === 'A' ? cacheDrug1.rowHeight : cacheDrug2.rowHeight}
                    rowRenderer={({
                      key, index, parent, style,
                    }) => rowRenderer({
                      key, index, parent, style, cache: drugLabel === 'A' ? cacheDrug1 : cacheDrug2, data: filteredData,
                    })}
                  />
                )}
              </AutoSizer>
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
export default DrugList;


DrugList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  drugChange: PropTypes.func.isRequired,
  selectedDrug: PropTypes.string.isRequired,
  drugLabel: PropTypes.string.isRequired,
};
