const {
  addUserInDb,
  getUserFromDbByUserName,
  getUserFromDbById,
  updateUserFromDb,
  deleteUserByIdFromDb
} = require("../../models/users");
const { validateUser } = require("../../services/validation/user");
const {
  makeHashedPassword,
  compareHashedPasswords
} = require("../../services/passwords");

const createUser = async (req, res) => {
  // const newUser = JSON.parse(req.body);
  const newUser = req.body;
  console.log("check data of user", newUser);

  try {
    await validateUser(newUser);
    const user = await getUserFromDbByUserName(newUser);
    if (user) {
      console.log("there is a user in db");
      res.status(400).send("user exists");
    } else {
      try {
        console.log("add the user in db");
        const {
          username,
          password,
          firstName,
          surName,
          middleName,
          _id: id
        } = await addUserInDb(newUser).save();
        res.status(200).send({ username, firstName, surName, middleName, id });
      } catch (error) {
        console.log("not valid data", error);
        res.status(400).send("not valid user data");
      }
    }
  } catch (error) {
    console.log("not valid data", error);
    res.status(400).send("not valid user data");
  }
};

const loginUser = async (req, res) => {
  // const loginedUser = JSON.parse(req.body);
  const loginedUser = req.body;
  console.log("check data of user", loginedUser);

  try {
    await validateUser(loginedUser);
    const user = await getUserFromDbByUserName(loginedUser);
    const {
      username,
      password,
      firstName,
      surName,
      middleName,
      _id: id
    } = await getUserFromDbByUserName(loginedUser);
    console.log(
      "check data of user from db",
      username,
      password,
      firstName,
      surName,
      middleName
    );
    const comparePasswords = compareHashedPasswords(
      makeHashedPassword(loginedUser.password),
      password
    );
    if (user && comparePasswords) {
      console.log("user is defined, pass");
      res.status(200).send({
        username,
        firstName,
        surName,
        middleName,
        id
      });
    } else {
      console.log("user is not defined");
      res.status(401).send("user not valid");
    }
  } catch (error) {
    console.log("not valid data", error);
    res.status(400).send("not valid user data");
  }
};

const tokenAuth = async (req, res) => {
  const loginedUser = req.user;
  console.log("check data of user", loginedUser);

  try {
    await validateUser(loginedUser);
    const {
      username,
      password,
      firstName,
      surName,
      middleName,
      _id: id
    } = await getUserFromDbByUserName(loginedUser);

    if (username && password) {
      const responceUserData = { username, firstName, surName, middleName, id };
      const comparePasswords = compareHashedPasswords(
        makeHashedPassword(loginedUser.password),
        password
      );

      console.log("check data of user from db", responceUserData);
      if (password && comparePasswords) {
        console.log("user is defined, pass");
        res.status(200).send(responceUserData);
      } else {
        console.log("user is not defined");
        res.status(401).send("user not valid");
      }
    }
  } catch (error) {
    console.log("not valid data", error);
    res.status(400).send("not valid user data");
  }
};

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

module.exports = {
  loginUser,
  createUser,
  tokenAuth,
  updateUser,
  deleteUser
};
