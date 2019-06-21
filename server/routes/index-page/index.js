const express = require("express");
const router = express.Router();

const {
  indexGetController,
  indexPostController
} = require("../../controllers/index-page");

router.get("/", indexGetController);
router.post("/", indexPostController);

module.exports = router;
