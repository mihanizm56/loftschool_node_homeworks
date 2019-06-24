const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../../middlewares/auth-login");

const ctrlAdmin = require("../../controllers/admin-page");
const ctrlIndex = require("../../controllers/index-page");
const ctrlLogin = require("../../controllers/login-page");

router.get("/admin", ctrlAdmin.get);
router.post("/admin/skills", ctrlAdmin.skills);
router.post("/admin/upload", ctrlAdmin.upload);
router.get("/index", ctrlIndex.get);
router.get("/login", ctrlLogin.get);
router.post("/login", ctrlLogin.post);

module.exports = router;
