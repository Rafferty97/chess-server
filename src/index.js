import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { fetchGameState, postMove } from './api';

import {
  EMPTY, INITIAL_BOARD
} from './constants';

let gameState = {
  gameId: window.__DATA.gameId,
  player: 'black',
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

/* ACTIONS */

function movePiece(x1, y1, x2, y2) {
  postMove(gameState.gameId, x1, y1, x2, y2, function (err, newState) {
    if (err) {
      console.error(err);
      return;
    }
    const s = gameState;
    /* s.board[y2][x2] = s.board[y1][x1];
    s.board[y1][x1] = EMPTY; */
    setGameState(null, newState);
  });
}

/* Updates the game state */
function setGameState(err, res) {
  if (err) {
    console.error(err);
    gameState.loading = false;
    render();
    return;
  }
  gameState.board = array1Dto2D(res.board);
  gameState.loading = false;
  gameState.player = res.playerColour;
  gameState.currentPlayer = res.currentTurn;
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

/* Initial render and fetch game state */
render();
fetchGameState(gameState.gameId, setGameState);
