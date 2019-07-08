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
          img,
          permission,
          _id: id
        } = await addUserInDb(newUser).save();
        res
          .status(200)
          .send({
            username,
            firstName,
            surName,
            middleName,
            id,
            img,
            permission
          });
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
    const {
      username,
      password,
      firstName,
      surName,
      middleName,
      img,
      permission,
      _id: id
    } = await getUserFromDbByUserName(loginedUser);
    console.log(
      "check data of user from db",
      username,
      password,
      firstName,
      surName,
      middleName,
      img,
      permission
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
        id,
        img,
        permission
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
      firstName,
      password,
      surName,
      middleName,
      img,
      permission,
      _id: id
    } = await getUserFromDbByUserName(loginedUser);

    if (username && password) {
      const responceUserData = {
        username,
        firstName,
        surName,
        middleName,
        id,
        img,
        permission
      };
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

module.exports = {
  loginUser,
  createUser,
  tokenAuth
};
