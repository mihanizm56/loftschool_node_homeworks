const db = require("../../models/db/db")();

const loginPostController = (req, res) => {
  console.log("login post", req.body);
  const { body: { email = "", password = "" } = {} } = req;
  if (email && password) {
    Promise.resolve(db.get("user")).then(
      ({ email: userEmail, password: userPassword }) => {
        if (email === userEmail && password === userPassword) {
          req.session.validUser = true;
          res.status(200).redirect("index");
        } else {
          res
            .status(401)
            .render("login", { msgslogin: true, msglogin: "not valid" });
        }
      }
    );
  } else {
    res.status(401).render("login", { msgslogin: true, msglogin: "not valid" });
  }
};

const loginGetController = (req, res) => {
  console.log("login get");

  res.render("login");
};

module.exports.loginPostController = loginPostController;
module.exports.loginGetController = loginGetController;
