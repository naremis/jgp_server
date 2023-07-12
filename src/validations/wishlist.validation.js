const Joi = require('joi');

const addToWishlist = {
  body: Joi.object().keys({
    websites: Joi.array()
      .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required())
      .required(),
  }),
};

const removeFromWishlist = {
  body: Joi.object().keys({
    websites: Joi.array()
      .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/).required())
      .required(),
  }),
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
};
