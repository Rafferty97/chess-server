var EMPTY = -1;
var PAWN = 0, RUCK = 1, KNIGHT = 2, BISHOP = 3, QUEEN = 4, KING = 5;
var WHITE = 0, BLACK = 6;
function pieceType(n) { return n == -1 ? -1 : n % 6; }
function pieceColour(n) { return n - pieceType(n); }
var INITIAL_BOARD = [
	[ BLACK + RUCK, BLACK + KNIGHT, BLACK + BISHOP, BLACK + QUEEN, BLACK + KING, BLACK + BISHOP, BLACK + KNIGHT, BLACK + RUCK ],
	[ BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN ],
	[ EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY ],
	[ EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY ],
	[ EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY ],
	[ EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY ],
	[ WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN ],
	[ WHITE + RUCK, WHITE + KNIGHT, WHITE + BISHOP, WHITE + QUEEN, WHITE + KING, WHITE + BISHOP, WHITE + KNIGHT, WHITE + RUCK ]
];

const BOARD = INITIAL_BOARD;

/*
* Possible moves for pawn
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesPawn(board, posx, posy){
	//no validation of pieceNo yet
	//black : 1
	//white : -1
	var player = (board[posy][posx] < BLACK) ? -1:1;
	var moves = [];

	//within bounds
	if(boundaries(posy+player,posx)){
		//Forward movements
		if(board[posy + player][posx] == -1){
			//valid move 1 space forward
			moves.push([posy + player,posx]);
			//if its the first move
			if((player == 1 && posy == 1) || (player == -1  && posy == 6)) {
				if(board[posy + 2*player][posx] == -1){
					//first move, 2 space forward valid
					moves.push([posy + 2*player,posx]);
				}
			}
		}
	}

	//Capture movements
	var x = [-1,1];
	for(var i = 0; i < 2; i++){
		//boundary check
		if(boundaries(posy+player,posx+x[i])){
			var p = board[posy + player][posx + x[i]];
			//check if its an opponent piece
			if(p != -1 && captureOrEmpty(board[posy][posx],p)){
				moves.push([posy + player,posx + x[i]]);
			}
		}
	}
	return moves;
}

/*
* Possible moves for Ruck
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesRuck(board, posx, posy){
	// TODO: Add the castle move
	var moves = [];
	moves = moves.concat(searchLines(board, posx, posy, -1,  0));
	moves = moves.concat(searchLines(board, posx, posy,  1,  0));
	moves = moves.concat(searchLines(board, posx, posy,  0, -1));
	moves = moves.concat(searchLines(board, posx, posy,  0,  1));
	return moves;
}
/*
* Possible moves for Knight
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesKnight(board, posx, posy){
	var moves = [];
	var posArr = [[2,1],[2,-1],[-2,-1],[-2,1],[1,2],[1,-2],[-1,2],[-1,-2]];
	//forwards left
	var y = 0;
	var x = 0;
	for (var i = 0; i < 8; i++){
		y = posy + posArr[i][0];
		x = posx + posArr[i][1];
		if (boundaries(y,x)) {
			if (captureOrEmpty(board[posy][posx],board[y][x])) {
				moves.push([y,x]);
			}
		}
	}
	return moves;
}

/*
* Possible moves for Bishop
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesBishop(board, posx, posy){
	var moves = [];
	moves = moves.concat(searchLines(board, posx, posy, -1, -1));
	moves = moves.concat(searchLines(board, posx, posy,  1, -1));
	moves = moves.concat(searchLines(board, posx, posy, -1,  1));
	moves = moves.concat(searchLines(board, posx, posy,  1,  1));
	return moves;
}

/*
* Possible moves for Queen
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesQueen(board, posx, posy){
	var moves = [];
	//up down left right
	moves = moves.concat(posMovesRuck(board, posx, posy));
	//forward-left forward-right back-left back-right
	moves = moves.concat(posMovesBishop(board, posx, posy));
	return moves;
}

/*
* Possible moves for King
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function posMovesKing(board, posx, posy){
	// need to add castling
	var moves = [];
	for (var y = -1; y<2; y++) {
		for (var x = -1; x < 2; x++) {
			// ignore the current position
			if (x===0 && y===0) continue;
			if (!boundaries(posy+y, posx+x)) continue;
			if (!captureOrEmpty(board[posy][posx], board[posy+y][posx+x])) continue;
			moves.push([posy+y, posx+x]);
		}
	}
	return moves;
}

/*
* This is a utility function to test the validity of 4 tiles for a given piece
* @param posArr a 4x2 array containing the coords for tiles to test
* @param board the game board
* @param posx the x coord
* @param posy the y coord
* @return an array of possible moves in the form [[y,x],[y,x]..] or [] if no moves possible
*/
function searchLines(board, posx, posy, relx, rely){
	var moves = [];
	var x = posx + relx, y = posy + rely;
  while (boundaries(y, x)) {
		var p = board[y][x];
		// if tile is own piece, terminate search
		if (!captureOrEmpty(board[posy][posx], p))
		  return moves;
		moves.push([y, x]);
		// tile is opponents piece, terminate search
		if (p != EMPTY) return moves;
		// step
		x += relx;
		y += rely;
	}
	return moves;
}

