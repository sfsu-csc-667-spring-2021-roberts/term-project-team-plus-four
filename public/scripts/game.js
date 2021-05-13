/**
 * File: game.js
 * Location: This js file is included as a script within layout.pug
 * Purpose: Anything that has to do with Game Play DOM manipulation (for dynamic like rendering)
 * and communication with DB is done here
 *
 */

// deck is an initial array of stored card names retrieved from /contents/svg/deck
let deck = [
  // Blue Cards
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
  // Green Cards
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
  // Red Cards
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
  // Yellow Cards
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
  // Wild Cards
  "wild-draw4.svg",
  "wild-wild.svg",
];

// TODO: Fill players object with players in current game
let players = [
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

let usedDeck = []; // once a user plays a card, it goes here
let selectedCard = null; // stores the card active user chooses to add to deck
let activeUserIndex = 0;
let activeUser = players[activeUserIndex]; // stores active user
let topPlacedCard = { color: null, number: null }; // top card in the usedeck pile

/*========================== [Event Listeners] ==========================*/
/**
 * Purpose: Waits on user to click "Start Game" button
 */
document.getElementById("game-start-btn").addEventListener("click", (e) => {
  e.preventDefault;
  startGame(); // paints elements and starts game
});

/**
 * Purpose: Waits on user to click "Grab Card" button
 */
document.querySelector("#grabCard").addEventListener("click", (e) => {
  e.preventDefault();
  let newCard = grabNewCard();
  console.log("new card: " + newCard);
  activeUser.cards.push(newCard); // assigns new card to user's deck

  // TODO: Server-Side (update active users deck)

  waitTurn(true); // next user
});

/**
 * Purpose: Waits on user to click "Place Card" button
 *
 * Functionality:
 * #1 Checks if card has been selected
 * #2 Validates the chosen card to play
 * #3 moves onto next player
 */
document.querySelector("#placeCard").addEventListener("click", (e) => {
  // Card selected ?
  if (selectedCard === null)
    return alert("Please select a card from your pile or grab a card");

  // Validates chosen card
  if (validCard(selectedCard) || topPlacedCard.color === null) {
    // removes card from UI
    placeCard(selectedCard);
    // removes card from users deck
    let newDeck = activeUser.cards.filter((card) => card !== selectedCard);
    activeUser.cards = newDeck;
  } else
    return alert(
      `Invalid Card: Card must be ${topPlacedCard.color} or be a ${topPlacedCard.number}`
    );

  // TODO: Server-Side (update active users deck)

  waitTurn(true); // next user
});

/*==========================  [DOM Manipulation]  ==========================*/

/**
 * Purpose: Creates opponent element and adds it to the UI
 *
 * @param {integer} id Opponent's id
 * @param {string} name Opponents name
 * @param {integer} totalCards Opponents total number of cards
 */
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

/*==========================  [Helper Fucntions]  ==========================*/

/**
 * Purpose: Shuffles deck array when called
 */
const shuffleDeck = () => {
  let tmpValue;
  let random;

  for (let i = 0; i < deck.length; i++) {
    random = Math.floor(Math.random() * i);

    tmpValue = deck[i];
    deck[i] = deck[random];
    deck[random] = tmpValue;
  }
};

/**
 * Purpose: Grabs available cards from usedDeck if deck array empty.
 * Then assigns random card to user requesting it.
 *
 * @return {string} deck.pop() last card from the deck
 */
const grabNewCard = () => {
  if (deck.length == 0) {
    deck = usedDeck;
    shuffleDeck();
    usedDeck = [];
  }
  return deck.pop();
};

/**
 * Purpose: Grabs available cards from usedDeck if deck array empty.
 * Then assigns random card to user requesting it.
 *
 * @param {string} card active user selected card which needs validation
 * @return {boolean} true: card cad be placed onto deck, fasle: card cant be placed
 */
const validCard = (card) => {
  // grab top card from Placed Deck
  let split = card.split("-");
  if (
    split[0] === "wild" ||
    split[0] === topPlacedCard.color ||
    split[1].slice(0, split[1].length - 4) === topPlacedCard.number
  )
    return true;
  return false;
};

/**
 * Purpose: Makes user choose new color if card passed is a wild card,
 * then places card onto the UI of used Deck and removes card form active users deck
 *
 * @param {string} card user chosen card which must be removed from th
 */
const placeCard = (card) => {
  let colorSelected = null;
  let split;

  // makes user choose new color
  if (card.includes("wild")) {
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
  document.getElementById(card).remove();

  // updates place deck to show the new card on top
  document.getElementById("placedDeck").src = `../content/svg/deck/${card}`;

  // updates topPlacedCard
  split = card.split("-");
  topPlacedCard.color = colorSelected !== null ? colorSelected : split[0];
  topPlacedCard.number = split[1].slice(0, split[1].length - 4);

  //reset
  selectedCard = null;
};

/**
 * Purpose: Creates an overlay for the user logged in if its not their turn. Otherwise content clickable
 *
 * @param {boolean} wait True: user must have a waiting overlay, False: user is currently active, no overlay
 */
const waitTurn = (wait) => {
  // updates active user
  if (activeUserIndex === activeUser.length - 1) activeUserIndex = 0;
  else activeUserIndex++;
  activeUser = players[activeUserIndex];

  // create modal message
  let msg = document.createElement("div");
  let msgHeader = document.createElement("h5");
  let msgBody = document.createElement("p");
  msg.className = "waiting-modal";
  msgHeader.appendChild(
    document.createTextNode(`It's now ${activeUser.name}'s turn`)
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

/**
 * Purpose: Initiates game once user clicks on "Start Game" button
 *
 * Functionality:
 * #1 Add unique game code to UI
 * #2 Shuffles initial deck
 * #3 Assigns cards
 * #4 Paints UI according to amount of users and cards from their personal decks
 * #5 Removes waiting overlay
 */
const startGame = () => {
  let myCards = document.querySelector(".my-cards");
  let card;
  let num = 7;

  // add's unique game code to UI
  let gameCode = window.location.toString().split("game/")[1];
  let codeStr = document.createElement("p");
  codeStr.appendChild(document.createTextNode(`Game Code: ${gameCode}`));
  document.querySelector(".header-game").appendChild(codeStr);

  // shuffles deck before assigning cards
  shuffleDeck();
  console.log("[DEBUG] shuffled deck: " + players.length);

  // assigns cards
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < num; j++) {
      players[i].cards.push(deck.pop());
    }
  }

  // adds opponent elements to UI
  for (let i = 1; i < players.length; i++) {
    opponentElement(players[i].id, players[i].name, players[i].cards.length);
  }

  // adds user cards to the UI
  for (let i = 0; i < num; i++) {
    card = document.createElement("img");
    card.className = "cards";
    card.id = players[0].cards[i];
    card.src = `../content/svg/deck/${players[0].cards[i]}`;
    myCards.appendChild(card);
  }

  // adds event listener to user's cards
  let cards = document.getElementsByClassName("cards");
  Array.from(cards).forEach((card) => {
    card.addEventListener("click", (e) => {
      console.log(card.id);
      console.log("[DEBUG] Selected Card: " + e.target.id);
      selectedCard = e.target.id;
    });
  });

  // removes overlay and modal
  document.getElementById("game-start").remove();
  document.getElementById("game-start-modal").remove();
};
