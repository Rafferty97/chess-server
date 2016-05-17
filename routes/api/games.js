var express = require('express');
var router = express.Router();

/* GET /games/ */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify({
    games: [
      {
        id: '34nkj',
        players: ['vfd89', 'io3no'],
        isActive: true
      }
    ]
  }));
});

/* GET /games/:id */
router.get('/:id', function(req, res, next) {
  if (req.params.id == '34nkj') {
    res.send(JSON.stringify({
      id: '34nkj',
      players: ['vfd89', 'io3no'],
      isActive: true,
      state: {
        board: {},
        turn: 'vfd89'
      },
      messages: [
        {
          id: '00000',
          from: 'vfd89',
          body: 'Hey you!'
        }
      ]
    }));
    return;
  }
  next({
    message: 'Game does not exist'
  });
});

module.exports = router;
