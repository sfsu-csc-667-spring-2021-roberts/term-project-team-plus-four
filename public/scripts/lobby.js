/**
 * File: lobby.js
 * Location: This js file is included as a script within /views/lobby.pug
 * Purpose: Anything that has to do with Game Play DOM manipulation (for dynamic like rendering)
 * and communication with DB is done here
 *
 */

let chosenPublicGameCode; // game player chooses to join
let publicGames; // amount of public games
// TODO: Fill players object with players in current game
let privatePlayers = [
  {
    id: 0,
    name: "Bob Lee",
    cards: [],
  },
  {
    id: 1,
    name: "Smith Brown",
    cards: [],
  },
  {
    id: 2,
    name: "Candice Lopez",
    cards: [],
  },
  {
    id: 3,
    name: "Cindy Loo",
    cards: [],
  },
];

/*==========================  [Helper Fucntions]  ==========================*/

/**
 * Purpose: Generates a random 10 digit game code
 *
 * @return the unique code
 */
const uniqueGameCode = () => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let codeLength = 10;
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    var num = Math.floor(Math.random() * chars.length);
    code += chars.substring(num, num + 1);
  }
  // TODO: Check with public games if this code is in use
  // if (code in DB)
  //     return uniqueGameCode();
  return code;
};

/**
 * Purpose: Checks to see if the public game is still avaiable for the user to enter
 * @returns boolean if game avaiable to enter or not
 */
const gameAvailable = () => {
  return true;
};

/*==========================  [DOM Manipulation]  ==========================*/
/**
 * Purpose: Creates a private code of 10 digits onto the UI
 */
const showPrivateCode = () => {
  let codeText = document.createElement("p");
  let codeInput = document.createElement("input");
  let codeBtn = document.createElement("button");
  let codeBtnImg = document.createElement("img");

  codeInput.id = "private-code";
  codeInput.type = "text";
  codeInput.disabled = true;

  codeInput.value = uniqueGameCode();
  codeBtn.className = "uno-btn";
  codeBtn.id = "copy-btn";
  codeBtnImg.src = "../content/svg/clipboard.svg";

  codeText.appendChild(document.createTextNode("Code:"));
  codeBtn.appendChild(codeBtnImg);

  document.querySelector(".code").appendChild(codeText);
  document.querySelector(".code").appendChild(codeInput);
  document.querySelector(".code").appendChild(codeBtn);

  // adds event listener for copy code button
  copyCodeListener();
};

/**
 * Purpose: creates a public game info card onto the UI
 *
 */
const publicGameCard = (gameCode, gamePlayers) => {
  let container = document.createElement("div");
  let button = document.createElement("button");
  let code = document.createElement("p");
  let numPlayers = document.createElement("p");

  container.className = "game-info";
  container.id = gameCode;
  button.className = "btn btn-light grey-btn";
  code.className = "game-code";
  numPlayers.className = "num-players";

  code.appendChild(document.createTextNode(`Code: ${gameCode}`));
  numPlayers.appendChild(document.createTextNode(`${gamePlayers}/10 Players`));

  button.appendChild(code);
  button.appendChild(numPlayers);
  container.appendChild(button);

  document.getElementById("all-public-games").appendChild(container);

  // adds event Listener to container
  publicGamesListener(gameCode);
};

/**
 * Purpose: creates a private game individual onto the UI
 */
const privatePlayer = (player) => {
  let container = document.createElement("li");
  let name = document.createElement("span");

  name.appendChild(document.createTextNode(player));
  container.appendChild(name);

  document.getElementById("private-players").appendChild(container);
};

/*========================== [Event Listeners] ==========================*/
/**
 * Purpose: Waits on user to click on "Generate Private Code" button
 */
document.getElementById("generate-code").addEventListener("click", (e) => {
  e.preventDefault();
  // Removes "Click To Generate Private Code" text
  document.getElementById("generate-code-p").remove();
  // Removes #generate-code id from code div
  document.querySelector(".code").removeAttribute("id");

  // Adds private code and copy button
  if (document.getElementById("generate-code-p") !== undefined)
    showPrivateCode();
});

const copyCodeListener = () => {
  document.getElementById("copy-btn").addEventListener("click", (e) => {
    // copies generated code and produces an alert
    var code = document.getElementById("private-code");

    // Selects the text field
    code.select();
    code.setSelectionRange(0, 99999); // for mobile devices

    // Copy the text inside the text field
    document.execCommand("copy");

    alert("Copied Private Game Code: " + code.value);
  });
};

/**
 * Purpose: waits for user to click on lobby button
 */
document.getElementById("public-game-btn").addEventListener("click", (e) => {
  // TODO: check that the public game is not full or hasnt been started
  if (chosenPublicGameCode == null && gameAvailable())
    alert("Please select a public game to enter");
  else window.location.href = `/game/${chosenPublicGameCode}`;
});

/**
 * Purpose: waits for user to click on start private button
 */
document.getElementById("private-game-btn").addEventListener("click", (e) => {
  let code = document.getElementById("private-code");
  if (code == null) alert('Click on "Generate Private Code" button first');
  else window.location.href = `/game/${code.value}`;
});

/**
 * Purpose: Adds an event listener to every public game card that is created
 * @param {string} code unique code from the container
 */
const publicGamesListener = (code) => {
  document.getElementById(code).addEventListener("click", (e) => {
    chosenPublicGameCode = code;
    console.log("[DEBUG] public game chosen: " + chosenPublicGameCode);
  });
};

// TODO: Socket for people entering the private game?
for (let i = 0; i < privatePlayers.length; i++) {
  privatePlayer(privatePlayers[i].name);
}

//TODO: Grab the public games from the DB and make public game cards from them
// below code is currently temporary to showcase the cards being made
for (let i = 0; i < 10; i++) {
  publicGameCard(uniqueGameCode(), i);
}
