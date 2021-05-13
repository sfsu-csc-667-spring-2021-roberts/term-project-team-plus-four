/**
 * File: resume-game.js
 * Location: This js file is included as a script within /views/resume-game.pug
 * Purpose: Loads all user current games with their delete button.
 * Also handles the deletion of the game if the user wishes to delete a game
 *
 */

// TODO: grab all the user's games from db
let userGames = [
  { id: 0, code: "0000000000", numPlayers: "4", date: "Feburary 02, 2021" },
  { id: 1, code: "1111111111", numPlayers: "5", date: "Feburary 02, 2021" },
  { id: 2, code: "2222222222", numPlayers: "3", date: "Feburary 02, 2021" },
  { id: 3, code: "3333333333", numPlayers: "10", date: "Feburary 02, 2021" },
  { id: 4, code: "4444444444", numPlayers: "8", date: "Feburary 02, 2021" },
];

/*========================== [Helper Functions] ==========================*/

/**
 * Purpose: Deletes game from UI and DB
 *
 * @param code the unique code of the game that needs to be deleted
 */
const deleteGame = (code) => {
  // removes game from UI
  document.getElementById(`active-${code}`).remove();

  // TODO: remove game from DB
};

/**
 * Purpose: sends player to game page
 *
 * @param code the unique code of the game that needs to be opened
 */
const openGame = (code) => {
  window.location.href = `/game/${code}`;
};

/*========================== [DOM Manipulation] ==========================*/
/**
 * Purpose: Adds game to resume game page UI
 *
 * @param code unique code of game which needs to be added to UI
 * @param num number of players for the open game passed
 * @param date the date in which the game began
 */

const game = (code, num, date) => {
  // Container
  let game = document.createElement("div");
  game.className = "active-game";
  game.id = `active-${code}`;
  // Game info container
  let gameInfo = document.createElement("div");
  gameInfo.className = "game-info";
  // Delete button container

  // Game button to take player to game
  let gameInfoBtn = document.createElement("button");
  gameInfoBtn.className = "btn btn-light grey-btn open-game-btn";
  gameInfoBtn.id = `${code}`;
  // Game's code
  let gameCode = document.createElement("p");
  gameCode.className = "game-code";
  gameCode.appendChild(document.createTextNode(code));
  // Game's number of players
  let gamePlayers = document.createElement("p");
  gamePlayers.className = "num-players";
  gamePlayers.appendChild(document.createTextNode(`${num}-Players`));
  // Game's date
  let gameDate = document.createElement("p");
  gameDate.className = "date";
  gameDate.appendChild(document.createTextNode(date));

  // Delete game button
  let gameRight = document.createElement("div");
  gameRight.className = "right";
  let gameRightBtn = document.createElement("button");
  gameRightBtn.className = "btn btn-light grey-btn delete-game-btn";
  gameRightBtn.id = `${code}`;
  let gameRightBtnImg = document.createElement("img");
  gameRightBtnImg.src = "../content/svg/trash.svg";

  // Appends all childs to their needed location
  gameInfoBtn.appendChild(gameCode);
  gameInfoBtn.appendChild(gamePlayers);
  gameInfoBtn.appendChild(gameDate);

  gameRightBtn.appendChild(gameRightBtnImg);
  gameRight.appendChild(gameRightBtn);

  gameInfo.appendChild(gameInfoBtn);

  game.appendChild(gameInfo);
  game.appendChild(gameRight);

  document.querySelector(".resume-game-flex-box").appendChild(game);
};

/**
 * Purpose: Paints all active games store in the DB to UI
 */
for (let i = 0; i < userGames.length; i++) {
  game(userGames[i].code, userGames[i].numPlayers, userGames[i].date);
}

/*========================== [Event Listeners] ==========================*/
/**
 * Purpose: Waits on user to click "Delete" button
 */
let gamesDeleteBtn = document.getElementsByClassName("delete-game-btn");
Array.from(gamesDeleteBtn).forEach((game) => {
  game.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("[DEBUG] Delete active game: " + game.id);
    deleteGame(game.id);
  });
});

/**
 * Purpose: Waits on user to click "Game Info" button
 */
let gamesOpenBtn = document.getElementsByClassName("open-game-btn");
Array.from(gamesOpenBtn).forEach((game) => {
  game.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("[DEBUG] Open active game: " + game.id);
    openGame(game.id);
  });
});
