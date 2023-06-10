const Joi = require('joi');

const createOrder = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};
const updateOrder = {
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const getOrder = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
module.exports = {
  createOrder,
  updateOrder,
  getOrder,
};
