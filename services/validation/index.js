const Joi = require("@hapi/joi");
const { userSchema } = require("../../models/db/schemas");
const { getUserData } = require("../db");

const DATABASE = global.DATABASE;

const photoValidation = (fields, files) => {
  if (files.photo.name === "" || files.photo.size === 0) {
    return { status: "Не загружена картинка!", err: true };
  }
  if (!fields.name) {
    return { status: "Не указано описание картинки!", err: true };
  }
  return { status: "Ok", err: false };
};

const userValidation = (email, password) => {
  return Joi.validate({ email, password }, userSchema)
    .then(() => {
      DATABASE.emit("get_user_data", { email, password })
        .then(({ credentials }) => {
          if (
            credentials.email === email &&
            credentials.password === password
          ) {
            return { status: "success" };
          } else {
            return { status: "not valid" };
          }
        })
        .catch(error => {
          console.log("error", "not valid");
          throw new Error("not valid");
        });
    })
    .catch(error => {
      console.log("error", "not correct data");
      throw new Error("not valid");
    });
};

module.exports = {
  photoValidation,
  userValidation
};
