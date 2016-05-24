import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {
  EMPTY, INITIAL_BOARD
} from './constants';

let gameState = {
  board: JSON.parse(JSON.stringify(INITIAL_BOARD))
};

function movePiece(x1, y1, x2, y2) {
  const s = gameState;
  s.board[y2][x2] = s.board[y1][x1];
  s.board[y1][x1] = EMPTY;
  rerender();
}

/* Rerenders the game with an updated state */
function rerender() {
  const props = {
    state: gameState,
    movePiece
  };
  ReactDOM.render(<App {...props}/>, document.getElementById('app'));
}

/* Initial render */
rerender();
