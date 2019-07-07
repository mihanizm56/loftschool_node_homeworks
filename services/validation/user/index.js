const Joi = require("@hapi/joi");
const userSchema = require("../../../models/users/joi-schema");

const validateUser = ({
  username,
  password,
  firstName,
  surName,
  middleName
}) => {
  return Joi.validate(
    { username, password, firstName, surName, middleName },
    userSchema
  );
};

module.exports = { validateUser };
