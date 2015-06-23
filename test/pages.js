var tools = require('./tools.js');

casper
  .thenOpen(phantom.rootUrl)
  .then(function() {
    phantomcss.screenshot('.page', 0, tools.getHiddenElements('page'), 'pages/frontpage');

    // Test pages by list
    var pages = [
      'user/login',
      'node'
    ];

    pages.forEach(function(url){
      casper
        .thenOpen(phantom.rootUrl + url)
        .then(function() {
          var title = url.replace(/\//g, '_');
          phantomcss.screenshot('.page', 0, tools.getHiddenElements('pages'), 'pages/' + title);
        });
    });
  })
;
