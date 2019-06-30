module.exports = async (ctx, next) =>
  ctx.session.validUser ? next() : ctx.redirect("/login");
