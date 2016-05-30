import React, { Component } from 'react';

import { validateMove, possibleMove } from '../possible-moves';

import BoardTile from './BoardTile';

import {
	EMPTY,
	PAWN, RUCK, KNIGHT, BISHOP, QUEEN, KING,
	WHITE, BLACK,
	pieceType, pieceColour,
	INITIAL_BOARD
} from '../constants';

class Board extends Component {
	constructor() {
		super();
		this.state = {
		  selectedTile: { x: -1, y: -1 },
			availableTiles: []
		};
	}

	handleClick(x, y) {
		const seltile = this.state.selectedTile;
		if (seltile.x == -1) {
			if (pieceColour(this.props.board[y][x]) != this.props.playerColour) return;
			this.setState({
				selectedTile: {x, y},
				availableTiles: possibleMove(this.props.board, x, y)
			});
		} else {
			// If click on same tile, unselect it
			if (seltile.x == x && seltile.y == y) {
				this.setState({
					selectedTile: {x: -1, y: -1},
					availableTiles: []
				});
				return;
			}
			// If click on different piece, select that instead
			if (pieceColour(this.props.board[y][x]) == this.props.playerColour) {
				this.setState({
					selectedTile: {x, y},
					availableTiles: possibleMove(this.props.board, x, y)
				});
				return;
			}
			// If not a valid move, do nothing
			if (!validateMove(this.props.board, seltile.y, seltile.x, y, x))
			  return;
			// Move the piece
			this.setState({
				selectedTile: {x: -1, y: -1},
				availableTiles: []
			});
			this.props.movePiece(seltile.x, seltile.y, x, y);
		}
	}

	checkTileAvailability(x, y) {
		const tiles = this.state.availableTiles;
		for (var i=0; i<tiles.length; i++) {
			if (tiles[i][1] == x && tiles[i][0] == y)
			  return true;
		}
		return false;
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
				// Check if tile is available to move to
				const available = this.checkTileAvailability(x, y);
        // Add the tile to the board
        tiles.push(
					<BoardTile
						colour={bk}
						key={x + ':' + y}
						piece={piece}
						selected={selected}
						available={available}
						onClick={this.handleClick.bind(this, x, y)}
						/>
				);
  		}
  	}

    return <div className="board">{tiles}</div>;
  }
}

export default Board;
