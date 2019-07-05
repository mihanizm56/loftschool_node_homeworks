const { addUserInDb, getUserFromDb } = require("../../models/users");

const createUser = (req, res) => {
  //   const {} = req.body;
  console.log("//////", req.body);
  res.status(200).json({});
};

module.exports.createUser = createUser;
