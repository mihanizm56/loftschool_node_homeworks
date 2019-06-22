const express = require("express");
const router = express.Router();

const ctrlAdmin = require("../../controllers/admin-page");
const { adminMiddleware } = require("../../middlewares/auth-login");

router.get("/", adminMiddleware, ctrlAdmin.get);
router.post("/skills", adminMiddleware, ctrlAdmin.skills);
router.post("/upload", adminMiddleware, ctrlAdmin.upload);

module.exports = router;
