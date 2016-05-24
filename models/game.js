var mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
  tiles: [Number]
});

var gameSchema = mongoose.Schema({
  whitePlayer: String,
  blackPlayer: String,
  whiteAccepted: Boolean,
  blackAccepted: Boolean,
  boardHistory: [boardSchema],
  currentTurn: String
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;
