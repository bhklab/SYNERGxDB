/* eslint-disable import/prefer-default-export */
const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;
  return (
    row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true
  );
};

export { filterCaseInsensitive };
