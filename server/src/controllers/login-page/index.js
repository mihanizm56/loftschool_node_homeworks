const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const { checkUser } = require("../../services/db/user");

const adapter = new FileAsync("db.json");
const db = low(adapter);

const loginPostController = (req, res) => {
  console.log("login post", req.body);
  const { body: { email = "", password = "" } = {} } = req;
  if (email && password) {
    console.log("123");
    db.get("user").then(userData => {
      console.log("userData", userData);
    });
    //   console.log("isValidUser", email, password, isValidUser);
    //   if (isValidUser) {
    //     req.session.validUser = true;
    //     res.redirect("index");
    //   } else {
    //     res.render("login", { msglogin: "not valid" });
    //   }
    // }
  }
};

const loginGetController = (req, res) => {
  console.log("login get");

  res.render("login");
};

module.exports.loginPostController = loginPostController;
module.exports.loginGetController = loginGetController;
