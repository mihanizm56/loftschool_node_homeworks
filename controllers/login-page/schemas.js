const Joi = require("@hapi/joi");

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
  userSchema
};
