const crypto = require("crypto");

const createHash = password =>
  crypto.pbkdf2Sync(password, process.env.SALT, 1000, 64, "sha512");

const isValidPassword = (user, password) =>
  user.password.toString() === createHash(password).toString();

module.exports = {
  createHash,
  isValidPassword
};
