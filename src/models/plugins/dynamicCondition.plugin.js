/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable func-names */

const dynamicCondition = (schema) => {
  /**
     * @typedef {Object} QueryResult
     * @property {Document[]} results - Results found
     */
  /**
     * Query for documents with pagination
     * @param {Object} [filter] - Mongo filter
     * @returns {Promise<QueryResult>}
     */
  schema.statics.dynamicCondition = async function (conditions) {
    const query = {};
    conditions.forEach(({ field, operator, value }) => {
      query[field] = query[field] || {};
      query[field][operator] = value;
    });
    const results = await this.find(query);
    return Promise.resolve(results);
  };
};

module.exports = dynamicCondition;
