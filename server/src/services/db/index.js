const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");

const dbPath = path.join(__dirname, "..", "..", "db.json");
const adapter = new FileSync(dbPath);
const db = low(adapter);

// Default values, if json file wasn't created yet
db.defaults({
  user: {
    email: "m727507.56@mail.ru",
    password: "1"
  }
}).write();

class DBService {
  findUserByEmail(email) {
    return db
      .get("users")
      .find({ email: email })
      .value();
  }
}

// DBService.prototype.getSkills = () => {
//   return db.get("skills").value();
// };

// DBService.prototype.saveSkills = (skills = {}) => {
//   db.set("skills", skills).write();
// };

// DBService.prototype.getProducts = () => {
//   return db.get("products").value();
// };

// DBService.prototype.addProduct = product => {
//   db.get("products")
//     .push(product)
//     .write();
// };

// DBService.prototype.findUserByEmail = email => {
//   return db
//     .get("users")
//     .find({ email: email })
//     .value();
// };

module.exports = new DBService();
