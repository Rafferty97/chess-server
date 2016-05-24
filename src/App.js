import React, { Component } from 'react';

import Board from './Board';

export default class App extends Component {
  render() {
    const { board } = this.props.state;
    const { movePiece } = this.props;
    return (
      <Board board={board} movePiece={movePiece}/>
    );
  }
}
