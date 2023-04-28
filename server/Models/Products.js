const Joi = require('joi');

const productListSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().required(),
  price: Joi.number().required(),
  category: Joi.string().required()
});

module.exports = productListSchema;