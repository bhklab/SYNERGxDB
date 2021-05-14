/**
 *
 * @param {number} page
 * @param {number} per_page
 * @returns {Object} - {limit, offset}
 */
const calcLimitOffset = (page, perPage) => {
  const limit = perPage;
  const offset = (page - 1) * perPage;
  return { limit, offset };
};

module.exports = {
  calcLimitOffset,
};
