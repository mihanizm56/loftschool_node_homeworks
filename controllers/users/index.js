const {
  addUserInDb,
  getUserFromDbByUserName,
  getUserFromDbById,
  updateUserFromDb,
  deleteUserByIdFromDb,
  getAllUsersFromDb
} = require("../../models/users");
const { validateUser } = require("../../services/validation/user");
const {
  makeHashedPassword,
  compareHashedPasswords
} = require("../../services/passwords");
const { getPermissionUsersData } = require("../../services/users");
const { createToken } = require("../../services/tokens");

const updateUser = async (req, res) => {
  const userDataToUpdate = JSON.parse(req.body);
  // const userDataToUpdate = req.body;
  const userId = req.params.id;
  console.log("update user data", userId, userDataToUpdate);

  try {
    const user = await getUserFromDbById(userId);

    if (user) {
      try {
        const userFullData = {
          username: user.username,
          firstName: user.firstName,
          surName: user.surName,
          middleName: user.middleName,
          permission: user.permission,
          ...userDataToUpdate
        };
        const access_token = createToken(user._id);
        await updateUserFromDb(userId, userFullData);
        res.status(200).send({ ...userFullData, access_token });
      } catch (error) {
        res.status(400).send("not valid user data");
      }
    } else {
      res.status(401).send("user not valid");
    }
  } catch (error) {
    res.status(400).send("not valid user data");
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params;
  console.log("check id of user to delete", userId);

  try {
    await deleteUserByIdFromDb(userId);
    res.status(200).send("success");
  } catch (error) {
    console.log("not valid data", error);

    res.status(400).send("delete error");
  }
};

const getAllUsers = async (req, res) => {
  console.log("send all users");

  try {
    const users = await getAllUsersFromDb();
    const permissionUsersData = getPermissionUsersData(users);
    console.log("get all users", permissionUsersData);

    res.status(200).send(permissionUsersData);
  } catch (error) {
    console.log("error when getting users", error);

    res.status(500).send("internal error");
  }
};

const updateUserPermissions = async (req, res) => {};

module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  updateUserPermissions
};
