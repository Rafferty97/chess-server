var mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  whitePlayer: String,
  blackPlayer: String,
  whiteAccepted: Boolean,
  blackAccepted: Boolean,
  turnNumber: Number
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;
