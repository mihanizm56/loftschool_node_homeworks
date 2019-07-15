const crypto = require("crypto");
const salt = process.env.SALT || "salt";

/// func to hash the password
module.exports.makeHashedPassword = purePassword => {
  console.log("makeHashedPassword");
  return crypto.pbkdf2Sync(purePassword, salt, 1000, 64, "sha512");
};

/// func to compare two hashed passwords
module.exports.compareHashedPasswords = (passwordOne, passwordTwo) => {
  console.log(
    "compareHashedPasswords",
    passwordOne.toString() === passwordTwo.toString()
  );
  return passwordOne.toString() === passwordTwo.toString();
};
