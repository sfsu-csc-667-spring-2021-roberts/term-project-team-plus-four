var express = require('express');
var router = express.Router();
var db = require("../db");



const addCard = () => {
  //db.any('DELETE FROM cards');
  db.any(
    `INSERT INTO cards (color, value) VALUES ('Red', '1')`
  )
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
}

const test = () => {
  console.log("PLEASE WORK???");
}


module.exports = router;
module.exports.addCard = addCard;
module.exports.test = test;