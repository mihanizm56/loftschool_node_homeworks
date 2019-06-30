const express = require("express");
const passport = require("passport");
const adminCtrl = require("../controllers/admin");
const loginCtrl = require("../controllers/login");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/login", loginCtrl.get);
router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/admin",
    failureRedirect: "/login"
  })
);
router.get("/admin", isAuthenticated, adminCtrl.get);

/* Handle Registration POST */
router.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "/admin",
    failureRedirect: "/login"
  })
);

module.exports = router;
