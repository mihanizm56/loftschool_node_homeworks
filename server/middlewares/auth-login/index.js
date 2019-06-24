module.exports = (req, res, next) =>
  req.session.validUser ? next() : res.redirect("/login");
