var db = require("./index.js");

//===== users_ver2 =====\
const findById = (id) => {
    return db.one('SELECT id, email, firstname, lastname FROM users_ver2 WHERE id=$1',
     [id]);
}

const getIdByEmail = (email) => {
    db.one('SELECT id FROM users_ver2 WHERE email=$1', [email])
    .then(rows => {
        console.log(rows)
    })
    .catch(error => {
        console.log(error)
    })
}

const findByEmail = (email) => {
    return db.one('SELECT * FROM users_ver2 WHERE email=$1', [email]);
}

const addUser = (email, password, firstname, lastname) =>{
    return db.one('INSERT INTO users_ver2 (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING id, email, firstname, lastname',
     [email, password, firstname, lastname]);    
}


//===== games ======\\
const createNewGame = () => {
    alert("Adding to Database");
    // db
    //     .one('INSERT INTO games (user_id, game_id, isHost, currentPlayer_id');
}


const joinGame = (game_id) =>{
    db.one(/*get the specific room number if available..*/);
}


const getGame = (gameCode) => {
    return db.one('SELECT id FROM games WHERE id=$1', [gameCode]);
}


const getAllGames = () => {
  return db.one('SELECT * FROM games');
}

//Delete a game
const deleteGame = (gameCode) => {

}

//Add user and game to games_users
const addUserToGame = (gameId, userId) => {

}

module.exports = {findById, addUser, findByEmail, getIdByEmail, createNewGame};