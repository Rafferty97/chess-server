var mongoose = require('mongoose');

module.exports = function ()
{
  mongoose.connect('mongodb://localhost/local');

  var db = mongoose.connection;

  db.on('error', function (err) {
    console.error('DB connection error:' + err);
    process.exit();
  });

  db.once('open', function() {
    console.log('Connected to MongoDB');
  });

  return function (req, res, next) {
    req.mongo = db;
    req.Player = require('./models/player');
    req.Game = require('./models/game');
    next();
  };
};
