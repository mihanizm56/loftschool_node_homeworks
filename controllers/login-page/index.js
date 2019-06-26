const Joi = require("@hapi/joi");
const { userValidation } = require("../../services/validation");
const { userSchema } = require("./schemas");

const DATABASE = global.DATABASE;

const get = (req, res) => {
  res.render("login");
};

const post = (req, res) => {
  console.log("login post", req.body);
  const { body: { email, password } = {} } = req;

  return Joi.validate({ email, password }, userSchema)
    .then(() => {
      DATABASE.emit("login/post", { email, password })
        .then(() => {
          req.session.validUser = true;
          res.status(200).redirect("/admin");
        })
        .catch(error => {
          console.log("error in validate");

          res
            .status(403)
            .render("/login", { msglogin: "Введите корректные данные!" });
        });
    })
    .catch(error => {
      res
        .status(403)
        .render("/login", { msglogin: "Введите корректные данные!" });
    });
};

module.exports = {
  post,
  get
};
