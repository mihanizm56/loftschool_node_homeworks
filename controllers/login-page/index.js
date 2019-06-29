const Joi = require("@hapi/joi");
const { userValidation } = require("../../services/validation");
const { userSchema } = require("./schemas");

const DATABASE = global.DATABASE;

const get = async ctx => {
  ctx.status = 200;
  ctx.render("login");
};

const post = async ctx => {
  console.log("ctx", ctx.request.body);
  const { email, password } = ctx.request.body;
  let result;
  try {
    result = await Joi.validate({ email, password }, userSchema);
  } catch (error) {
    res.status(403).render("login", { msglogin: "Введите корректные данные!" });
  }

  console.log("/////", result);
  // .then(() => {
  //   DATABASE.emit("login/post", { email, password })
  //     .then(() => {
  //       req.session.validUser = true;
  //       res.status(200).redirect("/admin");
  //     })
  //     .catch(error => {
  //       res
  //         .status(403)
  //         .render("login", { msglogin: "Введите корректные данные!" });
  //     });
  // })
  // .catch(error => {
  //   res
  //     .status(403)
  //     .render("login", { msglogin: "Введите корректные данные!" });
  // });
};

module.exports = {
  post,
  get
};
