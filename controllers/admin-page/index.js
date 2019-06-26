const path = require("path");
const Joi = require("@hapi/joi");
const {
  access,
  readdir,
  readFile,
  writeFile,
  lstat,
  rmdir,
  unlink,
  stat,
  rename
} = require("../../services/promise-fs");
const { photoValidation } = require("../../services/validation");
const { skillsSchema } = require("./schemas");
const filesUploader = require("../../services/upload-files");

module.exports = (req, res, next) => {};

const DATABASE = global.DATABASE;

const get = (req, res) => {
  res.status(200).render("admin");
};

const skills = (req, res) => {
  const { age, concerts, cities, years } = req.body;

  Joi.validate({ age, concerts, cities, years }, skillsSchema)
    .then(() => {
      DATABASE.emit("skills/post", req.body)
        .then(() => {
          res
            .status(200)
            .render("admin", { msgskill: "Ваши данные обновлены!" });
        })
        .catch(error => {
          res
            .status(500)
            .render("admin", { msgskill: "Произошла ошибка на сервере!" });
        });
    })
    .catch(error => {
      res
        .status(403)
        .render("admin", { msgskill: "Ведите корректные данные!" });
    });
};

const upload = (req, res) => {
  filesUploader(req)
    .then(data => {
      const {
        body: { name, price },
        path
      } = data;

      DATABASE.emit("upload/product", { name, price, src: path })
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
      console.log("error", error);
      res
        .status(403)
        .render("admin", { msgfile: "Выберите корректные данные!" });
    });
};

module.exports = {
  get,
  skills,
  upload
};
