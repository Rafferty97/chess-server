//stores the possible moves
var moves = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

//used by the utility function for searching possible moves
var posArr = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];

function posMovesPawn(pieceNo){
	//no validation of pieceNo yet
	//black : -1
	//white : 1
	var player = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];

	//within bounds
	if(player + posy >=0 && player+posy <8){
		//Forward movements
		if(board[posy + player][posx] == -1){
			//valid move 1 space forward
			moves[pieceNo].push([posy + player,posx]);

			//if its the first move
			if((player == 1 && piece[pieceNo][1] == 1) || (player == -1  && piece[pieceNo][1] == 6)) {
				if(board[posy + 2*player][posx] == -1){
					//first move, 2 space forward valid
					moves[pieceNo].push([posy + 2*player,posx]);
				}
			}
		}

		//Capture movements
		var x = posx-1;
		for(var i = 0; i < 2; i++){
			x+= 2*i;
			if(x>-1 && x < 8){
				var p = board[posy + player][x];
				if(p != -1){
					//check if its an opponent piece
					if((player == 1 && p > 15) || (player == -1 && p < 16)){
						moves[pieceNo].push([posy + player,x]);
					}
				}
			}
		}
	}
}
function posMovesRuck(pieceNo){
	//need to add teh castle move
	//black : -1
	//white : 1
	var player = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];

	posArr = [[1,posy,posx],[1,posy,posx],[1,posy,posx],[1,posy,posx]];
	for(var i = 1; i < 8; i++){
		//if all searched terminated, stop iteration;
		if(posArr[0][0]+posArr[1][0]+posArr[2][0]+posArr[3][0] == 0){
			break;
		} else {
			//increment search
			//forwards backwards left right
			++posArr[0][1];
			--posArr[1][1];
			--posArr[2][2];
			++posArr[3][2];

			searchLines(pieceNo);
		}
	}
}
function posMovesKnight(pieceNo){
	//black : -1
	//white : 1
	var player = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];

	//forwards left
	var y = 2;
	var x= -1;
	if(posy+y < 8 && posx+x >=0){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((player == 1 && p > 15) || (player == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//forwards right
	y = 2;
	x= +1;
	if(posy+y < 8 && posx+x <8){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((player == 1 && p > 15) || (player == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//backwards left
	y = -2;
	x= -1;
	if(posy+y >= 0 && posx+x >=0){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((player == 1 && p > 15) || (player == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//backwards right
	y = -2;
	x= +1;
	if(posy+y >= 0 && posx+x <8){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((player == 1 && p > 15) || (player == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//left forwards
	y = 1;
	x= -2;
	if(posy+y < 8 && posx+x >=0){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((player == 1 && p > 15) || (player == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//left back
	y = -1;
	x= -2;
	if(posy+y >=0 && posx+x >=0){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((player == 1 && p > 15) || (player == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//right forward
	y = 1;
	x= 2;
	if(posy+y < 8 && posx+x <8){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((player == 1 && p > 15) || (player == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
	//right back
	y = -1;
	x= 2;
	if(posy+y >=0 && posx+x <8){
		var p = board[posy + y][posx+x];
		if(p == -1){
			moves[pieceNo].push([posy + y,posx + x]);
		} else if((player == 1 && p > 15) || (player == -1 && p < 16)){
			moves[pieceNo].push([posy + y,posx + x]);
		}
	}
}
function posMovesBishop(pieceNo){
	//black : -1
	//white : 1
	var player = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];
	//forward-left forward-right back-left back-right
	posArr = [[1,posy,posx],[1,posy,posx],[1,posy,posx],[1,posy,posx]];
	for(var i = 1; i < 8; i++){
		//if all searched terminated, stop iteration;
		if(posArr[0][0]+posArr[1][0]+posArr[2][0]+posArr[3][0] == 0){
			break;
		} else {
			//increment search
			//forward-left forward-right back-left back-right
			++posArr[0][1];
			--posArr[0][2];

			++posArr[1][1];
			++posArr[1][2];

			--posArr[2][1];
			--posArr[2][2];

			--posArr[3][1];
			++posArr[3][2];
			searchLines(pieceNo);

		}
	}
}

/*
* This is a general function to test the validity of 4 tiles for a given piece
* used the values assigned to global array posArr
* @param pieceNo the piece to check moves for
*/
function searchLines(pieceNo){
	var player = (pieceNo < 16) ? 1:-1;
	for(var j = 0; j < 4;j++){

		//if still searching
		if(posArr[j][0] == 1){
			//within bounds
			if(posArr[j][1] > -1 && posArr[j][1] < 8 && posArr[j][2] > -1 && posArr[j][2] < 8){
				var p = board[posArr[j][1]][posArr[j][2]];
				//tile is empty, add continue searching
				if(p == -1){
					moves[pieceNo].push([posArr[j][1],posArr[j][2]]);
				//tile is players piece, stop searching
				} else if((player == 1 && p < 16) || (player == -1 && p > 15)){
					//set to stop searching
					posArr[j][0] = 0;
				//tile is opponents piece, add and stop searching
				}else if((player == 1 && p > 15) || (player == -1 && p < 16)){
					moves[pieceNo].push([posArr[j][1],posArr[j][2]]);
					posArr[j][0] = 0;
				}
			} else {
				//set to stop searching
				posArr[j][0] = 0;
			}
		}
	}
}

function posMovesQueen(pieceNo){
	//black : -1
	//white : 1
	var player = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];
	//up down left right
	posMovesRuck(pieceNo);
	//forward-left forward-right back-left back-right
	posMovesBishop(pieceNo);

}
function posMovesKing(pieceNo){
	//need to add castling
	//black : -1
	//white : 1
	var player = (pieceNo < 16) ? 1:-1;
	var posx = piece[pieceNo][0];
	var posy = piece[pieceNo][1];

	//-1-1   0-1   1 1

	//-1 0         1 0

	//-1 1   0 1   1 1

	for(var y = -1; y<2; y++){
		for(var x = -1; x < 2; x++){
			//ignore the current position
			if(!(x==0 && y==0)){
				//boundary check
				if(posy+y != 8 && posy+y !=-1 && posx+x !=-1 && posx+x !=8){
					var p = board[posy + y][posx+x];
					if(p == -1 || (player == 1 && p > 15) || (player == -1 && p < 16)){
						moves[pieceNo].push([posy + y,posx + x]);
					}
				}
			}
		}
	}

}

//just a test function that generates a string
//it does not exectute possibe moves for all pieces
//just a pawn and a king.
function displayMoves(){
	posMoves();
	var text = "";
	for(var i = 0; i < 32; i++){
		text += "|" + i;
		for(j = 0; j < moves[i].length; j++){
			text += ": " + moves[i][j][0] + "," + moves[i][j][1];
		}
	}
	document.getElementById("moves").innerHTML = "hello " + text;
}

/*
* Function to generate possible moves for all pieces
* Possible moves are stored in the moves array
*/
function posMoves(){
	for(var i = 0; i<32;i++){
		//clear the previous moves
		moves[i] = [];
		switch(piece[i][2]) {
			case 0:
				posMovesPawn(i);
				break;
			case 1:
				posMovesRuck(i);
				break;
			case 2:
				posMovesKnight(i);
				break;
			case 3:
				posMovesBishop(i);
				break;
			case 4:
				posMovesQueen(i);
				break;
			case 5:
				posMovesKing(i);
				break;
		}
	}
}
