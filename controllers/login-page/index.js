const db = require("../../models/db/db")();

const post = (req, res) => {
  console.log("login post", req.body);
  const { body: { email = "", password = "" } = {} } = req;
  if (email && password) {
    Promise.resolve(db.get("user")).then(
      ({ credentials: { email: userEmail, password: userPassword } }) => {
        console.log("db credentials", userEmail, userPassword);
        if (email === userEmail && password === userPassword) {
          req.session.validUser = true;
          res.status(200).redirect("/admin");
        } else {
          res.status(401).render("login", { msglogin: "not valid" });
        }
      }
    );
  } else {
    res.status(401).render("login", { msglogin: "not valid" });
  }
};

const get = (req, res) => {
  res.render("login");
};

module.exports = {
  post,
  get
};
