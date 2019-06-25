const formidable = require("formidable");
const path = require("path");
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
const DATABASE = global.DATABASE;

const get = (req, res) => {
  res.status(200).render("admin");
};

const skills = (req, res) => {
  const { body } = req;

  DATABASE.emit("skills/post", body)
    .then(() => {
      res.status(200).render("admin", { msgskill: "Ваши данные обновлены!" });
    })
    .catch(error => {
      res
        .status(500)
        .render("admin", { msgskill: "Произошла ошибка на сервере!" });
    });
};

const upload = (req, res, next) => {
  const form = new formidable.IncomingForm();
  const upload = path.join("public", "assets", "img", "products");

  form.uploadDir = path.join(process.cwd(), upload);

  access(path.join(process.cwd(), upload))
    .catch(error => console.log("error", error) || mkdir(upload))
    .then(() => {
      form.parse(req, (error, fields, files) => {
        if (error) {
          files.photo && unlink(files.photo.path).catch(error => next(error));

          return res
            .status(500)
            .render("admin", { msgfile: "Произошла ошибка на сервере!" });
        }

        const valid = photoValidation(fields, files);
        const fileName = path.join(upload, files.photo.name);
        const filePathInDb = path.normalize(
          fileName.substr(fileName.indexOf("\\"))
        );
        const { name, price } = fields;

        if (valid.err) {
          return unlink(files.photo.path).then(() => {
            res
              .status(403)
              .render("admin", { msgfile: "Выберите корректные данные!" });
          });
        }

        rename(files.photo.path, fileName, err => {
          if (err) {
            return res
              .status(500)
              .render("admin", { msgfile: "Произошла ошибка на сервере!" });
          }

          DATABASE.emit("upload/product", { name, price, src: filePathInDb })
            .then(() => {
              res.status(200).render("admin", { msgfile: "Товар добавлен!" });
            })
            .catch(error =>
              res
                .status(500)
                .render("admin", { msgfile: "Произошла ошибка на сервере!" })
            );
        });
      });
    });
};

module.exports = {
  get,
  skills,
  upload
};
