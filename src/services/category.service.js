const httpStatus = require('http-status');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  const categoryExist = await Category.doesCategoryExist(categoryBody.name);
  if (categoryExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category Already Exists!');
  }
  return Category.create(categoryBody);
};
/**
 * Gat category
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<[Category]>}
 */
const queryCategories = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};
/**
 * Get a category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => Category.findById(id);

/**
 * Find Category By name
 * @param {String} name
 * @returns {Promise<Category>}
 */
const getCategoryByName = async (name) => Category.findOne({ name });

/**
 * Update Category By Id
 * @param {String} categoryId
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};
/**
 * Delete Category By Id
 * @param {String} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await category.remove();
  return category;
};

module.exports = {
  createCategory,
  queryCategories,
  getCategoryById,
  getCategoryByName,
  updateCategoryById,
  deleteCategoryById,
};
