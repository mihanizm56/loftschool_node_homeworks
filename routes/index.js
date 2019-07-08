const express = require("express");
const router = express.Router();
const sendSPA = require("../controllers/app");
const authCtrl = require("../controllers/auth");
const passport = require("passport");
const tokenAuthMiddleware = passport.authenticate("jwt", { session: false });

router.get("*", sendSPA.get);

router.post("/api/saveNewUser", authCtrl.createUser);
router.post("/api/login", authCtrl.loginUser);
router.post("/api/authFromToken", tokenAuthMiddleware, authCtrl.tokenAuth);
router.put("/api/updateUser/:id", authCtrl.updateUser);
router.delete("/api/deleteUser/:id", authCtrl.deleteUser);

module.exports = router;
