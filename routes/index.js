const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const sendSPA = require("../controllers/app");
const authCtrl = require("../controllers/auth");
const usersCtrl = require("../controllers/users");
const newsCtrl = require("../controllers/news");
const filesCtrl = require("../controllers/files");
const { cookieTokenAuth } = require("../middlewares/auth");
const passport = require("passport");
// const tokenAuthMiddleware = passport.authenticate("jwt", { session: false });
const upload = multer({ dest: "public/upload" });
const router = express.Router();

// authentification & login
router.post("/api/saveNewUser", authCtrl.createUser);
router.post("/api/login", authCtrl.loginUser);
router.post("/api/authFromToken", cookieTokenAuth, authCtrl.tokenAuth);

// users rest
router.put("/api/updateUser/:id", usersCtrl.updateUser);
router.delete("/api/deleteUser/:id", usersCtrl.deleteUser);
router.get("/api/getUsers", usersCtrl.getAllUsers);
router.put("/api/updateUserPermission/:id", usersCtrl.updateUserPermissions);

// news rest
router.get("/api/getNews", newsCtrl.getNews);
router.post("/api/newNews", cookieTokenAuth, newsCtrl.newNews);
router.put("/api/updateNews/:id", newsCtrl.updateNews);
router.delete("/api/deleteNews/:id", newsCtrl.deleteNews);

// files

router.use(bodyParser.json());
router.post("/api/saveUserImage/:id", upload.any(), filesCtrl.saveUserImage);

router.get("*", sendSPA.get);

module.exports = router;
