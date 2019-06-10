const randomId = require("uuid");
const mongoose = require("mongoose");
const { User } = require("../../../models/users");
const { makeHashedPassword } = require("../passwords");
const { compareHashedPasswords } = require("../passwords");

module.exports.addUserInDb = userData => {
	const User = mongoose.model("User");
	return (newUser = new User({ ...userData, password: makeHashedPassword(userData.password) }));
};

module.exports.userCollection = login => {
	const Users = mongoose.model("User");
	return Users.findOne({ login });
};
