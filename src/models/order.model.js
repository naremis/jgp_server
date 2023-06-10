/* eslint-disable func-names */

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    _deleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose object to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * Check if order already exist
 * @param {string} name -name of the order
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

orderSchema.statics.doesOrderExist = async function (name) {
  const order = await this.findOne({ name });
  return !!order;
};

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
