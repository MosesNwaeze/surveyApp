const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { user, admin } = require("../routes/loginModule");
const signupModule = require("../routes/signupModule");
require("../models/connection");

router.post(
  "/users",
  [
    check("email").isEmail().normalizeEmail(),
    check("phoneNumber").isNumeric().escape(),
    check("firstName").isLength({ min: 3 }).trim().escape(),
    check("lastName").isLength({ min: 3 }).trim().escape(),
    check("address").isAlphanumeric().trim().escape(),
    check("password").isLength({ min: 8 }).isAlphanumeric().trim(),
  ],
  function (req, res, next) {
    const { email } = req.body;
    const domainName = email.slice(-15);
    if (domainName === "femossurvey.com") {
      signupModule.admin(req, res, next);
    } else {
      signupModule.user(req, res, next);
    }
  }
);

router.post(
  "/users-login",
  [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 8 }).isAlphanumeric().trim(),
  ],
  function (req, res, next) {
    const { email } = req.body;
    const domainName = email.slice(-15);
    if (domainName === "femossurvey.com") {
      admin(req, res, next);
    } else {
      user(req, res, next);
    }
  }
);

router.get("/users", function (req, res, next) {
  const title = `Welcome - you can start using the app by creating an account `;
  res.render("reg-form", { title });
});

router.get("/users-login", function (req, res, next) {
  res.render("login", { title: "Users Authentication Page" });
});

module.exports = router;
