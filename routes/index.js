const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../passport/passport-config");
const dbFunctions = require('../db/dbBackend');

var users = [];

/* Passport-Local */
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Classic Uno" });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Signup | Classic Uno" });
});

/* POST signup page. */
router.post("/signup", async function (req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 1);

    dbFunctions.addUser(req.body.email, hashedPassword, req.body.firstname, req.body.lastname);

    console.log("User added to DB");
    users.push({
      id: Date.now().toString(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/signin");
  } catch {
    res.redirect("/signup");
  }
  console.log(users);
});

/* GET signin page. JF*/
router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "Signin | Classic Uno" });
});

/**  POST Sign in, Authenticated using passport JF**/
router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin",
    failureFlash: true, //show message
  })
);

/* GET dashboard page. */
router.get("/dashboard", /*isAuthenticated,*/ function (req, res, next) {
  res.render("dashboard", { title: "Dashboard | Classic Uno" });
});

/* GET new game (lobby) page. */
router.get("/lobby", /*isAuthenticated,,*/ function (req, res, next) {
  res.render("lobby", { title: "Lobby | Classic Uno" });
});

/* GET resume game page. */
router.get("/resume-game", /*isAuthenticated,,*/ function (req, res, next) {
  res.render("resume-game", { title: "Resume Game | Classic Uno" });
});

/* GET join game page. */
router.get("/join-game", /*isAuthenticated,,*/ function (req, res, next) {
  res.render("join-game", { title: "Join Game | Classic Uno" });
});


function isAuthenticated(req, res, next) {

  if (req.isAuthenticated())
    return next();

  res.redirect('/signin');
}

module.exports = router;
