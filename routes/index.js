const express = require("express");
const router = express.Router();
const sendSPA = require("../controllers/app");
const authCtrl = require("../controllers/auth");
const passport = require("passport");
const auth = passport.authenticate("jwt", { session: false });

router.get("*", sendSPA.get);

router.post("/api/saveNewUser", auth, authCtrl.createUser);
router.post("/api/login", authCtrl.loginUser);

module.exports = router;