/*
* utility function for testing boundaries
* @param y y coord
* @param x x coord
* @return true iff coordinate is within board boundaries
*/
function boundaries(y, x) {
	return (x < 8 && y < 8 && x > -1 && y > -1);
}

/*
* utility function for testing if a move is a capture or valid empty tile
* @param thisNumber current piece
* @param thatNumber the tile to be captured
* @return true or false
*/
function captureOrEmpty(thisNumber, thatNumber) {
	return (thatNumber == EMPTY || pieceColour(thisNumber) != pieceColour(thatNumber));
}


/*
* function used to generate possible moves for a single piece
* @param board the current game board array
* @param x the x index
* @param y the y index
* @return the array of possible moves for this piece
*/
function possibleMove(board, x, y){
	var moves = [];
	//If empty tile an empty array is returned
	if(board[y][x] == -1){
		return moves;
	} else {
		switch(pieceType(board[y][x])) {
			case PAWN:
				moves = posMovesPawn(board,x,y);
				break;
			case RUCK:
				moves = posMovesRuck(board,x,y);
				break;
			case KNIGHT:
				moves = posMovesKnight(board,x,y);
				break;
			case BISHOP:
				moves = posMovesBishop(board,x,y);
				break;
			case QUEEN:
				moves = posMovesQueen(board,x,y);
				break;
			case KING:
				moves = posMovesKing(board,x,y);
				break;
		}
	}
	//return the possible moves
	return moves;
}

function checkMate(board){
	var checkM8 = true;
	var moves = [];
	var king = [[0,0],[0,0]];
	for (var r=0; r<8; r++) {
		for (var c=0; c<8; c++) {
			moves.concat(possibleMove(board,r,c));
			if (pieceType(board[r][c]) == KING) {
				king[pieceColour(board[r][c])===0?0:1][0] = r;
				king[pieceColour(board[r][c])===0?0:1][0] = c;
			}
		}
	}

	//if all possible moves for king are possible moves of opponent
	//and there are no pawns around that could capture after moving
	//then it is checkm8

	//my idea was something like run testCheck if true then run checkMate
	//if checkMate is true then the player that just moved wins
}

/*
* Use this function after a move has been executed to test if it puts the opponent into a check.
* @param board current board
* @param y index of piece just moved
* @param x index of piece just moved
* @return true if opponent king is in check
*/
function testCheck(board, y, x){
	var player = pieceColour(board[y][x]);
	var posmove = possibleMove(board,x,y);
	for(var i=0; i<posmove.length; i++){
		var m = posmove[i];
		if(pieceNo(board[m[0]][m[1]]) == KING){ return true;}
	}
	return false;
}
/*
* Function to test if a move is valid
* @param board the game board
* @param fromY the piece Y coord
* @param fromX the piece X coord
* @param toY the coord after moving
* @param toX the coord after moving
* @return true or false if move is valid or not
*/
function validateMove(board, fromY, fromX, toY, toX){
	var moves = possibleMove(board,fromX,fromY);
	for(var i =0; i < moves.length;i++){
		//if move is valid
		if(moves[i][0] === toY && moves[i][1] === toX){
			return true;
		}
	}
	return false;
}

module.exports = {
	possibleMove: possibleMove,
	validateMove: validateMove
};
