// config
const express = require("express");
const routes = express.Router();

// controllers
const { loginUserController } = require("../controllers/login");
const { getPublicKeyController } = require("../controllers/public-key-sender");
const { authController } = require("../controllers/auth");
const { refreshController } = require("../controllers/refresh");

// services
const { tokenVerify } = require("../services/modules/tokens");

// routes
routes.post("/login", loginUserController);
routes.post("/authentificate", authController);
routes.post("/refresh", tokenVerify, refreshController);
routes.get("/public", getPublicKeyController);

module.exports = routes;
