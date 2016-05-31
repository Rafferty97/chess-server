var express = require('express');
var passport = require('passport');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var Player = require('../models/player');

router.get('/profile', function(req, res) {
  res.render('profile', { user: req.user });
});

router.get('/index', function(req, res) {
  res.render('index');
});

router.get('/lobby', function(req, res) {
  res.render('lobby');
});

router.get('/controls/player', function(req, res) {
  res.render('controls/player', {userID: 'hello'});
});
router.get('/controls/playing', function(req, res) {
  res.render('controls/playing');
});
router.get('/controls/requested', function(req, res) {
  res.render('controls/requested');
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

router.get('/play/:id', function(req, res) {
  if (!req.user) {
    res.redirect('/');
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
    res.redirect('/');
  })(req, res, next);
});

module.exports = router;
