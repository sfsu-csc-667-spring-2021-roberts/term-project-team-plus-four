// grabs card names from "/content/svg/deck" and place them into deck object
let deck = [];
let players = [
  {
    id: 0,
    name: "Bob Lee",
    cards: [
      "blue-00.svg",
      "green-01.svg",
      "red-02.svg",
      "wild-draw4.svg",
      "wild-wild.svg",
      "yellow-draw2.svg",
      "red-05.svg",
      "green-09.svg",
      "blue-reverse.svg",
      "yellow-skip.svg",
      "yellow-00.svg",
    ],
  },
  {
    id: 1,
    name: "Smith Brown",
    cards: ["blue-reverse.svg", "yellow-skip.svg", "yellow-00.svg"],
  },
  {
    id: 2,
    name: "Candice Lopez",
    cards: ["blue-reverse.svg", "yellow-00.svg"],
  },
  {
    id: 3,
    name: "Cindy Loo",
    cards: [
      "yellow-00.svg",
      "blue-reverse.svg",
      "yellow-skip.svg",
      "yellow-00.svg",
    ],
  },
];
let grabDeck = ["blue-00.svg", "blue-01.svg", "blue-03.svg", "blue-04.svg"];
let selectedCard = null; // card user chooses to play
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

/* 
load players into the game (start at 1 skips the user logged in 
assuming logged in user is in index 0)
*/
for (let i = 1; i < players.length; i++) {
  opponentElement(players[i].id, players[i].name, players[i].cards.length);
}

// Adds card to user's pile
document.querySelector("#grabCard").addEventListener("click", (e) => {
  e.preventDefault();
  // Client-Side (Show card to user)
  console.log("[DEBUG] Card Added");

  // Server-Side (Add card to DB)

  // Move onto the next user's turn
});

// Updates selected card
var cards = document.getElementsByClassName("cards");
Array.from(cards).forEach((card) => {
  card.addEventListener("click", (e) => {
    console.log("[DEBUG] Selected Card: " + e.target.id);
    selectedCard = e.target.id;
  });
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
  } else return alert(`Invalid Card: Card must be ${topPlacedCard.color}`);

  // Server-Side (Add Card to DB)

  // Move onto the next user's turn
  waitTurn(true);
});

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
    document.getElementById("active").id = "waiting";
    document.getElementById("waiting").appendChild(msg);
    // highlight the user who's turn it is
    document.querySelector(`#opponent-${players[1].id} .opponent-info`).id =
      "highlight-user";
  } else {
    document.getElementById("waiting").id = "active";
    document.getElementById("active").remove(msg);
    // remove highlighting attriute
    document
      .getElementById(`opponent-${players[1].id}`)
      .removeAttribute("highlight-user");
  }
};
