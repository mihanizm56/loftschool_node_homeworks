const express = require("express");
const router = express.Router();

const indexPageRouter = require("./index-page");
const loginPageRouter = require("./login-page");
const adminPageRouter = require("./admin-page");
const adminMiddleware = require("../middlewares/auth-login");

const senderMessage = require("../controllers/mail-sender");

router.use("/mail", senderMessage);
router.use("/index", indexPageRouter);
router.use("/login", loginPageRouter);
router.use("/admin", adminMiddleware, adminPageRouter);

module.exports = router;
