/**
 * Holds functions for database calls
 */
 var db = require("./index.js");

const findById = (id) => {
    return db.one('SELECT id, email, firstname, lastname FROM users_ver2 WHERE id=$1',
     [id]);
}

const getIdByEmail = (email) => {
    return db.one('SELECT id FROM user_ver2 WHERE email=$1',
     [email]);
}

const getFirstNameByID = (id) => {
    return db.one('SELECT firstname FROM user_ver2 WHERE id=$1',
     [id]);
}

const getUserName = (firstname) => {
    return db.one('SELECT firstname FROM users_ver2 WHERE firstname=$1',
     [firstname]);
}

const findEmail = (email) => {
    return db.one('SELECT * FROM users_ver2 WHERE email=$1', [email]);
}

const addUser = (email, password, firstname, lastname) =>{
    return db.one('INSERT INTO users_ver2 (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING id, email, firstname, lastname',
     [email, password, firstname, lastname]);    
}


//Create new game in db
const createNewGame = (name, userId, isHost) => {
    db
        .one('INSERT INTO games (user_id, game_id, isHost, currentPlayer_id');
}

//Join game
const joinGame = (game_id) =>{
    db.one(/*get the specific room number if available..*/);
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

}

//Add user and game to games_users
const addUserToGame = (gameId, userId) => {

}

const testing = (message) => {console.log(message)}

module.exports = {findById, addUser, getUserName, findEmail, testing};