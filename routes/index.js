var express = require('express');
var passport = require('passport');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var Player = require('../models/player');

router.get('/', function(req, res) {
  if (!req.user) {
    res.render('index', {
      username: req.user ? req.user.username : 'Not logged in',
      activeGames: [],
      pendingGames: [],
      invitedGames: []
    });
  } else {
    req.Game.find({
      $or: [
        { whitePlayer: req.user._id },
        { blackPlayer: req.user._id }
      ]
    }, { _id: 1, whitePlayer: 1, blackPlayer: 1, blackAccepted: 1, whiteAccepted: 1 }, function (err, games) {
      var activeGames = [], pendingGames = [], invitedGames = [];
      for (var i=0; i<games.length; i++) {
        var g = games[i];
        var playerAccepted = (g.whitePlayer == req.user._id) ? g.whiteAccepted : g.blackAccepted;
        var otherAccepted = (g.blackPlayer == req.user._id) ? g.whiteAccepted : g.blackAccepted;
        if (playerAccepted && otherAccepted) {
          activeGames.push({
            _id: g._id,
            otherPlayer: (g.whitePlayer == req.user._id) ? g.blackPlayer : g.whitePlayer
          });
        }
        else if (playerAccepted) {
          pendingGames.push({
            _id: g._id,
            otherPlayer: (g.whitePlayer == req.user._id) ? g.blackPlayer : g.whitePlayer
          });
        } else {
          invitedGames.push({
            _id: g._id,
            otherPlayer: (g.whitePlayer == req.user._id) ? g.blackPlayer : g.whitePlayer
          });
        }
      }
      res.render('index', {
        username: req.user ? req.user.username : 'Not logged in',
        activeGames: activeGames,
        pendingGames: pendingGames,
        invitedGames: invitedGames
      });
    });
  }
});
/*router.get('/lobby', function(req, res) {
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
});*/

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
