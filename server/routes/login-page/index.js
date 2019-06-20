const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../middlewares/auth-login");

const {
  loginPostController,
  loginGetController
} = require("../../controllers/login-page");

router.get("/", loginGetController);
router.post("/", authMiddleware, loginPostController);

module.exports = router;
