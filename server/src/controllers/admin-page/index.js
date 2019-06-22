const db = require("../../models/db/db")();

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

const upload = (req, res) => {
  const { body: { name, price, photo } = {} } = req;
  console.log("check request", name, price, photo);
  if ((name, price, photo)) {
    console.log("data skills valid");
    Promise.resolve(db.get("user"))
      .then(({ goods }) => {
        goods.push({ name, price, photo });
        db.save();
        res.status(200).render("admin", { msgfile: "Товар добавлен!" });
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

module.exports = {
  get,
  skills,
  upload
};