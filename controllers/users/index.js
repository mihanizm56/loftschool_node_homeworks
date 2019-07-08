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

const updateUser = async (req, res) => {
  // const loginedUser = JSON.parse(req.body);
  const userDataToUpdate = req.body;
  const userId = req.params;
  const { username, password, ...rest } = userDataToUpdate;
  console.log("check data of user", userDataToUpdate);

  try {
    await validateUser(userDataToUpdate);
    const user = await getUserFromDbById(userId);
    console.log("check data of user from db", user);
    const comparePasswords = compareHashedPasswords(
      makeHashedPassword(password),
      user.password
    );
    if (user && comparePasswords) {
      console.log("user is defined try to update");
      try {
        await updateUserFromDb({
          prevUserName: user.username,
          username,
          password: makeHashedPassword(password),
          ...rest
        });
        console.log("new user data is updated");
        res.status(200).send({
          username,
          ...rest
        });
      } catch (error) {
        console.log("new user data was not updated", error);
        res.status(400).send("not valid user data");
      }
    } else {
      console.log("user is not defined");
      res.status(401).send("user not valid");
    }
  } catch (error) {
    console.log("not valid data", error);
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
