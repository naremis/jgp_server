/* eslint-disable func-names */

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const wishlistSchema = mongoose.Schema(
  {
    website: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Website', required: true,
    },
    category: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose object to json
wishlistSchema.plugin(toJSON);
wishlistSchema.plugin(paginate);

/**
 * Check if wishlist already has that website
 * @param {id} id - id of the website
 * @param {category} Category - category` of the website
 * @returns {Promise<boolean>}
 */

wishlistSchema.statics.doesWebsiteExist = async function (name) {
  const order = await this.findOne({ name });
  return !!order;
};

/**
 * @typedef WishList
 */
const WishList = mongoose.model('WishList', wishlistSchema);

module.exports = WishList;
