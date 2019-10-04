var currentPlayer = 1;
var columnsArray = document.querySelectorAll('.column');
var cases = document.querySelectorAll('.column .case');
var game;
var gameOver;

for (var i = 0; i < columnsArray.length; i++) {
	columnsArray[i].addEventListener('click', getPlayOnColumnFunction(i));
}

function initGame() {
	game = [[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0]];

	for (var i = 0; i < cases.length; i++) {
		cases[i].setAttribute('class', 'case');
	}

	document.querySelector('.message').textContent = "";
	gameOver = false;
}

initGame();

function getPlayOnColumnFunction(i) {
	return function() {
		if (!gameOver) {
			console.log(((currentPlayer == 1) ? 'red' : 'yellow') + " player plays on column " + i);
			for (var j = 5; j >= 0; j--) {
				if (game[i][j] == 0) {
					var player = currentPlayer;
					currentPlayer = ((currentPlayer == 1) ? 2 : 1);
					game[i][j] = player;
					var classes = 'case ' + ((player == 1) ? 'red' : 'yellow');
					cases[i * 6 + j].setAttribute('class', classes);

					if (four_connected(i, j, player)) {
						gameEnd(player);
					}
					return ;
				}
			}
		}
	}
}

function four_connected(col, row, player) {
	return (four_in_a_row(col, row, player)
		|| four_in_a_column(col, row, player)
		|| four_in_a_diagonal(col, row, player));
}

function four_in_a_row(col, row, player) {
	var min = (col - 3 < 0) ? 0 : col - 3;
	var max = (col + 3 > 6) ? 6 : col + 3;
	var acc = 0;

	for (var i = min; i <= max; i++) {
		if (game[i][row] == player) {
			acc++;
			if (acc == 4) return true;
		}
		else {
			acc = 0;
		}
	}
	return false;
}

function four_in_a_column(col, row, player) {
	var max = ((row + 3 > 5) ? 5 : row + 3);
	var acc = 0;

	for (var i = max; i >= row; i--) {
		if (game[col][i] == player) {
			acc++;
			if (acc == 4) return true;
		}
		else {
			acc = 0;
		}
	}
	return false;
}

function four_in_a_diagonal(col, row, player) {
	var col_min = col - 3;
	var col_max = col + 3;
	var row_min = row - 3;
	var row_max = row + 3;

	// lower left -> upper right diagonal
	var acc = 0;
	var x = col_min;
	var y = row_max;

	while (x <= col_max && y >= row_min) {
		if (!(x < 0 || y < 0 || x > 6 || y > 5))
		{
			if (game[x][y] == player) {
				acc++;
				if (acc == 4) return true;
			}
			else {
				acc = 0;
			}
		}
		x++;
		y--;
	}

	// lower right -> upper left diagonal
	acc = 0;
	x = col_max;
	y = row_max;
	
	while (x >= col_min && y >= row_min) {
		if (!(x < 0 || y < 0 || x > 6 || y > 5))
		{
			if (game[x][y] == player) {
				acc++;
				if (acc == 4) return true;
			}
			else {
				acc = 0;
			}
		}
		x--;
		y--;
	}
	return false;
}

function gameEnd(player) {
	var message = "Le joueur " + ((player == 1) ? 'rouge' : 'jaune') + ' a gagné la partie !';
	document.querySelector('.message').textContent = message;
	gameOver = true;
}

function restartGame() {
	initGame();
}