import React, { Component } from 'react';

import Board from './Board';

export default class App extends Component {
  render() {
    const { board } = this.props.state;
    return (
      <Board board={board} />
    );
  }
}
