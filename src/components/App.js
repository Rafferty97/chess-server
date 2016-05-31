import React, { Component } from 'react';

import Board from './Board';

import { WHITE, BLACK } from '../constants';

export default class App extends Component {
  render() {
    const { board, loading, player, currentPlayer } = this.props.state;
    const { movePiece } = this.props;
    const playerColour = player == 'white' ? WHITE : BLACK;
    const hasTurn = player == currentPlayer;
    return (
      <div>
        <p style={{ textAlign: 'center' }}>{ loading ? 'Loading...' : '' }</p>
        <Board board={board} movePiece={movePiece} playerColour={playerColour} hasTurn={hasTurn}/>
      </div>
    );
  }
}
