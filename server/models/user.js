const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ user: { email: "m727507.56@mail.ru", password: "1" } }).write();

const checkUser = (email, password) => {
  const userDB = db.get("user");
  console.log("debug userDB", userDB);

  return userDB.email === email && userDB.password === password;
};

module.exports.checkUser = checkUser;
