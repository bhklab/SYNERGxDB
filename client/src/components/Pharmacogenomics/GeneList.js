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

const cacheGenes = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true,
});

class MoleculeList extends Component {
  constructor(props) {
    super(props);
    const { selectedGene, data } = this.props;
    this.state = {
      data,
      value: '',
      selectedGene,
      filteredData: data,
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { selectedGene, data } = this.props;
    if (data !== prevProps.data) {
      this.setState({ data, filteredData: data, value: '' });
    }
    if (selectedGene !== prevProps.selectedGene) {
      this.setState({ selectedGene });
    }
  }

  handleFilter(e) {
    const { value } = e.target;
    const searchValue = value.toLowerCase();
    const { data } = this.state;
    const filteredData = [];
    data.forEach((item) => {
      if (item.label.toLowerCase().includes(searchValue)) {
        filteredData.push(item);
      }
    });
    this.setState({ value, filteredData });
    cacheGenes.clearAll();
  }

  render() {
    const {
      handleFilter,
    } = this;
    const {
      value, selectedGene, filteredData,
    } = this.state;
    const { geneChange } = this.props;
    return (
      <div className="genes-container">
        <FormControl component="fieldset">
          <h3>Select gene</h3>
          <RadioGroup aria-label="gene" name="gene" value={selectedGene} onChange={geneChange}>
            <CustomTextField
              id="standard-textarea"
              label="Search by gene name"
              placeholder="Enter gene"
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
                    deferredMeasurementCache={cacheGenes}
                    rowHeight={cacheGenes.rowHeight}
                    rowRenderer={({
                      key, index, parent, style,
                    }) => rowRenderer({
                      key, index, parent, style, cache: cacheGenes, data: filteredData,
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
export default MoleculeList;


MoleculeList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  geneChange: PropTypes.func.isRequired,
  selectedGene: PropTypes.string.isRequired,
};
