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

export function postMove(gameId, x1, y1, x2, y2, callback)
{
  request
    .post('/api/games/' + gameId + '/move')
    .type('form')
    .send({ fromx: x1, fromy: y1, tox: x2, toy: y2 })
    .end(function (err, res) {
      if (err) {
        console.error(res);
        return callback(err);
      }
      callback();
    });
}
