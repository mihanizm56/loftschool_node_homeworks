const loginPostController = (req, res) => {
  console.log("login post", req.body);

  res.render("login");
};

const loginGetController = (req, res) => {
  console.log("login get");

  res.render("login");
};

module.exports.loginPostController = loginPostController;
module.exports.loginGetController = loginGetController;
