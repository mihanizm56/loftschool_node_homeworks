const adminMiddleware = (req, res, next) =>
  req.session.validUser ? next() : res.redirect("login");

module.exports.adminMiddleware = adminMiddleware;
