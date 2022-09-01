'use strict';
// Elementos principales
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Declaro variables vacias para luego usarlas en la funcion "init"
let scores, currentScore, activePlayer, playing;
// Funcion init, Inicializa la partida
const init = function () {
  // Inicializo las variables con sus valores iniciales 0
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  // Elementos de forma inicial
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init(); //Inicio la funcion para que el juego comience
// Funcion para cambiar de jugador
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Funcionalidad del dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generar un dado random
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Mostrar el dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Si el dado no es el 1, agregar puntaje al current
    if (dice !== 1) {
      // Agregar el valor del dado al puntaje actual
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Si el dado sale 1, cambiar jugador
      switchPlayer();
    }
  }
});
// Boton mantener puntaje
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Agregar puntaje actual al jugador activo
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
  // 2. Check if player's score is >= 100 Finish Game
});

btnNew.addEventListener('click', init);
