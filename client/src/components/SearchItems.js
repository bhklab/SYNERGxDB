import React from 'react';
import PropTypes from 'prop-types';

const SearchItems = ({ value, handleSearch, searchType }) => (
  <input placeholder={`Enter ${searchType} Name`} value={value} onChange={handleSearch} />
);

SearchItems.propTypes = {
  value: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchItems;
