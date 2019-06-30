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

  try {
    await Joi.validate({ email, password }, userSchema);
  } catch (error) {
    console.log("error", error);
    ctx.status = 401;
    ctx.render("login", { msglogin: "Введите корректный логин или пароль!" });
  }

  try {
    await DATABASE.emit("login/post", { email, password });
    ctx.session.validUser = true;
    ctx.status = 200;
    ctx.redirect("admin");
  } catch (error) {
    console.log("error", error);
    ctx.status = 500;
    ctx.render("login", { msglogin: "Ошибка сервера!" });
  }
};

module.exports = {
  post,
  get
};
