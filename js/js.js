'use strict';

const rollBtn = document.querySelector('.btn__roll');
const holdBtn = document.querySelector('.btn__hold');
const newBtn = document.querySelector('.btn__new');
const scorePlayer0 = document.querySelector('.board__player__score--player0');
const scorePlayer1 = document.querySelector('.board__player__score--player1');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.board__player--0');
const player1El = document.querySelector('.board__player--1');

//Starting conditions
scorePlayer0.textContent = 0;
scorePlayer1.textContent = 0;

let scores, currentScore, activePlayer, playing;

const init = () => {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	document.querySelector(`.player__name--${activePlayer}`).style.color =
		'#000000';
	scorePlayer0.textContent = 0;
	scorePlayer1.textContent = 0;
	player0El.classList.add('board__player__active');
	document
		.querySelector(`.board__player--0`)
		.classList.remove('player--winner');
	document
		.querySelector(`.board__player--1`)
		.classList.remove('player--winner');
	diceEl.classList.add('hidden');
	document.querySelector(
		`.board__player__current-score__score`
	).textContent = 0;

	document.querySelector(
		`.board__player__current-score__score--player0`
	).textContent = 0;
	document.querySelector(
		`.board__player__current-score__score--player1`
	).textContent = 0;
};
init();
//Rolling dice functionality
const rolling = () => {
	if (playing) {
		diceEl.classList.remove('hidden');
		const dice = Math.floor(Math.random() * 6 + 1);
		diceEl.src = `./img/dice-${dice}.png`;

		// 1. Check for rolled 1
		if (dice !== 1) {
			currentScore += dice;
			document.querySelector(
				`.board__player__current-score__score--player${activePlayer}`
			).textContent = currentScore;
		} else {
			currentScore = 0;
			document.querySelector(
				`.board__player__current-score__score--player${activePlayer}`
			).textContent = currentScore;
			activePlayer = activePlayer === 0 ? 1 : 0;
			document.querySelector(
				`.board__player__current-score__score--player${activePlayer}`
			).textContent = 0;

			// Toggle backlight player board
			player0El.classList.toggle('board__player__active');
			player1El.classList.toggle('board__player__active');
		}
	}
};

const holding = () => {
	if (playing) {
		scores[`${activePlayer}`] += currentScore;
		document.querySelector(
			`.board__player__score--player${activePlayer}`
		).textContent = scores[activePlayer];

		document.querySelector(
			`.board__player__score--player${activePlayer}`
		).textContent = scores[activePlayer];

		if (scores[activePlayer] >= 100) {
			document
				.querySelector(`.board__player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.board__player--${activePlayer}`)
				.classList.remove('board__player__active');
			document.querySelector(`.player__name--${activePlayer}`).style.color =
				'#c7365f';
			diceEl.classList.add('hidden');
			playing = false;
		} else {
			document.querySelector(
				`.board__player__current-score__score--player${activePlayer}`
			).textContent = 0;
			currentScore = 0;
			activePlayer = activePlayer === 0 ? 1 : 0;

			// Toggle backlight player board
			player0El.classList.toggle('board__player__active');
			player1El.classList.toggle('board__player__active');
		}
	}
};

rollBtn.addEventListener('click', rolling);
holdBtn.addEventListener('click', holding);
newBtn.addEventListener('click', init);
