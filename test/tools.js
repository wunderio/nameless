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