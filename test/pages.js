var tools = require('./tools.js');

casper
  .thenOpen(phantomcss.baseURL + '')
  .then(function() {
    phantomcss.screenshot('#page', 0, tools.getHiddenElements('page'), 'pages/frontpage');
  })
  .thenOpen(phantomcss.baseURL + '/user')
  .then(function() {
    phantomcss.screenshot('#page', 0, tools.getHiddenElements('page'), 'pages/user');
  })
;