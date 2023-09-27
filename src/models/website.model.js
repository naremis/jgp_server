/* eslint-disable func-names */

const mongoose = require('mongoose');
const { toJSON, paginate, dynamicCondition } = require('./plugins');

const websiteSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    domainType: {
      type: String,
      required: true,
      trim: true,
    },
    domainAuthority: {
      type: Number,
      required: true,
    },
    domainRating: {
      type: Number,
      required: true,
    },
    extension: {
      type: String,
    },
    traffic: {
      type: Number,
      required: true,
    },
    spam: {
      type: Number,
      default: 0,
      required: true,
    },
    websiteIndexDate: {
      type: Date,
      required: true,
    },
    exampleCases: {
      type: [String],
    },
    linksAllowed: {
      type: Number,
    },
    country: {
      code: String,
      name: String,
    },
    categories: [{
      category: {
        type: String,
        enum: ['GENERAL', 'CRYPTO', 'CBD', 'NON_ENGLISH', 'MEDICINE', 'LINK_INSERTION'],
        required: true,
      },
      isAllowed: Boolean,
      price: {
        type: Number,
        required: true,
      },
    }],
    _deleted: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose object to json
websiteSchema.plugin(toJSON);
websiteSchema.plugin(paginate);
websiteSchema.plugin(dynamicCondition);

// method to get me the static data

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;
