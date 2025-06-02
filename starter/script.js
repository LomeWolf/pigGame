"use strict";

const diceEl = document.querySelector(".dice");
// button-related elements
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");

// player-related elements & attributes
const player0 = {
  scoreEl: document.getElementById("score--0"),
  playerEl: document.querySelector(".player--0"),
  totalScoreEl: document.getElementById("current--0"),
  score: null,
  totalScore: null,
};
const player1 = {
  scoreEl: document.getElementById("score--1"),
  playerEl: document.querySelector(".player--1"),
  totalScoreEl: document.getElementById("current--1"),
  score: null,
  totalScore: null,
};

// -----GAME LOGIC FUNCTIONS -----
// reset scores, active player, hide dice
const resetGame = () => {
  player0.scoreEl.textContent = 0;
  player1.scoreEl.textContent = 0;
  player0.totalScoreEl.textContent = 0;
  player1.totalScoreEl.textContent = 0;
  diceEl.classList.add("hidden");
};
// reset score and switch player turns

// Check for active player, Return the player object
const getActivePlayer = () => {
  if (player0.playerEl.classList.contains("player--active")) return player0;
  if (player1.playerEl.classList.contains("player--active")) return player1;
  return null;
};
// Check for inactive player, Return the player object
const getInactivePlayer = () => {
  if (!player0.playerEl.classList.contains("player--active")) return player0;
  if (!player1.playerEl.classList.contains("player--active")) return player1;
  return null;
};

// retrieve the number from the class name attached to the current active--player

/*
const swapActivePlayer = (activatePlayer, deactivatePlayer) => {
  if (deactivatePlayer.playerEl.classList.contains("player--active")) {
    // set "deactivated" player as inactive
    deactivatePlayer.playerEl.classList.remove("player--active");
    // set "activated" player as active
    activatePlayer.playerEl.classList.add("player--active");
    // reset "deactivated" player's scores
    deactivatePlayer.score = 0;
    deactivatePlayer.scoreEl.textContent = deactivatePlayer.score;
  }
}; 
*/

const swapActivePlayer = () => {
  // Remove "player--active" class from active player element
  // Add "player--active" class to active player element
  // Reset scores in player object and html element
  let activePl = getActivePlayer();
  let inactivePl = getInactivePlayer();

  activePl.playerEl.classList.remove("player--active");
  activePl.score = 0;
  activePl.scoreEl.textContent = 0;
  inactivePl.playerEl.classList.add("player--active");
};

//reset game and scores before starting
resetGame();
player0.score = Number(player0.scoreEl.textContent);
player1.score = Number(player1.scoreEl.textContent);
player0.totalScore = Number(player0.totalScoreEl.textContent);
player1.totalScore = Number(player1.totalScoreEl.textContent);

// dice-roll logic
const rollDice = () => {
  // generate random dice value
  let diceValue = Math.trunc(Math.random() * 6) + 1;

  // display corresponding dice image
  diceEl.classList.remove("hidden");
  diceEl.src = `img/dice-${diceValue}.png`;

  // ------- HANDLE PLAYER SCORES AND TURNS -----
  // reset score and change turns if dice yields 1

  if (
    diceValue === 1 &&
    player0.playerEl.classList.contains("player--active")
  ) {
    // swapActivePlayer(player1, player0);
    swapActivePlayer();
  } else if (
    diceValue === 1 &&
    player1.playerEl.classList.contains("player--active")
  ) {
    // swapActivePlayer(player0, player1);
    swapActivePlayer();
  } else if (
    diceValue > 1 &&
    player0.playerEl.classList.contains("player--active")
  ) {
    player0.score += diceValue;
    player0.scoreEl.textContent = player0.score;
  } else if (
    diceValue > 1 &&
    player1.playerEl.classList.contains("player--active")
  ) {
    player1.score += diceValue;
    player1.scoreEl.textContent = player1.score;
  }
};

const holdScore = () => {
  if (player0.playerEl.classList.contains("player--active")) {
    // add score to tally then swap player
    player0.totalScore += player0.score;
    player0.totalScoreEl.textContent = player0.totalScore;
    // swapActivePlayer(player1, player0);
    swapActivePlayer();

    // check if game is won
    if (player0.totalScore >= 100) {
      player0.playerEl.classList.add("player--winner");
      diceEl.classList.add("hidden");
      //   resetGame();
    }
  } else if (player1.playerEl.classList.contains("player--active")) {
    // add score to tally
    player1.totalScore += player1.score;
    player1.totalScoreEl.textContent = player1.totalScore;
    // switch turns
    // swapActivePlayer(player0, player1);
    swapActivePlayer();

    // game-won functionality
    if (player1.totalScore >= 100) {
      player1.playerEl.classList.add("player--winner");
      diceEl.classList.add("hidden");
      //   resetGame();
    }
  }
  // hide dice image
  diceEl.classList.add("hidden");
};

// ---------BUTTON FUNCTIONALITY-----------
// roll dice
btnRollDice.addEventListener("click", rollDice);
// hold-score functionality
btnHold.addEventListener("click", holdScore);
// reset game
btnNewGame.addEventListener("click", resetGame);
/* TODO 
score0El.textContent = score0; should be a function
switching turns should be a function
*/
