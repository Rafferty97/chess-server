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
    '<script src="/bundle.js"></script>',
    '</body>',
    '</html>',
  ].join('\n');
};
