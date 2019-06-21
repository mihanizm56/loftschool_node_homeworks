const db = require("../../models/db");

const checkUser = (email, password) => {
  const userDB = db.get("user");
  console.log("debug userDB", userDB);

  return userDB.email === email && userDB.password === password;
};

module.exports.checkUser = checkUser;
