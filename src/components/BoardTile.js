import React, { Component } from 'react';

import {
	EMPTY,
	PAWN, RUCK, KNIGHT, BISHOP, QUEEN, KING,
	WHITE, BLACK,
  pieceType,
	CHESS_PIECE_SRC, CHESS_PIECE_FILETYPE
} from '../constants';

export default class BoardTile extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  handleMouseOver() {
    this.setState({
      hover: true
    });
  }

  handleMouseOut() {
    this.setState({
      hover: false
    });
  }

  render() {
    const { colour, piece } = this.props;
		const src = CHESS_PIECE_SRC + piece + CHESS_PIECE_FILETYPE;
    let className = 'tile ' + colour;
    if (this.state.hover) className += ' hover';
    if (this.props.selected) className += ' selected';
    if (this.props.available && piece == EMPTY) className += ' available';
		if (this.props.available && piece != EMPTY) className += ' kill';
    return (
      <div
        className={className}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        onClick={this.props.onClick}
        >
        {piece == EMPTY ? null : <img src={src} />}
      </div>
    );
  }
}
