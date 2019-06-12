import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SearchItems = ({
  value, handleSearch, searchType, filteredData,
}) => {
  const options = filtredData.map(item => (
    <option value={item} />
  ));
  return (
    <Fragment>
      <input type="text" placeholder={`Enter ${searchType}`} value={value} onChange={handleSearch} list={searchType} />
      <datalist id={searchType}>
        {options}
      </datalist>
    </Fragment>
  );
};

SearchItems.propTypes = {
  value: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchItems;
