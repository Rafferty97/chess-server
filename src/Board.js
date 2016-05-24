import React, { Component } from 'react';

import BoardTile from './BoardTile';

import {
	EMPTY,
	PAWN, RUCK, KNIGHT, BISHOP, QUEEN, KING,
	WHITE, BLACK,
	pieceType, pieceColour,
	INITIAL_BOARD
} from './constants';

class Board extends Component {
	constructor() {
		super();
		this.state = {
		  selectedTile: { x: -1, y: -1 }
		};
	}

	handleClick(x, y) {
		const seltile = this.state.selectedTile;
		if (seltile.x == -1) {
			this.setState({
				selectedTile: {x, y}
			});
		} else {
			this.setState({
				selectedTile: {x: -1, y: -1}
			});
			this.props.movePiece(seltile.x, seltile.y, x, y);
		}
	}

  render() {
		const { board } = this.props;
    var tiles = [];
  	for (var y = 0; y < 8; y++) {
  		for (var x = 0; x < 8; x++) {
        let text = '';
				const piece = board[y][x];
				const selected = (this.state.selectedTile.x == x) && (this.state.selectedTile.y == y);
  			// Alternates colours with row/column number
        var bk = 'black';
  			if (y%2 - x%2 === 0) {
  				bk = 'white';
  			}
        // Add the tile to the board
        tiles.push(
					<BoardTile
						colour={bk}
						key={x + ':' + y}
						piece={piece}
						selected={selected}
						onClick={this.handleClick.bind(this, x, y)}
						/>
				);
  		}
  	}

    return <div className="board">{tiles}</div>;
  }
}

export default Board;
