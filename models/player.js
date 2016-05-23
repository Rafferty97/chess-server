var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
  name: String,
  isOnline: Boolean
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
