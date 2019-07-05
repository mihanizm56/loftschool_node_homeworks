require("dotenv").config();
require("./models/db");

const createError = require("http-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = require("./routes");
const app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

// define the server port
const port = process.env.SERVER_PORT || 8080;

// func to start the server
const startServer = () => {
  app.listen(port);
  console.log("rest-api started on port", port);
};

// func to start the db connection
const connectDB = () => {
  mongoose.Promise = global.Promise;

  const options = {
    useNewUrlParser: true
  };

  mongoose.connect(process.env.DB_URL, options);
  mongoose.set("useCreateIndex", true);

  console.log("connected to mongo db");

  return mongoose.connection;
};

// func to start the whole rest-api server
connectDB().once("open", startServer);
