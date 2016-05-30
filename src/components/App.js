import React, { Component } from 'react';

import Board from './Board';

import { WHITE } from '../constants';

export default class App extends Component {
  render() {
    const { board, loading } = this.props.state;
    const { movePiece } = this.props;
    return (
      <div>
        <p style={{ textAlign: 'center' }}>{ loading ? 'Loading...' : '' }</p>
        <Board board={board} movePiece={movePiece} playerColour={WHITE}/>
      </div>
    );
  }
}
