const express = require("express");
const router = express.Router();

router.get("/index", function(req, res, next) {
  console.log("test");
  res.status(200).render("index");
});

module.exports = router;
