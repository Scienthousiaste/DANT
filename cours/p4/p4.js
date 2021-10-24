var MAX_ROW = 5;
var MAX_COL = 6;
var COL_LENGTH = 6;

var currentPlayer = 1;
var columnsArray = document.querySelectorAll('.column');
var squares = document.querySelectorAll('.column .square');
var game;
var gameOver;

function initGame() {
	game = [[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0]];

	for (var i = 0; i < squares.length; i++) {
		squares[i].className = 'square';
	}

	document.querySelector('.gameOverMessage').textContent = "";
	document.querySelector('.playerMessage').innerHTML = "Tour du joueur <span id='playingColor'>rouge</span>";
	currentPlayer = 1;
	gameOver = false;
}

initGame();

for (var i = 0; i < columnsArray.length; i++) {
	columnsArray[i].addEventListener('click', getPlayOnColumnFunction(i));
}

function getPlayOnColumnFunction(i) {
	return function() {
		playOnColumn(i);
	}
}

function playOnColumn(col) {
	if (!gameOver) {
		for (var row = MAX_ROW; row >= 0; row--) {
			if (game[col][row] == 0) { //case inoccupée

				// On modifie notre tableau représentant l'état du jeu
				var player = currentPlayer;
				game[col][row] = player;
				changePlayer();

				// On change le HTML en ajoutant une classe à la position jouée
				var newClass = ((player == 1) ? 'red' : 'yellow');
				squares[col * COL_LENGTH + row].className += ' ' + newClass;

				// On vérifie si la partie est terminée
				if (fourConnected(col, row, player)) {
					gameEnd(player);
				}
				return ;
			}
		}
	}
}

function changePlayer() {
	currentPlayer = ((currentPlayer == 1) ? 2 : 1);
	var playerColor = ((currentPlayer == 1) ? "rouge" : "jaune");
	document.querySelector('#playingColor').textContent = playerColor;
}

function gameEnd(player) {
	var message = "Le joueur " + ((player == 1) ? 'rouge' : 'jaune') + ' a gagné la partie !';
	document.querySelector('.gameOverMessage').textContent = message;
	document.querySelector('.playerMessage').innerHTML = "Fin de la partie";
	gameOver = true;
}

function restartGame() {
	initGame();
}