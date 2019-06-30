const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/admin");
const loginCtrl = require("../controllers/login");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/login", loginCtrl.get);
router.post("/login", loginCtrl.post);
router.get("/admin", isAuthenticated, adminCtrl.get);

module.exports = router;
