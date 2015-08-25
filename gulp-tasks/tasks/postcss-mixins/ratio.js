// Calculate the ratio between two values and return it in em
// Good replacement for the adjust-font-size() function.
'use strict';

module.exports = function($prop, $size, $baseSize) {
  return {
    $prop: $size / $baseSize + 'em'
  };
};
