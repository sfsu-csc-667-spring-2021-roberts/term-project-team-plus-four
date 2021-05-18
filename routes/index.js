const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../passport/passport-config");
const dbFunctions = require('../db/dbBackend');

var users = [];

//====== Passport-Local ======\\
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

//===== GET home page.=====\\
router.get("/", function (req, res, next) {
  res.render("index", { title: "Classic Uno" });
});

//===== GET signup page.=====\\
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Signup | Classic Uno" });
});


//==== Promise ====\\
// const load = new Promise((resolve, reject) => {
//   setTimeout(()=>{
//     resolve('foo');
//   }, 300);
// })

//========== POST signup page. ==========\\
router.post("/signup", async function (req, res, next) {
  try {
    const {email, firstname, lastname } = req.body;
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

    res.redirect(`/signin`);
  } catch {
    res.redirect("/signup");
  }
  console.log(users);
});

//====== GET signin page.======\\
router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "Signin | Classic Uno" });
});

//======POST Sign in, Authenticated using passport JF turned off for now.==\\
router.post("/signin", function (req, res, next) {
  const userId = backend.getIdByEmail(req.body.email)
  console.log('my obj', userId);

  if(userId === null) res.redirect(`/signin`);
  else res.redirect(`/dashboard/${userId}`);
  // next()
  },
  // passport.authenticate("local", {
  //   successRedirect: "/dashboard",
  //   failureRedirect: "/signin",
  //   failureFlash: true, //show message
  // }),
  
);


/* GET dashboard page. */
router.get("/dashboard", isAuthenticated, function (req, res, next) {
  res.render("dashboard", { title: "Dashboard | Classic Uno" });
});

/* GET new game (lobby) page. */
router.get("/lobby", isAuthenticated, function (req, res, next) {
  res.render("lobby", { title: "Lobby | Classic Uno" });
});

//===== GET dashboard page. =====\\
router.get("/dashboard/:id", function (req, res, next) {

  console.log(req.params.testing);
  res.render("dashboard", { title: "Dashboard | Classic Uno" });

});

//====== GET new game (lobby) page. =======\\
router.get("/lobby", function (req, res, next) {
  res.render("lobby", { title: "Lobby | Classic Uno"});

});

//=========== Post used for creating public game ===========\
router.post("/lobby", function (req,res,next) {
  const code = req.body.key;
  const host = req.body.isHost;
  backend.createNewGame(code);
  console.log(code);
  console.log(host);
})


router.get("/resume-game", isAuthenticated, function (req, res, next) {
  res.render("resume-game", { title: "Resume Game | Classic Uno" });
});

// /* GET join game page. */
// router.get("/join-game", isAuthenticated, function (req, res, next) {
//   res.render("join-game", { title: "Join Game | Classic Uno" });
// });

// function isAuthenticated(req, res, next) {
function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated())
//     return next();
    return next();
//   res.redirect('/signin');
// }
}


module.exports = router;