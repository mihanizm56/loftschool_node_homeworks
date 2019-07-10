const jwt = require("jsonwebtoken");
const jwt_secret_key = process.env.SECRET;
const timeAccessTokenExpires = process.env.TIME_TO_EXPIRE;

module.exports.createToken = userId => {
  const access_token = jwt.sign({ user: userId }, jwt_secret_key, {
    expiresIn: `${timeAccessTokenExpires}s`
  });

  console.log("token were created");
  return access_token;
};