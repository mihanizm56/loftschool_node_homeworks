const { checkUser } = require("../../services/db/user");

const loginPostController = (req, res) => {
  console.log("login post", req.body);
  const { body: { email = "", password = "" } = {} } = req;
  if (email && password) {
    const isValidUser = checkUser(email, password);

    if (isValidUser) {
      req.session.validUser = true;
      res.redirect("index");
    } else {
      res.render("login", { msglogin: "not valid" });
    }
  }
};

const loginGetController = (req, res) => {
  console.log("login get");

  res.render("login");
};

module.exports.loginPostController = loginPostController;
module.exports.loginGetController = loginGetController;
