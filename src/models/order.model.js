const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['IN_CART', 'PENDING', 'IN_PROCESS', 'COMPLETED', 'REJECTED'],
    default: 'IN_CART',
  },
  amount: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  due: {
    type: Date,
    required: true,
  },
  items: [
    {
      key: {
        type: String,
        required: true,
      },
      website: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['PENDING', 'IN_WRITING', 'SUBMITTED', 'PUBLISHED'],
        default: 'PENDING',
      },
      published_url: {
        type: String,
      },
      links: [
        {
          anchor_text: {
            type: String,
            required: true,
          },
          target_url: {
            type: String,
            required: true,
          },
        },
      ],
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      content_type: {
        type: String,
        required: true,
      },
    },
  ],
  history: [
    {
      time: {
        type: Date,
        default: Date.now,
      },
      event: {
        type: String,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
