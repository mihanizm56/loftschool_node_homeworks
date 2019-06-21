const express = require("express");
const router = express.Router();

const ctrlLogin = require("../../controllers/login-page");

router.get("/", ctrlLogin.get);
router.post("/", ctrlLogin.post);

module.exports = router;
