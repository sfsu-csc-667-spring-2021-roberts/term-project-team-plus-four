const express = require("express");
const router = express.Router();

// render PUG template for game
router.get("/:id", isAuthenticated, (req, res, next) => {
  res.render("game", { title: "Game | Classic Uno", id: req.params.id });
});


function isAuthenticated(req, res, next) {

  if (req.isAuthenticated())
    return next();

  res.redirect('/signin');
}

module.exports = router;
