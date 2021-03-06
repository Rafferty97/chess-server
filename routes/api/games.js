var express = require('express');
var router = express.Router();
var passport = require('passport');
var async = require('async');
var mongodb = require('mongodb');

var INITIAL_BOARD = [
  7, 8, 9, 10, 11, 9, 8, 7,
  6, 6, 6, 6, 6, 6, 6, 6,
  -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1,
  0, 0, 0, 0, 0, 0, 0, 0,
  1, 2, 3, 4, 5, 3, 2, 1
];

/* GET /games/ */
/* Returns all games */
router.get('/', function(req, res, next) {
  req.Game.find({}, function (err, games) {
    if (err) return next(err);
    res.send(JSON.stringify({
      games: games
    }));
  });
});

/* GET /games/:id */
/* Returns the specified games */
router.get('/:id', function(req, res, next) {
  if (!req.user) return next({
    status: 401, message: 'Must be logged in'
  });
  req.Game.findOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, game) {
    if (err || (game === null)) return next({
      status: 404, message: 'Game does not exist'
    });
    var player = '';
    if (game.whitePlayer == req.user.username) player = 'white';
    if (game.blackPlayer == req.user.username) player = 'black';
    if (player === '') return next({
      status: 401, message: 'You are not a player in this game'
    });
    res.send(JSON.stringify({
      whitePlayer: game.whitePlayer,
      blackPlayer: game.blackPlayer,
      board: game.boardHistory.pop().tiles,
      currentTurn: game.currentTurn,
      playerColour: player
    }));
  });
});

/* POST /games/ */
/* Creates a new game request */
router.post('/', function(req, res, next) {
  if (!req.user) return next({
    status: 401, message: 'Not logged in'
  });
  var reqPlayer = req.user.username;
  var otherPlayer = req.body.otherPlayer;
  var game = new req.Game({
    whitePlayer: reqPlayer,
    blackPlayer: otherPlayer,
    whiteAccepted: true,
    blackAccepted: false,
    boardHistory: [
      { tiles: INITIAL_BOARD }
    ],
    currentTurn: 'white'
  });
  if (reqPlayer == otherPlayer) {
    next({
      status: 400,
      message: 'You cannot play against yourself!'
    });
    return;
  }
  async.series([
    function (callback) {
      req.Player.findOne({username: reqPlayer}, function (err, doc) {
        if (doc === null)
          callback('Requesting player does not exist');
        else callback(null);
      });
    },
    function (callback) {
      req.Player.findOne({username: otherPlayer}, function (err, doc) {
        if (doc === null)
          callback('Other player does not exist');
        else callback(null);
      });
    },
    game.save,
  ], function(err, result) {
    if (err) {
      console.error(err);
      next({ status: 400, message: 'MongoDB error: ' + err });
    } else {
      res.send(JSON.stringify({
        success: true
      }));
    }
  });
});

/* POST /games/:id/accept */
/* Accepts a game request */
router.post('/:id/accept', function(req, res, next) {
  var gameId = req.params.id;
  if (!req.user) return next({
    status: 401, message: 'You must be logged in'
  });
  var playerId = req.user.username;
  req.Game.update({
    _id: new mongodb.ObjectID(gameId),
    whiteAccepted: true,
    blackAccepted: false,
    blackPlayer: playerId
  }, {
    $set: {
      blackAccepted: true
    }
  }, function(err, result) {
    if (err || (result.nModified === 0)) {
      console.error(err);
      next({ message: 'Game cannot be accepted' });
    } else {
      res.send(JSON.stringify({
        success: true
      }));
    }
  });
});

router.post('/:id/move', require('./games/move'));

module.exports = router;
