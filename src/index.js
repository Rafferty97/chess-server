import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { fetchGameState } from './api';

import {
  EMPTY, INITIAL_BOARD
} from './constants';

let gameState = {
  gameId: window.__DATA.gameId,
  loading: true,
  board: [[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1]]
};

function array1Dto2D(arr) {
  var ret = [];
  for (var i=0; i<64; i+=8) {
    ret.push(arr.slice(i, i+8));
  }
  return ret;
}

/* Moves a piece for x1, y1 to x2, y2 */
function movePiece(x1, y1, x2, y2) {
  const s = gameState;
  s.board[y2][x2] = s.board[y1][x1];
  s.board[y1][x1] = EMPTY;
  render();
}

/* Renders the game with an updated state */
function render() {
  const props = {
    state: gameState,
    movePiece
  };
  ReactDOM.render(<App {...props}/>, document.getElementById('app'));
}

/* Initial render */
render();

/* Fetch the game state */
fetchGameState(gameState.gameId, function (err, res) {
  if (err) {
    console.error(err);
    gameState.loading = false;
    render();
    return;
  }
  const tiles = res.boardHistory.pop().tiles;
  gameState.board = array1Dto2D(tiles);
  gameState.loading = false;
  render();
});
