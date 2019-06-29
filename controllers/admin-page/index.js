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

const get = (req, res) => {
  res.status(200).render("admin");
};

const skills = (req, res) => {
  const { age, concerts, cities, years } = req.body;
  console.log("1");

  Joi.validate({ age, concerts, cities, years }, skillsSchema)
    .then(() => {
      console.log("2");
      DATABASE.emit("skills/post", req.body)
        .then(() => {
          res
            .status(200)
            .render("admin", { msgskill: "Ваши данные обновлены!" });
        })
        .catch(error => {
          console.log("3");
          res
            .status(500)
            .render("admin", { msgskill: "Произошла ошибка на сервере!" });
        });
    })
    .catch(error => {
      console.log("4");
      res
        .status(403)
        .render("admin", { msgskill: "Ведите корректные данные!" });
    });
};

const postAddProduct = (req, res) => {
  const { name, price } = req.body;
  const { originalname: photoName, size, buffer, filename } = req.file;
  const staticPath = path.join("assets", "img", "products");
  const staticPathToFile = path.join(staticPath, photoName);
  const uploadDir = path.join(process.cwd(), "/public", staticPath);

  photoValidation(req.file)
    .then(() =>
      access(uploadDir).catch(() =>
        mkdir(uploadDir).catch(error =>
          res
            .status(500)
            .render("admin", { msgfile: "Произошла ошибка на сервере!" })
        )
      )
    )
    .then(() =>
      rename(path.join(uploadDir, filename), path.join(uploadDir, photoName))
    )
    .then(() => {
      DATABASE.emit("upload/product", { name, price, src: staticPathToFile })
        .then(() => {
          res.status(200).render("admin", { msgfile: "Товар добавлен!" });
        })
        .catch(error =>
          res
            .status(500)
            .render("admin", { msgfile: "Произошла ошибка на сервере!" })
        );
    })
    .catch(error => {
      res.status(403).render("admin", { msgfile: "Ведите корректные данные!" });
    });
};

module.exports = {
  get,
  skills,
  postAddProduct
};
