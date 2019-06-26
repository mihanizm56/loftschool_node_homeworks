// add the config of .env variables
require("dotenv").config();
require("./services/event-emitter");
require("./services/db");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = require("./routes");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views", "pages"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET || "secret",
    key: "sessionkey",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 3000000
    },
    saveUninitialized: false,
    resave: false
  })
);
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;

//////TODO
/// 1) Multer
/// 2) Schemas in controllers
