const DATABASE = global.DATABASE;

const get = (req, res) => {
  res.render("login");
};

const post = (req, res) => {
  console.log("login post", req.body);
  const { body: { email = "", password = "" } = {} } = req;

  DATABASE.emit("login/post", { email, password })
    .then(result => {
      req.session.validUser = true;
      res.status(200).redirect("/admin");
    })
    .catch(error => {
      res
        .status(500)
        .render("/login", { msglogin: "Произошла ошибка на сервере!" });
    });
};

module.exports = {
  post,
  get
};
