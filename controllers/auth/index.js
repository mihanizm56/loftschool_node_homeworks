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
const { createToken } = require("../../services/tokens");

const createUser = async (req, res) => {
  const newUser = JSON.parse(req.body);
  // const newUser = req.body;

  try {
    await validateUser(newUser);
    const user = await getUserFromDbByUserName(newUser);
    if (user) {
      res.status(400).send("user exists");
    } else {
      try {
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
        const access_token = createToken(id);
        res.status(200).send({
          username,
          firstName,
          surName,
          middleName,
          id,
          img,
          permission,
          access_token
        });
      } catch (error) {
        res.status(400).send("not valid user data");
      }
    }
  } catch (error) {
    res.status(400).send("not valid user data");
  }
};

const loginUser = async (req, res) => {
  const loginedUser = JSON.parse(req.body);
  // const loginedUser = req.body;

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
    const comparePasswords = compareHashedPasswords(
      makeHashedPassword(loginedUser.password),
      password
    );

    if (username && comparePasswords) {
      const access_token = createToken(id);
      res.status(200).send({
        username,
        firstName,
        surName,
        middleName,
        id,
        img,
        permission,
        access_token
      });
    } else {
      res.status(401).send("user not valid");
    }
  } catch (error) {
    res.status(400).send("not valid user data");
  }
};

const tokenAuth = async (req, res) => {
  const loginedUser = req.user;

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

      if (password && comparePasswords) {
        res.status(200).send(responceUserData);
      } else {
        res.status(401).send("user not valid");
      }
    }
  } catch (error) {
    res.status(400).send("not valid user data");
  }
};

module.exports = {
  loginUser,
  createUser,
  tokenAuth
};
