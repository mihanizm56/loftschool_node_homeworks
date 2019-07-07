const { addUserInDb, getUserFromDb } = require("../../models/users");
const { validateUser } = require("../../services/validation/user");
const {
  makeHashedPassword,
  compareHashedPasswords
} = require("../../services/passwords");

const createUser = async (req, res) => {
  const newUser = JSON.parse(req.body);
  console.log("check data of user", newUser);

  try {
    await validateUser(newUser);
    const user = await getUserFromDb(newUser);
    if (user) {
      console.log("there is a user in db");
      res.status(400).send("user exists");
    } else {
      console.log("add the user in db");
      addUserInDb(newUser).save();
      res.status(200).send(newUser);
    }
  } catch (error) {
    console.log("not valid data", error);
    res.status(400).send("not valid user data");
  }
};

const loginUser = async (req, res) => {
  const loginedUser = JSON.parse(req.body);
  console.log("check data of user", loginedUser);

  try {
    await validateUser(loginedUser);
    const user = await getUserFromDb(loginedUser);
    console.log("check data of user from db", user);
    const comparePasswords = compareHashedPasswords(
      makeHashedPassword(loginedUser.password),
      user.password
    );
    if (user && comparePasswords) {
      console.log("user is defined, pass");
      res.status(200).send(user);
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
      middleName
    } = await getUserFromDb(loginedUser);

    if (username && password) {
      const responceUserData = { username, firstName, surName, middleName };
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
