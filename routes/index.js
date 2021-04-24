var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Classic Uno" });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Signup | Classic Uno" });
});

/* GET signin page. */
router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "Signin | Classic Uno" });
});

/* GET dashboard page. */
router.get("/dashboard", function (req, res, next) {
  res.render("dashboard", { title: "Dashboard | Classic Uno" });
});

/* GET new game (lobby) page. */
router.get("/lobby", function (req, res, next) {
  res.render("lobby", { title: "Lobby | Classic Uno" });
});

/* GET resume game page. */
router.get("/resume-game", function (req, res, next) {
  res.render("resume-game", { title: "Resume Game | Classic Uno" });
});

/* GET join game page. */
router.get("/join-game", function (req, res, next) {
  res.render("join-game", { title: "Join Game | Classic Uno" });
});

/* GET game page. */
router.get("/game", function (req, res, next) {
  res.render("game", { title: "Game | Classic Uno" });
});

module.exports = router;
