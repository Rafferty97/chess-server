module.exports = function(locals) {
  return [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '<title>The Game</title>',
    '<link rel="stylesheet" type="text/css" href="/main-css.css" />',
    '</head>',
    '<body>',
    '<div id="app"></div>',
    '<script src="https://fb.me/react-15.0.2.min.js"></script>',
    '<script src="https://fb.me/react-dom-15.0.2.min.js"></script>',
    '<script src="/game-logic.js"></script>',
    '</body>',
    '</html>',
  ].join('\n');
};
