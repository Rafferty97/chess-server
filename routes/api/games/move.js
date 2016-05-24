var possibleMoves = require('../../possible-moves.js');
var validateMove = possibleMoves.validateMove;

function array1Dto2D(arr) {
  var ret = [];
  for (var i=0; i<64; i+=8) {
    ret.push(arr.slice(i, i+8));
  }
  return ret;
}

function array2Dto1D(arr) {
  var ret = [];
  for (var i=0; i<8; i++) {
    ret = ret.concat(arr[i]);
  }
  return ret;
}

module.exports = function(req, res, next) {
  var fromx = parseInt(req.body.fromx);
  var fromy = parseInt(req.body.fromy);
  var tox = parseInt(req.body.tox);
  var toy = parseInt(req.body.toy);
  req.Game.findOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, game) {
    if (err || (game === null)) return next({
      status: 404, message: 'Game does not exist'
    });
    // Get the current board state
    var board = array1Dto2D(game.boardHistory.pop().tiles);
    // Check that both players have accepted
    if (!game.whiteAccepted || !game.blackAccepted) {
      return next({
        status: 400, message: 'Not all players have accepted yet'
      });
    }
    // Check that the correct player is moving
    var pieceNum = board[fromy][fromx];
    if (game.currentTurn == 'white' && (pieceNum == -1 || pieceNum >= 6)) {
      return next({
        status: 400, message: 'A white piece was not selected; it is white\'s turn.'
      });
    }
    if (game.currentTurn == 'black' && (pieceNum == -1 || pieceNum < 6)) {
      return next({
        status: 400, message: 'A black piece was not selected; it is black\'s turn.'
      });
    }
    // Validate the move
    if (!validateMove(board, fromy, fromx, toy, tox)) {
      return next({
        status: 400, message: 'That is not a valid move.'
      });
    }
    // Calculate the new board state
    board[toy][tox] = board[fromy][fromx];
    board[fromy][fromx] = -1;
    console.log(board);
    // Update the board
    req.Game.update({
      _id: new mongodb.ObjectID(gameId)
    }, {
      $push: {
        boardHistory: {
          tiles: array2Dto1D(board)
        }
      }
    }, function(err, result) {
      if (err || (result.nModified === 0)) {
        console.error(err);
        next({ message: 'Database error occured' });
      } else {
        res.send(JSON.stringify({
          success: true
        }));
      }
    });
  });
};
