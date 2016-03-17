(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.nameless = {
    attach: function (context) {
      $('body', context).click(function () {
        // console.log('Hello world!');
      });
    }
  };

})(jQuery, Drupal);
