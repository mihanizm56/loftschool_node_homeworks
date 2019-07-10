const mongoose = require("mongoose");
const { User } = require("./model");
const {
  makeHashedPassword,
  compareHashedPasswords
} = require("../../services/passwords");

const UserModel = mongoose.model("User");

const addUserInDb = userData =>
  (newUser = new UserModel({
    ...userData,
    password: makeHashedPassword(userData.password)
  }));

const getUserFromDbByUserName = ({ username }) =>
  UserModel.findOne({ username });

const getUserFromDbById = _id => UserModel.findOne({ _id });

const updateUserFromDb = (userId, userData) =>
  UserModel.findOneAndUpdate(
    { _id: userId },
    { ...userData, password: makeHashedPassword(userData.password) },
    { overwrite: false }
  );

const deleteUserByIdFromDb = ({ id: _id }) =>
  UserModel.deleteOne({ _id: mongoose.Types.ObjectId(`${_id}`) });

const getAllUsersFromDb = () => UserModel.find();

const savePhotoToUser = ({ userId, src }) => {
  UserModel.findOneAndUpdate({ id: userId }, { src }, { overwrite: false });
};

module.exports = {
  addUserInDb,
  getUserFromDbByUserName,
  getUserFromDbById,
  updateUserFromDb,
  deleteUserByIdFromDb,
  getAllUsersFromDb,
  savePhotoToUser
};
