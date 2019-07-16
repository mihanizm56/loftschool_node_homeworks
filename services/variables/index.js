require("dotenv").config();

const port = process.env.PORT || 8080;
let dbURL;

switch (process.env.NODE_ENV) {
  case "development":
    dbURL = process.env.DB_URI_DEVELOPMENT;
    break;
  case "production":
    dbURL = process.env.DB_URI_PRODUCTION;
    break;
  case "test":
    dbURL = process.env.DB_URI_TEST;
    break;

  default:
    DB_URI = process.env.DB_URI_DEVELOPMENT;
    break;
}

module.exports = {
  port,
  dbURL
};
