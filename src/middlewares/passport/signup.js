const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/users");
const { createHash } = require("./utils");

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({ username: username })
        .then(user => {
          if (user) {
            console.log("User already exists with username: " + username);
            done(null, false);
          } else {
            const newUser = new User({
              username,
              password: createHash(password)
            });
            newUser
              .save()
              .then(() => {
                console.log("User Registration succesful");
                done(null, newUser);
              })
              .catch(error => {
                console.log("Error in Saving user: " + error);
                throw error;
              });
          }
        })
        .catch(error => done(error));
    }
  )
);
