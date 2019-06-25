const { userValidation } = require("../../services/validation");

const DATABASE = global.DATABASE;

const get = (req, res) => {
  res.render("login");
};

const post = (req, res) => {
  console.log("login post", req.body);
  const { body: { email, password } = {} } = req;
  userValidation(email, password)
    .then(() => {
      console.log("test1");
      DATABASE.emit("login/post", { email, password })
        .then(() => {
          req.session.validUser = true;
          res.status(200).redirect("/admin");
        })
        .catch(error => {
          console.log("error 1", error);

          res
            .status(500)
            .render("/login", { msglogin: "Произошла ошибка на сервере!" });
        });
    })
    .catch(error => {
      console.log("error 2", error);

      res
        .status(403)
        .render("/login", { msglogin: "Введите корректные данные!" });
    });
};

module.exports = {
  post,
  get
};
