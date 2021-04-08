var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Uno Game | Signup" });
});

/* GET signin page. */
router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "Uno Game | Signin" });
});

/* GET dashboard page. */
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard", { title: "Uno Game | Dashboard" });
});

/* GET new game (lobby) page. */
router.get("/lobby", function (req, res, next) {
  res.render("lobby", { title: "Uno Game | Lobby" });
});

/* GET resume game page. */
router.get("/resume-game", function (req, res, next) {
  res.render("resume-game", { title: "Uno Game | Resume Game" });
});

/* GET join game page. */
router.get("/join-game", function (req, res, next) {
  res.render("join-game", { title: "Uno Game | Join Game" });
});

/* GET game page. */
router.get("/game", function (req, res, next) {
  res.render("game", { title: "Uno Game" });
});

module.exports = router;
