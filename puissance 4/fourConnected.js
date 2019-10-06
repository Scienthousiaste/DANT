function fourConnected(col, row, player) {
	return (fourInRow(col, row, player)
		|| fourInColumn(col, row, player)
		|| fourInDiagonal(col, row, player));
}

function fourInRow(col, row, player) {
	var min = (col - 3 < 0) ? 0 : col - 3;
	var max = (col + 3 > MAX_COL) ? MAX_COL : col + 3;
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

function fourInColumn(col, row, player) {
	var max = ((row + 3 > MAX_ROW) ? MAX_ROW : row + 3);
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

function fourInDiagonal(col, row, player) {
	var colMin = col - 3;
	var colMax = col + 3;
	var rowMin = row - 3;
	var rowMax = row + 3;

	// Diagonale en bas à gauche -> en haut à droite
	var acc = 0;
	var x = colMin;
	var y = rowMax;

	while (x <= colMax && y >= rowMin) {
		if (x >= 0 && y >= 0 && x <= MAX_COL && y <= MAX_ROW)
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

	// Diagonale en bas à droite -> en haut à gauche
	acc = 0;
	x = colMax;
	y = rowMax;
	
	while (x >= colMin && y >= rowMin) {
		if (!(x < 0 || y < 0 || x > MAX_COL || y > MAX_ROW))
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