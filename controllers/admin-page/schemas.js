const Joi = require("@hapi/joi");

const skillsSchema = Joi.object()
  .keys({
    age: Joi.string()
      .min(1)
      .max(20)
      .required(),
    concerts: Joi.string()
      .min(1)
      .max(20)
      .required(),
    cities: Joi.string()
      .min(1)
      .max(20)
      .required(),
    years: Joi.string()
      .min(1)
      .max(20)
      .required()
  })
  .with("username", "birthyear")
  .without("password", "access_token");

module.exports = {
  skillsSchema
};
