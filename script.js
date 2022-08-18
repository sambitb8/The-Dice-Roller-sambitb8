'use strict';

const scoreZero = document.getElementById(`score--0`);
const scoreOne = document.getElementById(`score--1`);
const diceImg = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const currentPlayerZero = document.getElementById(`current--0`);
const currentPlayerOne = document.getElementById(`current--1`);

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--0`).classList.toggle(`player--active`);
  document.querySelector(`.player--1`).classList.toggle(`player--active`);
};

let currentScore,
  activePlayer,
  playerScore = [],
  isGameOver;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  playerScore = [0, 0];
  isGameOver = false;
  scoreZero.textContent = `0`;
  scoreOne.textContent = `0`;
  document.getElementById(`current--0`).textContent = `0`;
  document.getElementById(`current--1`).textContent = `0`;
  diceImg.classList.add(`hidden`);
  document.querySelector(`.player--1`).classList.remove(`player--active`);
  document.querySelector(`.player--0`).classList.add(`player--active`);
  document.querySelector(`.player--0`).classList.remove(`player--winner`);
  document.querySelector(`.player--1`).classList.remove(`player--winner`);
};

init();

btnRoll.addEventListener(`click`, function () {
  if (!isGameOver) {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    diceImg.src = `dice-${diceRoll}.png`;
    diceImg.classList.remove(`hidden`);
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (!isGameOver) {
    playerScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playerScore[activePlayer];

    if (playerScore[activePlayer] >= 100) {
      isGameOver = true;
      currentScore = 0;
      diceImg.classList.add(`hidden`);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
