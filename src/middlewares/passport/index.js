const passport = require("passport");
const User = require("../../models/users");

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

require("./login");
require("./signup");
