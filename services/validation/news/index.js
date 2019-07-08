const Joi = require("@hapi/joi");
const newsSchema = require("../../../models/news/joi-schema");

const validateNews = ({ theme, date, text, userId, id }) => {
  return Joi.validate({ theme, date, text, userId, id }, newsSchema);
};

module.exports = { validateNews };
