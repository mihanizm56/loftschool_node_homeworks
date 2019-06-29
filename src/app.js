// add the config of .env variables
require("dotenv").config();

// add the main libs
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

// add the db event listeners
require("./services/modules/db");

// add the main router
const rootRouter = require("./routes");

// define the server port
const port = process.env.SERVER_PORT || 10000;

// view engine setup
app.set("views", path.join(__dirname, "views", "pages"));
app.set("view engine", "pug");

// static files
app.use(express.static(path.join(__dirname, "..", "public")));

// define the middlewares
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", rootRouter);

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
