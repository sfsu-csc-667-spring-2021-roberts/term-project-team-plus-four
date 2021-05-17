/**
 * File: lobby.js
 * Location: This js file is included as a script within /views/lobby.pug
 * Purpose: Anything that has to do with Game Play DOM manipulation (for dynamic like rendering)
 * and communication with DB is done here
 */

//===== Chat =======\\
const socket = io();
socket.emit("chatter", "USERNAME has joined the lobby");

//Grabs the form
$("form").submit(function () {
  const name = $("#name").val();
  const message = $("#message").val();
  socket.emit("chatter", `${name} : ${message}`);
  $("#message").val("");
  return false;
});

//show the message
socket.on("chatter", function (message) {
  $("#chat-messages").append($("<li>").text(message));
});

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
  let chars = "0123456789";
  let codeLength = 5;
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

/*========================== [Event Listeners] ==========================*/

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
 * Purpose: Adds an event listener to every public game card that is created
 * @param {string} code unique code from the container
 */
const publicGamesListener = (code) => {
  document.getElementById(code).addEventListener("click", (e) => {
    chosenPublicGameCode = code;
    console.log("[DEBUG] public game chosen: " + chosenPublicGameCode);
  });
};

//======== Use to Post to any route/path so we can update the DB data here like the code =========\\
function createGame(path, params, method = "POST") {
  const form = document.createElement("form");
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }
  }
  document.body.appendChild(form);
  form.submit();
}

function testing() {
  console.log("What are you doing here?");
}

//========= Creating Public Game =========\\
document.getElementById("public-create-btn").addEventListener("click", (e) => {
  let code = uniqueGameCode();
  publicGameCard(code, 0); //create public game with initial value of zero joined players
  createGame("/lobby", { key: `${code}`, isHost: true });
  testing();
});

//TODO: Grab the public games from the DB and make public game cards from them
// below code is currently temporary to showcase the cards being made
