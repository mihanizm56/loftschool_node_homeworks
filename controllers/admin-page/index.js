const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const db = require("../../models/db/db")();
const { photoValidation } = require("../../services/validation");

const get = (req, res) => {
  res.status(200).render("admin");
};

const skills = (req, res) => {
  const { body: { age, concerts, cities, years } = {} } = req;
  console.log("check request", age, concerts, cities, years);
  if (age && concerts && cities && years) {
    console.log("data skills valid");
    Promise.resolve(db.get("user"))
      .then(data => {
        db.set("user", {
          ...data,
          skills: {
            "Возраст начала занятий на скрипке": age,
            "Концертов отыграл": concerts,
            "Максимальное число городов в туре": cities,
            "Лет на сцене в качестве скрипача": years
          }
        });
        db.save();
        res.status(200).render("admin", { msgskill: "Ваши данные обновлены!" });
      })
      .catch(error => {
        console.log("get an error");
        res
          .status(500)
          .render("admin", { msgskill: "Произошла ошибка на сервере!" });
      });
  } else {
    res
      .status(403)
      .render("admin", { msgemail: "Выберите корректные данные!" });
  }
};

const upload = (req, res, next) => {
  const form = new formidable.IncomingForm();
  const upload = path.join("public", "assets", "img", "products");

  form.uploadDir = path.join(process.cwd(), upload);

  fs.access(upload, error => error && fs.mkdir(upload));

  form.parse(req, (error, fields, files) => {
    if (error) {
      console.log("error", error);
      return fs.unlink(files.photo.path, () => {
        next(error);
      });
    }

    const valid = photoValidation(fields, files);
    const fileName = path.join(upload, files.photo.name);
    const filePathInDb = fileName.substr(fileName.indexOf("\\"));
    const { name, price } = fields;

    if (valid.err) {
      return fs.unlink(files.photo.path, () => {
        res
          .status(403)
          .render("admin", { msgfile: "Выберите корректные данные!" });
      });
    }

    fs.rename(files.photo.path, fileName, err => {
      if (err) {
        console.log("error in rename", error);
        return;
      }

      console.log("fields", fields);
      Promise.resolve(db.get("user"))
        .then(({ products }) => {
          products.push({ name, price, src: filePathInDb });
          db.save();
          res.status(200).render("admin", { msgfile: "Товар добавлен!" });
        })
        .catch(error => {
          console.log("get an error", error);
          res
            .status(500)
            .render("admin", { msgfile: "Произошла ошибка на сервере!" });
        });
    });
  });
};

module.exports = {
  get,
  skills,
  upload
};