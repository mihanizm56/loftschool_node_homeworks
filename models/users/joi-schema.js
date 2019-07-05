const Joi = require("@hapi/joi");

module.exports = Joi.object()
  .keys({
    username: Joi.string()
      .min(1)
      .max(20)
      .required(),
    name: Joi.string()
      .min(1)
      .max(20)
    secondname: Joi.string()
      .min(1)
      .max(20)
    lastname: Joi.string()
      .min(1)
      .max(20)
    password: Joi.string()
      .min(1)
      .max(20)
      .required()
  })