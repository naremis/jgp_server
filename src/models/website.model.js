/* eslint-disable func-names */

const mongoose = require('mongoose');
const { URL } = require('url');
const { toJSON, paginate, dynamicCondition } = require('./plugins');

const websiteSchema = mongoose.Schema(
  {
    idLocal: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
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
    pricing: [{
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

websiteSchema.statics.maskURL = function (response) {
  const isMultiple = Array.isArray(response);

  const maskSingle = (website) => {
    const urlObj = new URL(website.url);
    const { hostname } = urlObj;

    let maskedURL = '';
    if (hostname.length < 6) {
      maskedURL = `${hostname.slice(0, -2)}**${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
    } else {
      maskedURL = `${hostname.slice(0, -3)}***${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
    }

    return {
      ...website.toJSON(),
      url: maskedURL,
    };
  };

  if (isMultiple) {
    return response.map((website) => maskSingle(website));
  }
  return maskSingle(response);
};
const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;
