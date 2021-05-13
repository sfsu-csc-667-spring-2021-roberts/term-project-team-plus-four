// grabs card names from "/content/svg/deck" and place them into deck object

let deck = [
  // [TODO] read all files within /svg/deck and place it in a string array
  "blue-00.svg",
  "blue-01.svg",
  "blue-02.svg",
  "blue-03.svg",
  "blue-04.svg",
  "blue-05.svg",
  "blue-06.svg",
  "blue-07.svg",
  "blue-08.svg",
  "blue-09.svg",
  "blue-draw2.svg",
  "blue-reverse.svg",
  "blue-skip.svg",

  "green-00.svg",
  "green-01.svg",
  "green-02.svg",
  "green-03.svg",
  "green-04.svg",
  "green-05.svg",
  "green-06.svg",
  "green-07.svg",
  "green-08.svg",
  "green-09.svg",
  "green-draw2.svg",
  "green-reverse.svg",
  "green-skip.svg",

  "red-00.svg",
  "red-01.svg",
  "red-02.svg",
  "red-03.svg",
  "red-04.svg",
  "red-05.svg",
  "red-06.svg",
  "red-07.svg",
  "red-08.svg",
  "red-09.svg",
  "red-draw2.svg",
  "red-reverse.svg",
  "red-skip.svg",

  "yellow-00.svg",
  "yellow-01.svg",
  "yellow-02.svg",
  "yellow-03.svg",
  "yellow-04.svg",
  "yellow-05.svg",
  "yellow-06.svg",
  "yellow-07.svg",
  "yellow-08.svg",
  "yellow-09.svg",
  "yellow-draw2.svg",
  "yellow-reverse.svg",
  "yellow-skip.svg",

  "wild-draw4.svg",
  "wild-wild.svg",
];

//Get list of users from game with matching id
//Need to track who is the user, related to login
let players = [
  {
    id: 0, // [TODO] user id from db
    name: "Bob Lee", // [TODO] user name from db
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


let grabDeck = ["blue-00.svg", "blue-01.svg", "blue-03.svg", "blue-04.svg"];
let selectedCard = null; // card user chooses to play
let activeUser = null; // user who start the game
let topPlacedCard = { color: null, number: null };

// add code from URL to UI
let gameCode = window.location.toString().split("game/")[1];
let codeStr = document.createElement("p");
codeStr.appendChild(document.createTextNode(`Game Code: ${gameCode}`));
document.querySelector(".header-game").appendChild(codeStr);

// creates opponent element and adds it to the UI
const opponentElement = (id, name, totalCards) => {
  let opponent = document.createElement("div");
  let opponentImg = document.createElement("img");
  let opponentInfo = document.createElement("div");
  let opponentName = document.createElement("h6");
  let opponentCards = document.createElement("p");

  opponent.className = "opponent";
  opponent.id = `opponent-${id}`;
  opponentImg.src = "../content/svg/opponent-cards.svg";
  opponentInfo.className = "opponent-info";

  opponentName.appendChild(document.createTextNode(name));
  opponentCards.appendChild(document.createTextNode(`Cards: ${totalCards}`));

  opponentInfo.appendChild(opponentName);
  opponentInfo.appendChild(opponentCards);

  opponent.appendChild(opponentImg);
  opponent.appendChild(opponentInfo);

  document.querySelector(".middle-game").appendChild(opponent);
};

// Adds card to user's pile
document.querySelector("#grabCard").addEventListener("click", (e) => {
  e.preventDefault();
  // Client-Side (Show card to user)
  console.log("[DEBUG] Card Added");

  // Server-Side (Add card to DB)

  // Move onto the next user's turn
});

// waiting on user to click "Start Game" button
document.getElementById("game-start-btn").addEventListener("click", (e) => {
  e.preventDefault;
  startGame();
});

// Play selected card onto the pile
document.querySelector("#placeCard").addEventListener("click", (e) => {
  // Client-Side (Remove card from pile)
  if (selectedCard === null)
    return alert("Please select a card from your pile or grab a card");
  let newDeck = players[0].cards.filter((card) => card !== selectedCard);
  players[0].cards = newDeck;

  console.log("[DEBUG] Card Placed: " + players[0].cards);

  // validates if the selected card can be placed
  if (validCard(selectedCard) || topPlacedCard.color === null) {
    // removes card from UI & Updates the Place Cards
    placeCard(selectedCard);
  } else
    return alert(
      `Invalid Card: Card must be ${topPlacedCard.color} or be a ${topPlacedCard.number}`
    );

  // Server-Side (Add Card to DB)

  // Move onto the next user's turn
  waitTurn(true);
});

const startGame = () => {
  // shuffle the deck
  let myCards = document.querySelector(".my-cards");
  let card;
  let tmpValue;
  let random;
  let num = 7;

  for (let i = 0; i < deck.length; i++) {
    random = Math.floor(Math.random() * i);

    tmpValue = deck[i];
    deck[i] = deck[random];
    deck[random] = tmpValue;
  }

  console.log("[DEBUG] shuffled deck: " + players.length);

  // assign cards
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < num; j++) {
      players[i].cards.push(deck.pop());
    }
  }

  // add opponent elements to UI
  for (let i = 1; i < players.length; i++) {
    opponentElement(players[i].id, players[i].name, players[i].cards.length);
  }

  // add user cards to the UI
  for (let i = 0; i < num; i++) {
    card = document.createElement("img");
    card.className = "cards";
    card.id = players[0].cards[i];
    card.src = `../content/svg/deck/${players[0].cards[i]}`;
    myCards.appendChild(card);
  }

  // Updates selected card
  let cards = document.getElementsByClassName("cards");
  Array.from(cards).forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(card.id);
      console.log("[DEBUG] Selected Card: " + e.target.id);
      selectedCard = e.target.id;
    });
  });

  // assign active user
  activeUser = players[0].id;
  // removes overlay and modal
  document.getElementById("game-start").remove();
  document.getElementById("game-start-modal").remove();
};

