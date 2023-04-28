const Joi = require("joi");

const UserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(100).required(),
  date: Joi.string().default(new Date().toLocaleString()),
});

module.exports = UserSchema;