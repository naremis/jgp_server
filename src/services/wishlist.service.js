const httpStatus = require('http-status');
const { Wishlist } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a wishlist
 * @param {Object} user
 * @param {Object} websites
 * @returns {Promise<Wishlist>}
 */
const addToWishlist = async (user, websites) => {
  const wishlist = Wishlist.find({ user: user.id });
  if (wishlist) {
    wishlist.websites = wishlist.websites.concat(websites);
    await wishlist.save();
    return wishlist;
  }
  const newWishlist = await Wishlist.create({ user: user.id, websites });
  return newWishlist;
};

/**
 * Create a wishlist
 * @param {Object} wishlistBody
 * @returns {Promise<Wishlist>}
 */
const removeFromWishlist = async (user, websites) => {
  const wishlist = Wishlist.find({ user: user.id });
  if (wishlist) {
    wishlist.websites = wishlist.websites.filter((website) => !websites.includes(website));
    await wishlist.save();
    return wishlist;
  }

  throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist not found');
};

/**
 * Get wishlist
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<[Wishlist]>}
 */
const getWishlist = async (user) => {
  const wishlist = await Wishlist.find({ user: user.id });
  if (!wishlist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist not found');
  }
  return wishlist;
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
