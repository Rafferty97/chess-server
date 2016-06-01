var express = require('express');
var passport = require('passport');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var async = require('async');
var mongodb = require('mongodb');

var Player = require('../models/player');

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

router.get('/', function(req, res) {
  if (!req.user) {
    res.render('index', {
      username: req.user ? req.user.username : 'Not logged in',
      activeGames: [],
      pendingGames: [],
      invitedGames: [],
      loggedin: false
    });
  } else {
    req.Game.find({
      $or: [
        { whitePlayer: req.user.username },
        { blackPlayer: req.user.username }
      ]
    }, { _id: 1, whitePlayer: 1, blackPlayer: 1, blackAccepted: 1, whiteAccepted: 1 }, function (err, games) {
      var activeGames = [], pendingGames = [], invitedGames = [];
      for (var i=0; i<games.length; i++) {
        var g = games[i];
        var playerAccepted = (g.whitePlayer == req.user.username) ? g.whiteAccepted : g.blackAccepted;
        var otherAccepted = (g.blackPlayer == req.user.username) ? g.whiteAccepted : g.blackAccepted;
        if (playerAccepted && otherAccepted) {
          activeGames.push({
            _id: g._id,
            otherPlayer: (g.whitePlayer == req.user.username) ? g.blackPlayer : g.whitePlayer
          });
        }
        else if (playerAccepted) {
          pendingGames.push({
            _id: g._id,
            otherPlayer: (g.whitePlayer == req.user.username) ? g.blackPlayer : g.whitePlayer
          });
        } else {
          invitedGames.push({
            _id: g._id,
            otherPlayer: (g.whitePlayer == req.user.username) ? g.blackPlayer : g.whitePlayer
          });
        }
      }
      res.render('index', {
        username: req.user ? req.user.username : 'Not logged in',
        activeGames: activeGames,
        pendingGames: pendingGames,
        invitedGames: invitedGames,
        loggedin: true
      });
    });
  }
});

router.get('/lobby', function(req, res) {
  res.render('lobby');
});
router.get('/testing', function(req, res) {
  res.render('testing');
});
router.get('/about', function(req, res) {
  res.render('about');
});
router.get('/aboutus', function(req, res) {
  res.render('aboutus');
});
router.get('/design', function(req, res) {
  res.render('design');
});
router.get('/howto', function(req, res) {
  res.render('howto');
});

/* POST /request-game/:otherPlayer */
/* Creates a new game request */
router.post('/request-game', function(req, res, next) {
  if (!req.user) {return next({
    status: 401, message: 'Not logged in'
  });}
  var reqPlayer = req.user.username;
  var otherPlayer = req.body.otherPlayer;
  console.log(reqPlayer, otherPlayer);
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
      res.redirect('/');
    }
  });
});

/* POST /accept-game/:id */
/* Accepts a game request */
router.get('/accept-game/:id', function(req, res, next) {
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
      res.redirect('/');
    }
  });
});

router.get('/play/:id', function(req, res) {
  if (!req.user) {
    res.redirect('/login');
    return;
  }
  res.render('game', {
    data: { gameId: req.params.id }
  });
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  Player.register(
    new Player({ username: req.body.username }),
    req.body.password,
    function (err, account) {
      if (err) {
        res.status(400).end('Could not register');
      } else {
        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
      }
    }
  );
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) return next(err);
    if (!user) {
      res.render('login', { error: 'The username and password did not match' });
      return;
    }
    req.logIn(user, function(err) {
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
