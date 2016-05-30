import request from 'superagent';

export function fetchGameState(gameId, callback)
{
  request
    .get('/api/games/' + gameId)
    .end(function (err, res) {
      if (err) return callback(err);
      try {
        const result = JSON.parse(res.text);
        callback(null, result);
      }
      catch (e) {
        callback('Could not parse JSON');
      }
    });
}
