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
  if (req.params.id == 'vfd89') {
    res.send(JSON.stringify({
      id: 'vfd89',
      name: 'Alexander Rafferty',
      isOnline: true
    }));
    return;
  }
  if (req.params.id == 'io3no') {
    res.send(JSON.stringify({
      id: 'io3no',
      name: 'Barack Obama',
      isOnline: false
    }));
    return;
  }
  if (req.params.id == 'vf239') {
    res.send(JSON.stringify({
      id: 'vf239',
      name: 'Hilary Clinton',
      isOnline: true
    }));
    return;
  }
  next({
    message: 'Player does not exist'
  });
});

module.exports = router;
