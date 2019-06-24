const express = require("express");
const router = express.Router();

const ctrlAdmin = require("../../controllers/admin-page");
const { adminMiddleware } = require("../../middlewares/auth-login");

router.get("/", ctrlAdmin.get);
router.post("/skills", ctrlAdmin.skills);
router.post("/upload", ctrlAdmin.upload);

module.exports = router;
