const express = require("express");
const router = express.Router();

const { indexController } = require("../../controllers/index-page");

router.get("/", indexController);

module.exports = router;
