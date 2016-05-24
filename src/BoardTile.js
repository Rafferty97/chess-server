import React, { Component } from 'react';

import {
	EMPTY,
	PAWN, RUCK, KNIGHT, BISHOP, QUEEN, KING,
	WHITE, BLACK,
  pieceType
} from './constants';

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
    let text = '';
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
    let className = 'tile ' + colour;
    if (this.state.hover) className += ' hover';
    return (
      <div
        className={className}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        onClick={this.props.onClick}
        >
        {text}
      </div>
    );
  }
}
