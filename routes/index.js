var express = require('express');
var passport = require('passport');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var Player = require('../models/player');
var gameView = require('../views/game');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Home page...');
});

router.get('/play/:id', function(req, res) {
  res.send(gameView({
    gameId: req.params.id
  }));
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
  var page = fs.createReadStream(path.join(__dirname, '../views/login.html'));
  page.pipe(res);
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) return next(err);
    if (!user) {
      var page = fs.createReadStream(path.join(__dirname, '../views/login.html'));
      page.pipe(res);
      return;
    }
    res.redirect('/');
  })(req, res, next);
});

module.exports = router;
