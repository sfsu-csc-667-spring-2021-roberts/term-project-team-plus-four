const express = require("express");
const router = express.Router();

// render PUG template for game
router.get("/:id", (req, res, next) => {
  res.render("game", { title: "Game | Classic Uno", id: req.params.id });
});

module.exports = router;
