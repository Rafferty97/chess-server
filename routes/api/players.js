var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET /players/ */
router.get('/', function(req, res, next) {
  req.Player.find({}, function (err, players) {
    if (err) return next(err);
    res.send(JSON.stringify({
      players: players
    }));
  });
});

/* GET /players/:playerId */
router.get('/:id', function(req, res, next) {
  req.Player.findOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, player) {
    if (err || (player === null)) return next({
      status: 404, message: 'Player does not exist'
    });
    res.send(JSON.stringify(player));
  });
});

module.exports = router;
