require("dotenv").config();
const { port, dbURL } = require("./services/variables");
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
const startChat = require("./controllers/chat");
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

const startServer = (ownServer, ownPort) =>
  new Promise((resolve, reject) => {
    try {
      ownServer.listen(ownPort, () => {
        resolve(ownServer);
      });
    } catch (error) {
      reject(error);
    }
  });

// func to start the db connection
const startDB = () => {
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false
  };

  mongoose.Promise = global.Promise;
  mongoose.connect(dbURL, options);
  mongoose.set("useCreateIndex", true);
  console.log("connected to mongo db");

  return mongoose.connection;
};

const startApp = serverPort => serverState => {
  startDB().once("open", () => {
    startServer(serverState, serverPort)
      .then(server => {
        console.log("app started on port", port);
        startChat(server);
        console.log("chat started on port", port);
      })
      .catch(error => console.log("error during server start", error));
  });
};

if (require.main === module) {
  startApp(port)(server);
} else {
  module.exports.startApp = startApp(port);
}
