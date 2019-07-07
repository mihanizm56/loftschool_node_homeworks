const { addUserInDb, getUserFromDb } = require("../../models/users");
const { validateUser } = require("../../services/validation/user");
const {
  makeHashedPassword,
  compareHashedPasswords
} = require("../../services/passwords");

const createUser = async (req, res) => {
  const newUser = req.body;
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
  const loginedUser = req.body;
  console.log("check data of user", loginedUser);

  try {
    await validateUser(loginedUser);
    const user = await getUserFromDb(loginedUser);
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

module.exports = {
  loginUser,
  createUser
};
