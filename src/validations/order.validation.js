const Joi = require('joi');

const createOrder = {
  body:
  Joi.object({
    websiteId: Joi.string().required(),
    url: Joi.string().required(),
    articles: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        websiteId: Joi.string().required(),
        links: Joi.array().items(
          Joi.object({
            id: Joi.string().required(),
            key: Joi.string().required(),
            link_no: Joi.number().integer().required(),
            target_url: Joi.string().required(),
            anchor_text: Joi.string().required(),
          }),
        ),
        category: Joi.string().required(),
        price: Joi.number().required(),
        content_type: Joi.string().required(),
      }),
    ).required(),
  }),
};
module.exports = { createOrder };
