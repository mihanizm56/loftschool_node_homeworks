const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();
require("./models/db");
require("./middlewares/passport");

const rootRouter = require("./routes");
const { startServer, connectDB } = require("./utils");
const initPassport = require("./middlewares/passport");
const portForApp = process.env.SERVER_PORT || 8080;
const urlForDB = process.env.DB_URL;

app.set("views", path.join(__dirname, "views", "pages"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
  session({
    secret: process.env.SECRET_FOR_SESSIONS,
    key: "sessionkey",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24
    },
    saveUninitialized: false,
    resave: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", rootRouter);

connectDB(mongoose, urlForDB).once("open", () => startServer(app, portForApp));
