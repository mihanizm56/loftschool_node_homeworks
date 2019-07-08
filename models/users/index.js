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

module.exports.getUserFromDbByUserName = ({ username }) => {
  const Users = mongoose.model("User");

  return Users.findOne({ username });
};

module.exports.getUserFromDbById = ({ id: _id }) => {
  const Users = mongoose.model("User");

  return Users.findOne({ _id });
};

module.exports.updateUserFromDb = ({
  prevUserName,
  username,
  password,
  ...rest
}) => {
  const Users = mongoose.model("User");

  return Users.findOneAndUpdate(
    { username: prevUserName },
    { username, password, ...rest }
  );
};
