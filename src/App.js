import React, { Component } from 'react';

import Board from './Board';

import { WHITE } from './constants';

export default class App extends Component {
  render() {
    const { board } = this.props.state;
    const { movePiece } = this.props;
    return (
      <Board board={board} movePiece={movePiece} playerColour={WHITE}/>
    );
  }
}
