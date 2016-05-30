var express = require('express');
var passport = require('passport');
var router = express.Router();

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

router.post('/register', function (req, res) {
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

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});

module.exports = router;
