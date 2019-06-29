require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");

require("./services/db");

const rootRouter = require("./routes");
const port = process.env.SERVER_PORT || 8080;

app.set("views", path.join(__dirname, "views", "pages"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", rootRouter);

const startServer = () => {
  app.listen(port);
  console.log("auth app started on port", port);
};

const connectDB = () => {
  const options = {
    useNewUrlParser: true
  };

  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DB_URL, options);
  mongoose.set("useCreateIndex", true);
  console.log("connected to db");

  return mongoose.connection;
};

// func to start the whole rest-api server
connectDB().once("open", startServer);
