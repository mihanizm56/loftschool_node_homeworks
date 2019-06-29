const express = require("express");
const multer = require("multer");
const router = express.Router();
const adminMiddleware = require("../middlewares/auth-login");
const upload = multer({ dest: "public/assets/img/products" });

const ctrlAdmin = require("../controllers/admin-page");
const ctrlIndex = require("../controllers/index-page");
const ctrlLogin = require("../controllers/login-page");
const ctrlMail = require("../controllers/mail-sender");

//admin
router.get("/admin", adminMiddleware, ctrlAdmin.get);
router.post("/admin/skills", ctrlAdmin.skills);
router.post("/admin/upload", upload.single("photo"), ctrlAdmin.postAddProduct);

//index
router.get("/index", ctrlIndex.get);

//login
router.get("/login", ctrlLogin.get);
router.post("/login", ctrlLogin.post);

//index
router.post("/mail", adminMiddleware, ctrlMail.post);

module.exports = router;
