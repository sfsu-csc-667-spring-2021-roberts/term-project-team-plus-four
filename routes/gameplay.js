/**
 * Calls to db middleware for game information
 * Stores functions for gameplay 
 */

var express = require('express');
var db = require("../db"); //needs to be removed
const socketapi = require('../backend/socketapi');

//Testing function
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

//Play a card onto the pile
const placeCard = () => {
  
}

//Draw a card from the deck and add it to your hand
const drawCard = () => {
  
}

//Shuffle the deck
const shuffleTheDeck = () => {

}

//Select the card
const selectACard = () => {

}

//Send message in game chat
const sendMessageInGame = () => {
  
}

module.exports.addCard = addCard;
module.exports.test = test;