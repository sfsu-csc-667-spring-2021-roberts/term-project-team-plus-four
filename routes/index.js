var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');
const passport = require("passport");
const initializePassport = require("../passport/passport-config");


var users = []

/* Passport-Local */
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Uno Game | Signup" });
});

/* POST signup page. */
router.post("/signup", async function (req, res, next){
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 1)
    users.push({
      id: Date.now().toString(), //take this line out when connected with database
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect("/signin")
  } catch {
    res.redirect("/signup")
  }
  console.log(users)
});

/* GET signin page. JF*/ 
router.get("/signin", function (req, res, next) {
  res.render("signin", { 
    title: "Uno Game | Signin", 
    message: req.flash('error') });
});

/**  POST Sign in, Authenticated using passport JF**/
router.post("/signin", passport.authenticate("local", {
  successRedirect: '/lobbies',
  failureRedirect: '/signin',
  failureFlash: true, //show message
}))

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
