require("dotenv").config();

const passport = require("passport");
const passportJWT = require("passport-jwt");
const mongoose = require("mongoose");
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

passport.use(
  new Strategy(params, async (payload, done) => {
    console.log("payload in token from headers", payload);
    Boolean(payload.username)
      ? done(null, payload)
      : done(new Error("token not found"));
  })
);
