/**
 * Calls to db middleware for game information
 * Stores functions for gameplay 
 */

var express = require('express');
var db = require("../db");
const socketapi = require('../backend/socketapi');


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

//Gameplay functions

const placeCard = () => {
  
}

const drawCard = () => {
  
}

const cardPlayed = () => {

}



module.exports.addCard = addCard;
module.exports.test = test;