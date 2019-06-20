const validateUser = (email, password) => {
  if (email === "m727507.56@mail.ru" && password === "1") {
    return true;
  } else {
    return false;
  }
};

const authMiddleware = (req, res, next) => {
  const { body: { email = "", password = "" } = {} } = req;
  if (email && password) {
    const isUserValid = validateUser(email, password);
    // console.log("check user data", email, password, isUserValid);
    return isUserValid ? res.redirect("/index") : next();
  }
};

module.exports.authMiddleware = authMiddleware;
