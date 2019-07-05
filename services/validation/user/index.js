const Joi = require("@hapi/joi");
const userSchema = require("../../models/users/joi-schema");

module.exports = ({ username, password, name, secondname, lastname }) => {
  return Joi.validate(
    { username, password, name, secondname, lastname },
    skillsSchema
  );
};
