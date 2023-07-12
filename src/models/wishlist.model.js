/* eslint-disable func-names */

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const wishlistSchema = mongoose.Schema(
  {
    websites: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Website',
          required: true,
        },
      ],
      set(websites) {
        return Array.from(new Set(websites)); // Remove duplicates using a Set
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
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
 * @typedef WishList
 */
const WishList = mongoose.model('WishList', wishlistSchema);

module.exports = WishList;
