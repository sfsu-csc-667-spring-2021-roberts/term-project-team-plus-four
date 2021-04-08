var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Signup" });
});

/* GET signin page. */
router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "Signin" });
});

module.exports = router;
