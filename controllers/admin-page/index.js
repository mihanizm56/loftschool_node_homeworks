const path = require("path");
const Joi = require("@hapi/joi");
const {
  access,
  readdir,
  readFile,
  writeFile,
  lstat,
  rmdir,
  mkdir,
  unlink,
  stat,
  rename
} = require("../../services/promise-fs");
const { photoValidation } = require("../../services/validation");
const { skillsSchema } = require("./schemas");

module.exports = (req, res, next) => {};

const DATABASE = global.DATABASE;

const get = async ctx => {
  ctx.status = 200;
  ctx.render("admin");
};

const skills = async ctx => {
  const { age, concerts, cities, years } = ctx.request.body;

  try {
    await Joi.validate({ age, concerts, cities, years }, skillsSchema);
  } catch (error) {
    console.log("error", error);
    ctx.status = 400;
    ctx.render("login", { msgskill: "Введите корректные данные!" });
  }

  try {
    await DATABASE.emit("skills/post", ctx.request.body);
    ctx.status = 200;
    ctx.render("admin", { msgskill: "Ваши данные обновлены!" });
  } catch (error) {
    console.log("error", error);
    ctx.status = 500;
    ctx.render("admin", { msgskill: "Ошибка сервера!" });
  }
};

const postAddProduct = async ctx => {
  const { name, price, files: file } = ctx.request.body;
  const { name: photoName, size, path: pathToFile } = ctx.request.files.photo;
  const staticPath = path.join("assets", "img", "products");
  const staticPathToFile = path.join(staticPath, photoName);
  const uploadDir = path.join(process.cwd(), "/public", staticPath);

  try {
    await photoValidation(photoName, size);
  } catch (error) {
    console.log("error", error);
    ctx.status = 400;
    ctx.render("admin", { msgfile: "Введите корректные данные!" });
    return;
  }

  try {
    await access(uploadDir);
  } catch (error) {
    await mkdir(uploadDir);
  }

  try {
    await rename(pathToFile, path.join(uploadDir, photoName));
    await DATABASE.emit("upload/product", {
      name,
      price,
      src: staticPathToFile
    });
  } catch (error) {
    console.log("error", error);
    ctx.status = 500;
    ctx.render("admin", { msgfile: "Произошла ошибка на сервере!" });
    return;
  }

  ctx.status = 200;
  ctx.render("admin", { msgfile: "Товар добавлен!" });
};

module.exports = {
  get,
  skills,
  postAddProduct
};
