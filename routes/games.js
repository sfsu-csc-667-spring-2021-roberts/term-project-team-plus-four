var express = require('express');
var router = express.Router();
var db = require("../db");

/* GET game page. */
router.get('/', function(req, res, next) {
  res.render('game', { title: 'Game' });
  
});

function addCard() {
  db.any(
    `INSERT INTO cards (color, value) VALUES ('Red', '1')`
  )
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
}



module.exports = router;