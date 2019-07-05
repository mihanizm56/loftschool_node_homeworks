const mongoose = require("mongoose");
const { User } = require("./model");
const {
  makeHashedPassword,
  compareHashedPasswords
} = require("../../services/passwords");

module.exports.addUserInDb = userData => {
  const User = mongoose.model("User");
  return (newUser = new User({
    ...userData,
    password: makeHashedPassword(userData.password)
  }));
};

module.exports.getUserFromDb = username => {
  const Users = mongoose.model("User");
  return Users.findOne({ username });
};
