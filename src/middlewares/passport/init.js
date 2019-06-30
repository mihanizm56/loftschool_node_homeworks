var login = require("./login");
var signup = require("./signup");
var User = require("../../models/users");

module.exports = passport => {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser((user, done) => {
    console.log("serializing user: ", user);
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      console.log("deserializing user:", user);
      done(err, user);
    });
  });

  // Setting up Passport Strategies for Login and SignUp/Registration
  login(passport);
  signup(passport);
};
