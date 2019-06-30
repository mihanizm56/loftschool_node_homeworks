const Joi = require("@hapi/joi");

const userSchema = Joi.object().keys({
  email: Joi.string()
    .min(1)
    .max(20)
    .required(),
  password: Joi.string()
    .min(1)
    .max(20)
    .required()
});

module.exports = {
  userSchema
};
