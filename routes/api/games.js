var express = require('express');
var router = express.Router();
var async = require('async');
var mongodb = require('mongodb');

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

/* POST /games/ */
/* Creates a new game request */
router.post('/', function(req, res, next) {
  var reqPlayer = req.body.requestingPlayer;
  var otherPlayer = req.body.otherPlayer;
  var game = new req.Game({
    whitePlayer: new mongodb.ObjectID(reqPlayer),
    blackPlayer: new mongodb.ObjectID(otherPlayer),
    whiteAccepted: true,
    blackAccepted: false,
    turnNumber: 0
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
      req.Player.findOne({_id: new mongodb.ObjectID(reqPlayer)}, function (err, doc) {
        if (doc === null)
          callback('Requesting player does not exist');
        else callback(null);
      });
    },
    function (callback) {
      req.Player.findOne({_id: new mongodb.ObjectID(otherPlayer)}, function (err, doc) {
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
  var playerId = req.body.playerId;
  req.Game.update({
    _id: new mongodb.ObjectID(gameId),
    whiteAccepted: true,
    blackAccepted: false,
    blackPlayer: new mongodb.ObjectID(playerId)
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

module.exports = router;
