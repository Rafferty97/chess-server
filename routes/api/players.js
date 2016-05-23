var express = require('express');
var router = express.Router();

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
  req.Player.find({_id: req.params.id}, function (err, players) {
    if (err) return next(err);
    res.send(JSON.stringify(players[0]));
  });
  /*next({
    message: 'Player does not exist'
  });*/
});

module.exports = router;
