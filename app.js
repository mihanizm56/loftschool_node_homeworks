require("dotenv").config();
require("./services/db-listeners");

const createError = require("http-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const router = require("./routes");
const enableChat = require("./controllers/chat");
const app = express();
const server = require("http").createServer(app);

app.use(cors({ origin: "*" }));
// app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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
var host = process.env.YOUR_HOST || "0.0.0.0";

// func to start the server
const startServer = serverPort =>
  new Promise((resolve, reject) => {
    try {
      server.listen(serverPort, host);
      resolve(server);
    } catch (error) {
      reject(error);
    }
  });

// func to start the db connection
const connectDB = () => {
  mongoose.Promise = global.Promise;

  const options = {
    useNewUrlParser: true,
    useFindAndModify: false
  };

  mongoose.connect(process.env.DB_URL, options);
  mongoose.set("useCreateIndex", true);

  console.log("connected to mongo db");

  return mongoose.connection;
};

// func to start the whole rest-api server
connectDB().once("open", () => {
  startServer(port)
    .then(server => {
      console.log("app started on port", port);
      enableChat(server);
      console.log("chat started on port", port);
    })
    .catch(error => console.log("error during server start", error));
});
