var express = require('express');
var router = express.Router();

var gameView = require('../views/game');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Home page...');
});

router.get('/play/', function(req, res, next) {
  res.send(gameView());
});

module.exports = router;
