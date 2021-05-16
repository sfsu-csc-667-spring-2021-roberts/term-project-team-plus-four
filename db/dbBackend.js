/**
 * Holds functions for database calls
 *
 */
var express = require('express');
var db = require("./index.js");


const findById = (id) => {
    return db.one('SELECT id, email, firstname, lastname FROM users_ver2 WHERE id=$1', [id]);
}

const getUser = (firstname) => {
    return db.one('SELECT firstname FROM users_ver2 WHERE firstname=$1', [firstname]);
}

const findEmail = (email) => {
    return db.one('SELECT * FROM users_ver2 WHERE email=$1', [email]);
}

//Function add user to db
const addUser = (email, password, firstname, lastname) => {
    return db.any('INSERT INTO users_ver2 ("email", "password", "firstname", "lastname") VALUES ($1, $2, $3, $4)', [email, password, firstname, lastname]);
}

//Removes user from db
const deleteUser = (username) => {

}

//Create new game in db
const createNewGame = (gameCode) => {
    db.any('INSERT INTO games ("id") VALUES ($1)', [gameCode]);
}

//Get game
const getGame = (gameCode) => {
    return db.one('SELECT id FROM games WHERE id=$1', [gameCode]);
}

//Get list of games
const getAllGames = () => {
    return db.one('SELECT * FROM games');
}

//Delete a game
const deleteGame = (gameCode) => {
    db.one('DELETE FROM games WHERE id=$1', [gameCode]);
}

//Add user and game to games_users
const addUserToGame = (gameId, userId) => {
    db.any('INSERT INTO games_users ("user_id, game_id") VALUES ($1, $2)', [userId, gameId]);
}

module.exports = { findById, addUser, getUser, findEmail, createNewGame };