const validCard = (selectedCard) => {
  // grab top card from Placed Deck
  let split = selectedCard.split("-");
  if (
    split[0] === "wild" ||
    split[0] === topPlacedCard.color ||
    split[1].slice(0, split[1].length - 4) === topPlacedCard.number
  )
    return true;
  return false;
};

const placeCard = (selectedCard) => {
  let colorSelected = null;
  let split;

  // makes user choose new color
  if (selectedCard.includes("wild")) {
    do {
      colorSelected = prompt("Choose new color (blue, green, blue, yellow): ");
    } while (
      colorSelected.toLowerCase() != "blue" &&
      colorSelected.toLowerCase() != "green" &&
      colorSelected.toLowerCase() != "red" &&
      colorSelected.toLowerCase() != "yellow"
    );
  }

  // removes card from UI
  document.getElementById(selectedCard).remove();

  // updates place deck to show the new card on top
  document.getElementById(
    "placedDeck"
  ).src = `../content/svg/deck/${selectedCard}`;

  // updates topPlacedCard
  split = selectedCard.split("-");
  topPlacedCard.color = colorSelected !== null ? colorSelected : split[0];
  topPlacedCard.number = split[1].slice(0, split[1].length - 4);

  //reset
  selectedCard = null;
};

// if its not the user's turn, show waiting screen
const waitTurn = (wait) => {
  // create modal message
  let msg = document.createElement("div");
  let msgHeader = document.createElement("h5");
  let msgBody = document.createElement("p");
  msg.className = "waiting-modal";
  msgHeader.appendChild(
    document.createTextNode(`It's now ${players[1].name}'s turn`)
  );
  msgBody.appendChild(
    document.createTextNode("In the meantime, feel free to chat....")
  );
  msg.appendChild(msgHeader);
  msg.appendChild(msgBody);

  if (wait) {
    document.getElementById("active").id = "overlay-on";
    document.getElementById("overlay-on").appendChild(msg);
    // highlight the user who's turn it is
    document.querySelector(`#opponent-${players[1].id} .opponent-info`).id =
      "highlight-user";
  } else {
    document.getElementById("overlay-on").id = "active";
    document.getElementById("active").remove(msg);
    // remove highlighting attriute
    document
      .getElementById(`opponent-${players[1].id}`)
      .removeAttribute("highlight-user");
  }
};

/* shuffles the deck 
  if deck empty:
    grab them from the used card array,
  else:
    no card can be issued

*/

// add the card to the user's hand
