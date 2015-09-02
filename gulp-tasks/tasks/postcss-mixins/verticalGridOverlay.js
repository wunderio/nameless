/**
 *  Creates a baseline grid based off your $lineHeightRatio to help visualize
 *  your vertical rhythm grid. You can offset the grid by negative or positive
 *  pixels to line it up perfectly with the bottom of your text.
 *
 *  @param {number} $lineHeightRatio - A ratio for the line height that is a
 *  base for the grid.
 *  @param {color} $color [black] - A color to be lightened and used as the
 *  color for the grid.
 *  @param {number} $pxOffset [false] - A positive or negative number of pixels
 *  to offset the grid by. Useful for lining the bottom of the gridlines up with
 *  your text.
 *
 *  @example
 *    @include verticalGridOverlay(1.75, blue, 2);
 */
'use strict';

module.exports = function(mixin, $lineHeightRatio, $pxOffset) {

  return {
    'body': {
      'background': 'linear-gradient(to top, rgba(0, 255, 0, .1) 5%, white 5%)',
      'background-size': '100% ' + $lineHeightRatio + 'em',
      'background-position': ($pxOffset) ? '0 ' + $pxOffset + 'px' : '0% 0%'
    }
  };
};
