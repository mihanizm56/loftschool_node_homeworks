const Joi = require("@hapi/joi");
const { userValidation } = require("../../services/validation");
const { userSchema } = require("./schemas");

const DATABASE = global.DATABASE;

const get = (req, res) => {
  res.render("login");
};

const post = (req, res) => {
  const { body: { email, password } = {} } = req;

  return Joi.validate({ email, password }, userSchema)
    .then(() => {
      DATABASE.emit("user/get", {})
        .then(
          ({ credentials: { email: userEmail, password: userPassword } }) => {
            if (email !== userEmail || password !== userPassword) {
              return res
                .status(400)
                .render("login", { msglogin: "Введите корректные данные!" });
            }
          }
        )
        .then(() => {
          req.session.validUser = true;
          res.status(200).redirect("/admin");
        });
    })
    .catch(error => {
      res
        .status(400)
        .render("login", { msglogin: "Введите корректные данные!" });
    });
};

module.exports = {
  post,
  get
};
