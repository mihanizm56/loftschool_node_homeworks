const express = require("express");
const router = express.Router();

const indexPageRouter = require("./index-page");
const loginPageRouter = require("./login-page");

router.use("/index", indexPageRouter);
router.use("/login", loginPageRouter);

module.exports = router;
