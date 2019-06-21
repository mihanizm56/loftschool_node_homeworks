const express = require("express");
const router = express.Router();

const ctrlIndex = require("../../controllers/index-page");

router.get("/", ctrlIndex.get);

module.exports = router;
