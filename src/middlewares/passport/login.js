const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../../models/users");
const { isValidPassword } = require("./utils");

passport.use(
  "login",
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, done) => {
      Users.findOne({ username: username })
        .then(user => {
          if (!user) {
            console.log("User Not Found with username " + username);
            return done(null, false);
          }

          if (!isValidPassword(user, password)) {
            console.log("Invalid Password");
            return done(null, false);
          }

          return done(null, user);
        })
        .catch(error => done(error));
    }
  )
);
