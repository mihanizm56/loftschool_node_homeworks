const express = require("express");
const router = express.Router();

const {
  loginPostController,
  loginGetController
} = require("../../controllers/login-page");

router.get("/", loginGetController);
router.post("/", loginPostController);

module.exports = router;
