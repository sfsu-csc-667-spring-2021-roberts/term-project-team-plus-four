/**
 * File: join-game.js
 * Location: This js file is included as a script within layout.pug
 * Purpose: Allows logged in user to enter a new game with a unique code.
 * Checks to see if game has open availability, if not game full message is prompted
 *
 */

let code;

/*========================== [Event Listeners] ==========================*/
/**
 * Purpose: Updates unique code variable every time user changes input
 */
document.getElementById("code").addEventListener("change", (e) => {
  code = e.target.value.toUpperCase();
  console.log("[DEBUG] code: " + code);
});

document.getElementById("join-game-btn").addEventListener("click", (e) => {
  validInput(); //validates entry and sends user to game if game slots open
});
/*==========================  [Helper Fucntions]  ==========================*/
/**
 * Purpose: Checks to see if the input is of length 7 || not empty
 */
const validInput = () => {
  if (code === undefined || code.length !== 7) {
    alert("[Error] Game Code must be seven characters long");
  } else {
    if (openSlots()) {
      // TODO: add game to users open games

      // send user to game
      window.location.href = `/game/${code}`;
    } else alert("Sorry game is now full");
  }
};

/**
 * Purpose: Checks to see if the game is in DB && open slots available
 */
const openSlots = () => {
  // TODO: grab game from open games DB
  let game = { id: 0, code: "1234567", players: 9 };

  console.log(game.players);
  if (game.players < 10 && game.code == code) return true;
  return false;
};
