// grabs card names from "/content/svg/deck" and place them into deck object

let grabDeck = ["blue-00.svg", "blue-01.svg", "blue-03.svg", "blue-04.svg"];
let selectedCard = null; // card user chooses to play
let usersDeck = [
  "blue-00.svg",
  "green-01.svg",
  "red-02.svg",
  "wild-draw4.svg",
  "wild.svg",
  "yellow-draw2.svg",
  "red-05.svg",
  "green-09.svg",
  "blue-reverse.svg",
  "yellow-skip.svg",
];

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
  let newDeck = usersDeck.filter((card) => card !== selectedCard);
  usersDeck = newDeck;
  console.log("[DEBUG] Card Placed: " + usersDeck);

  // Server-Side (Add Card to DB)

  // Move onto the next user's turn
});
