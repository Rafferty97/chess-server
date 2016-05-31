var express = require('express');
var passport = require('passport');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var Player = require('../models/player');

router.get('/profile', function(req, res) {
  res.render('profile', { user: req.user });
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
      return res.redirect('/profile');
    });
  })(req, res, next);
});

module.exports = router;
