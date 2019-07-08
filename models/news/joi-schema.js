const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  theme: Joi.string()
    .min(1)
    .max(20)
    .required(),
  text: Joi.string()
    .min(1)
    .max(20)
    .required(),
  userId: Joi.string()
    .min(1)
    .max(20)
    .required(),
  id: Joi.string()
    .min(1)
    .max(20)
    .required(),
  date: Joi.date()
});
