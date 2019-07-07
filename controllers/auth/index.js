const { addUserInDb, getUserFromDb } = require("../../models/users");
const { validateUser } = require("../../services/validation/user");

const createUser = async (req, res) => {
  const newUser = req.body;
  console.log("check data of user", newUser);

  try {
    await validateUser(newUser);
    const user = await getUserFromDb(newUser);
    console.log("/////", user);
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

module.exports.createUser = createUser;
