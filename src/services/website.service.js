const httpStatus = require('http-status');
const { Website } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a website
 * @param {Object} websiteBody
 * @returns {Promise<Website>}
 */
const createWebsite = async (websiteBody) => Website.create(websiteBody);
/**
 * Get websites
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<[Websites]>}
 */
const queryWebsites = async (filter, options) => {
  const users = await Website.paginate(filter, options);
  return users;
};

/**
 * Get websites
 * @param {Object} filter
 * @returns {Promise<[Websites]>}
 */
const filterWebsites = async (filters) => {
  const users = await Website.dynamicCondition(filters);
  return users;
};
/**
 * Get a website by id
 * @param {ObjectId} id
 * @returns {Promise<Website>}
 */
const getWebsiteById = async (id) => Website.findById(id);
/**
 * Find Website By Model
 * @param {String} model
 * @returns {Promise<Website>}
 */
const getWebsiteByModel = async (model) => Website.findOne({ model });

/**
 * Find Website By reg-no
 * @param {String} reg_no
 * @returns {Promise<Website>}
 */
const getWebsiteByRegNo = async (regNumber) => Website.findOne({ regNumber });

/**
 * Update Website By Id
 * @param {String} websiteId
 * @returns {Promise<Website>}
 */
const updateWebsiteById = async (websiteId, updateBody) => {
  const website = await getWebsiteById(websiteId);
  if (!website) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Website not found');
  }
  Object.assign(website, updateBody);
  await website.save();
  return website;
};
/**
 * Delete Website By Id
 * @param {String} websiteId
 * @returns {Promise<Website>}
 */
const deleteWebsiteById = async (websiteId) => {
  const website = await getWebsiteById(websiteId);
  if (!website) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Website not found');
  }
  await website.remove();
  return website;
};

module.exports = {
  createWebsite,
  queryWebsites,
  getWebsiteById,
  getWebsiteByModel,
  getWebsiteByRegNo,
  updateWebsiteById,
  deleteWebsiteById,
  filterWebsites,
};
