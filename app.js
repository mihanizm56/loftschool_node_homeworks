// add the config of .env variables
require("dotenv").config();

// add the main libs
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
var createError = require("http-errors");
var logger = require("morgan");

// add the db event listeners
require("./api/services/modules/db");

// add the main router
const authRouter = require("./api/routes");

// define the server port
const port = process.env.SERVER_PORT || 10000;

// define the middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// func to start the server
const startServer = () => {
  app.listen(port);
  console.log("auth app started on port", port);
};

// func to start the db connection
const connectDB = () => {
  mongoose.Promise = global.Promise;

  const options = {
    useNewUrlParser: true
  };

  mongoose.connect(process.env.DB_URL, options);
  mongoose.set("useCreateIndex", true);

  console.log("connected to db");

  return mongoose.connection;
};

// func to start the whole rest-api server
connectDB().once("open", startServer);
