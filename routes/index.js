const express = require("express");
const router = express.Router();
const sendSPA = require("../controllers/app");

router.get("*", sendSPA.get);

module.exports = router;
