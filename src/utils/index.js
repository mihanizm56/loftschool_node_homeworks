const startServer = (app, port) => {
  app.listen(port);
  console.log("auth app started on port", port);
};

const connectDB = (mongoose, urlForDB) => {
  const options = {
    useNewUrlParser: true
  };

  mongoose.Promise = global.Promise;
  mongoose.connect(urlForDB, options);
  mongoose.set("useCreateIndex", true);
  console.log("connected to db");

  return mongoose.connection;
};

module.exports = {
  startServer,
  connectDB
};
