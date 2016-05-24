import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {
  EMPTY, INITIAL_BOARD
} from './constants';

let state = {
  board: JSON.parse(JSON.stringify(INITIAL_BOARD))
};

function movePiece(x1, y1, x2, y2) {
  state.board[y2][x2] = state.board[y1][x1];
  state.board[y1][x1] = EMPTY;
  rerender();
}

function rerender() {
  ReactDOM.render(<App state={state}/>, document.getElementById('app'));
}

setTimeout(function() {
  movePiece(3, 6, 3, 4);
}, 2000);

rerender();
