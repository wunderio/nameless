(function ($) {

  Drupal.behaviors.nameless = {
    attach: function (context, settings) {
      $('body', context).click(function () {
        console.log('Hello world!')
      });
    }
  };

})(jQuery);
