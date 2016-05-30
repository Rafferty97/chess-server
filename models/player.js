var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var playerSchema = mongoose.Schema({
  isOnline: Boolean,
});

playerSchema.plugin(passportLocalMongoose);

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
