const express = require("express");
const router = express.Router();

const indexPageRouter = require("./index-page");

router.use("/index", indexPageRouter);

module.exports = router;
