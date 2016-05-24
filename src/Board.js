import React, { Component } from 'react';

import {
	EMPTY,
	PAWN, RUCK, KNIGHT, BISHOP, QUEEN, KING,
	WHITE, BLACK,
	pieceType, pieceColour,
	INITIAL_BOARD, CHESS_PIECE_SRC,
	CHESS_PIECE_FILETYPE
} from './constants';

class Board extends Component {
  constructor(props) {
		super(props);
		this.state = {
			board: INITIAL_BOARD
		};
	}

  render() {
		const { board } = this.state;
    var tiles = [];

  	for (var y = 0; y < 8; y++) {
  		for (var x = 0; x < 8; x++) {
        let text = '';
				const piece = board[y][x];
        switch (pieceType(piece)) {
          case EMPTY:
            break;
          case PAWN:
            text = 'PAWN';
            break;
          case RUCK:
            text = 'RUCK';
            break;
          case KNIGHT:
            text = 'KNIGHT';
            break;
          case BISHOP:
            text = 'BISHOP';
            break;
          case QUEEN:
            text = 'QUEEN';
            break;
          case KING:
            text = 'KING';
						break;
        }
  			// Alternates colours with row/column number
        var bk = 'black';
  			if (y%2 - x%2 === 0) {
  				bk = 'white';
  			}
			
			//assign chess piece or empty
			var imgfile = piece === -1 ? "":CHESS_PIECE_SRC + piece + CHESS_PIECE_FILETYPE;
        // Add the tile to the board
        tiles.push(<div className={'tile ' + bk} key={x + ':' + y}>{<img src={imgfile} alt=""></img>}</div>);
  		}
  	}

    return <div className="board">{tiles}</div>;
  }
}

export default Board;
