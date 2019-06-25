const Joi = require("@hapi/joi");

const skillsSchema = Joi.object()
  .keys({
    age: Joi.number()
      .integer()
      .min(1)
      .max(20)
      .required(),
    concerts: Joi.number()
      .integer()
      .min(1)
      .max(20)
      .required(),
    cities: Joi.number()
      .integer()
      .min(1)
      .max(20)
      .required(),
    years: Joi.number()
      .integer()
      .min(1)
      .max(20)
      .required()
  })
  .with("username", "birthyear")
  .without("password", "access_token");

const userSchema = Joi.object()
  .keys({
    email: Joi.string()
      .min(1)
      .max(20)
      .required(),
    password: Joi.string()
      .min(1)
      .max(20)
      .required()
  })
  .with("username", "birthyear")
  .without("password", "access_token");

module.exports = {
  skillsSchema,
  userSchema
};
