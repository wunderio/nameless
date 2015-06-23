module.exports = {
  /**
   * Loops through a view with pager until it finds a node with a given selector.
   * @param selector css selector for node in view
   */
  searchNodeInView: function (selector) {
    console.log('\nStart search for the following selector: ' + selector);
    (function search() {
      var pager = '#content .view li.pager-next a';

      if (casper.exists(selector)) {
        console.log('Element found.');
      } else {
        if (casper.exists(pager)) {
          // Continue searching
          casper
            .thenClick(pager)
            .then(function(){
              console.log('Loading next page...');
              search(selector);
            });
        } else {
          // No more pages
          console.log('Could not find selector "' + selector + '" on any page of the view');
        }
      }
    })();
  },
  /**
   * Takes a screenshot of every vertical tab. Very useful to test admin interfaces.
   * @todo create another function to test horizontal and vertical tabs created by field groups.
   */
  testVerticalTabs: function (pageName) {
    var selector = '.vertical-tabs ul.vertical-tabs-list',
        numTabs = 0,
        tools = this;

    casper.waitForSelector(selector, function then() {

      numTabs = casper.evaluate(function(sel) {
        return document.querySelectorAll(sel + ' li').length;
      }, selector);

      if (numTabs > 1) {
        var tabs = [];
        for (var i = 1; i <= numTabs; i++) {
          tabs.push(i);
        }
        tabs.forEach(function(tab) {
          casper.thenClick(selector + ' li:nth-child(' + tab + ') a')
          .then(function() {
            phantomcss.screenshot('ul.vertical-tabs-list + div.vertical-tabs-panes', 0, tools.getHiddenElements('logged-in'), 'loggedIn/admin/' + pageName + '.vertical-tabs#' + tab);
          });
        });
      }
    }, function onTimeout() {
      casper.log('Cannot find any vertical tabs.', 'warning');
    }, 3000);
  },
  getHiddenElements: function (type) {
    var hidden = '';
    switch (type) {
      case 'page':
      case 'logged-in':
      case 'node':
        hidden += '.random-content';
    }
    return hidden;
  }
};
