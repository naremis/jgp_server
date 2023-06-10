const Joi = require('joi');

const createWebsite = {
  body: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required(),
        domainType: Joi.string().required(),
        domainAuthority: Joi.number().required(),
        domainRating: Joi.number().required(),
        traffic: Joi.number().required(),
        spam: Joi.number().required(),
        websiteIndexDate: Joi.date().required(),
        exampleCases: Joi.array().items(Joi.string()),
        linksAllowed: Joi.number(),
        country: {
          code: Joi.string(),
          name: Joi.string(),
        },
        pricing: Joi.array()
          .items(
            Joi.object({
              category: Joi.string().valid('GENERAL', 'CRYPTO', 'CBD', 'NON_ENGLISH', 'MEDICINE', 'LINK_INSERTION').required(),
              isAllowed: Joi.boolean(),
              price: Joi.number().required(),
            }),
          )
          .unique((a, b) => a.category === b.category),
      }).unknown(false),
    )
    .min(1), // Ensure there is at least one item in the array
};

const updateWebsite = {
  body: Joi.object().keys({
    domainType: Joi.string(),
    domainAuthority: Joi.number(),
    domainRating: Joi.number(),
    traffic: Joi.number(),
    spam: Joi.number(),
    websiteIndexDate: Joi.date(),
    exampleCases: Joi.array().items(Joi.string()),
    linksAllowed: Joi.number(),
    pricing: Joi.array().items(Joi.object().keys({
      category: Joi.string().valid('GENERAL', 'CRYPTO', 'CBD', 'NON_ENGLISH', 'MEDICINE', 'LINK_INSERTION').required(),
      isAllowed: Joi.boolean(),
      price: Joi.number().required(),
    })).unique((a, b) => a.category === b.category),
  }),
};

const getWebsites = {
  query: Joi.object().keys({
    domainType: Joi.string(),
    url: Joi.string(),
    domainAuthority: Joi.number(),
    domainRating: Joi.number(),
    pricing: Joi.array().items(Joi.object().keys({
      category: Joi.string().valid('GENERAL', 'CRYPTO', 'CBD', 'NON_ENGLISH', 'MEDICINE', 'LINK_INSERTION'),
      isAllowed: Joi.boolean(),
      price: Joi.number(),
    })).unique((a, b) => a.category === b.category),
    sortBy: Joi.string().valid('domainAuthority', 'domainRating', 'domainType', 'url', 'pricing'),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const filterWebsites = {
  body: Joi.array().items(Joi.object().keys({
    field: Joi.string().valid('domainType', 'url', 'domainAuthority', 'domainRating', 'pricing').required(),
    operator: Joi.string().valid('$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$in', '$nin').required(),
    value: Joi.any().required(),
  })),
};

module.exports = {
  createWebsite,
  updateWebsite,
  getWebsites,
  filterWebsites,
};
