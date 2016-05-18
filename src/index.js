import React from 'react';
import ReactDOM from 'react-dom';

const EMPTY = -1;
const [ PAWN, RUCK, KNIGHT, BISHOP, QUEEN, KING ] = [0, 1, 2, 3, 4, 5];
const [ WHITE, BLACK ] = [0, 6];
const pieceType = (n) => (n == -1 ? -1 : n % 6);
const pieceColour = (n) => (n - pieceType(n));

const INITIAL_BOARD = [
	BLACK + RUCK, BLACK + KNIGHT, BLACK + BISHOP, BLACK + QUEEN, BLACK + KING, BLACK + BISHOP, BLACK + KNIGHT, BLACK + RUCK,
	BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN, BLACK + PAWN,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN, WHITE + PAWN,
	WHITE + RUCK, WHITE + KNIGHT, WHITE + BISHOP, WHITE + QUEEN, WHITE + KING, WHITE + BISHOP, WHITE + KNIGHT, WHITE + RUCK
];

var Board = React.createClass({

  state = {
		board: INITIAL_BOARD
	}

  render: function () {
		const { board } = this.state;
    var tiles = [];
  	for (var y = 0; y < 8; y++) {
  		for (var x = 0; x < 8; x++) {
        var text = '';
				const piece = board[y][x];
        switch (pieceType(piece)) {
          case EMPTY:
            break;
          case PAWN:
            text = "PAWN";
            break;
          case RUCK:
            text = "RUCK";
            break;
          case KNIGHT:
            text = "KNIGHT";
            break;
          case BISHOP:
            text = "BISHOP";
            break;
          case QUEEN:
            text = "QUEEN";
            break;
          case KING:
            text = "KING";
            break;
        }
  			// Alternates colours with row/column number
        var bk = 'black';
  			if (y%2 - x%2 === 0) {
  				bk = 'white';
  			}
        // Add the tile to the board
        tiles.push(<div className={'tile ' + bk} key={x + ':' + y}>{text}</div>);
  		}
  	}

    return <div className="board">{tile}</div>;
  }
});

ReactDOM.render(<Board />, document.getElementById('app'));
