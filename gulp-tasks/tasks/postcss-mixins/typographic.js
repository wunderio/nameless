// PostCss adaptation of
// Typographic v2.9.2 - https://github.com/corysimmons/typographic
'use strict';
/*jshint unused:false*/
module.exports = function(mixin, lineHeightRatio, headerRatio, bodyFont, bodyFontWeight, bodyColor, headerFont, headerFontWeight, headerColor, minFont, maxFont, minWidth, maxWidth, verticalRhythm) {

  // Ratios
  var $minorSecond = 1.067;
  var $majorSecond = 1.125;
  var $minorThird = 1.2;
  var $majorThird = 1.25;
  var $perfectFourth = 1.333;
  var $augFourth = 1.414;
  var $perfectFifth = 1.5;
  var $minorSixth = 1.6;
  var $golden = 1.618;
  var $majorSixth = 1.667;
  var $minorSeventh = 1.778;
  var $majorSeventh = 1.875;
  var $octave = 2;
  var $majorTenth = 2.5;
  var $majorEleventh = 2.667;
  var $majorTwelfth = 3;
  var $doubleOctave = 4;

  // Sans-serif
  var $calibri = '"Calibri", "Candara", "Segoe", "Segoe UI", "Optima", "Arial", "sans-serif"';
  var $candara = '"Candara", "Calibri", "Segoe", "Segoe UI", "Optima", "Arial", "sans-serif"';
  var $courier = '"Courier New", "Courier", "Lucida Sans Typewriter", "Lucida Typewriter", "monospace"';
  var $franklin = '"Franklin Gothic Medium", "Arial", "sans-serif"';
  var $futura = '"Futura", "Trebuchet MS", "Arial", "sans-serif"';
  var $geneva = '"Geneva", "Tahoma", "Verdana", "sans-serif"';
  var $gillSans = '"Gill Sans", "Gill Sans MT", "Calibri", "sans-serif"';
  var $helvetica = '"Helvetica Neue", "Helvetica", "Arial", "sans-serif"';
  var $lucidaGrande = '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "Geneva", "Verdana", "sans-serif"';
  var $optima = '"Optima", "Segoe", "Segoe UI", "Candara", "Calibri", "Arial", "sans-serif"';
  var $segoe = '"Segoe", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"';
  var $tahoma = '"Tahoma", "Geneva", "Verdana", "sans-serif"';
  var $trebuchet = '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "Tahoma", "sans-serif"';
  var $verdana = '"Verdana", "Geneva", "sans-serif"';


  // Serif
  var $antiqua = '"Book Antiqua", "Palatino", "Palatino Linotype", "Palatino LT STD", "Georgia", "serif"';
  var $baskerville = '"Baskerville", "Baskerville old face", "Hoefler Text", "Garamond", "Times New Roman", "serif"';
  var $bodoni = '"Bodoni MT", "Didot", "Didot LT STD", "Hoefler Text", "Garamond", "Times New Roman", "serif"';
  var $cambria = '"Cambria", "Georgia", "serif"';
  var $caslon = '"Big Caslon", "Book Antiqua", "Palatino Linotype", "Georgia", "serif"';
  var $constantia = '"Constantia", "Palatino", "Palatino Linotype", "Palatino LT STD", "Georgia", "serif"';
  var $didot = '"Didot", "Didot LT STD", "Hoefler Text", "Garamond", "Times New Roman", "serif"';
  var $garamond = '"Garamond", "Baskerville", "Baskerville Old Face", "Hoefler Text", "Times New Roman", "serif"';
  var $goudy = '"Goudy Old Style", "Garamond", "Big Caslon", "Times New Roman", "serif"';
  var $hoefler = '"Hoefler Text", "Baskerville old face", "Garamond", "Times New Roman", "serif"';
  var $lucidaBright = '"Lucida Bright", "Georgia", "serif"';
  var $palatino = '"Palatino", "Palatino Linotype", "Palatino LT STD", "Book Antiqua", "Georgia", "serif"';

  // Settings
  var $lineHeightRatio = (lineHeightRatio !== 'null') ? parseInt(lineHeightRatio, 10) : 1.75;
  var $headerRatio = (headerRatio !== 'null') ? headerRatio : $golden;
  var $bodyFont = (bodyFont !== 'null') ? bodyFont : $helvetica;
  var $bodyFontWeight = (bodyFontWeight !== 'null') ? bodyFontWeight : '300';
  var $bodyColor = (bodyColor !== 'null') ? bodyColor : '#666';
  var $headerFont = (headerFont !== 'null') ? headerFont : $helvetica;
  var $headerFontWeight = (headerFontWeight !== 'null') ? headerFontWeight : '500';
  var $headerColor = (headerColor !== 'null') ? headerColor : '#111';
  var $minFont = (minFont !== 'null') ? minFont : '12px';
  var $maxFont = (maxFont !== 'null') ? maxFont : '20px';
  var $minWidth = (minWidth !== 'null') ? minWidth : '600px';
  var $maxWidth = (maxWidth !== 'null') ? maxWidth : '1140px';
  var $verticalRhythm = (verticalRhythm === 'false') ? false : true;
  /*  var $lineHeightRatio = 1.75;
   var $headerRatio = $golden;
   var $bodyFont = $helvetica;
   var $bodyFontWeight = '300';
   var $bodyColor = '#666';
   var $headerFont = $helvetica;
   var $headerFontWeight = '500';
   var $headerColor = '#111';
   var $minFont = '12px';
   var $maxFont = '20px';
   var $minWidth = '600px';
   var $maxWidth = '1140px';
   var $verticalRhythm = true;*/

  // Helpers

  /// A function to remove the unit from a number.
  ///
  /// @param {unit} $unit - A unit with a unit value.
  ///
  /// @example
  ///   _stripUnits(1px)
  ///
  /// @access private

  var _stripUnits = function(unit) {
    var stripped = unit.replace(/px|em|%|vm|vh|rem/gi, '');
    return parseInt(stripped, 10);
  };
  var _getUnits = function(unit) {
    var units = unit.match(/px|em|%|vm|vh|rem/gi);
    return units[0];
  };

/// Returns a "vertical unit". Useful for specifying the height and margins of non-text elements like images and such.
///
/// @param {number} $units [1] - Number of units. Accepts floated numbers as well.
/// @param {number} $pxOffset [false] - A positive or negative number of pixels to offset the grid by. Useful for lining the bottom of the gridlines up with your text. Since this doesn't compute a literal pixel you may need to use a floated number (multiples of .25 work well) to keep your rhythm on track.
///
/// @example
///   img {
///     height: vrBlock(5.25);
///     margin-bottom: vrBlock(0.25);
///   }

  var vrBlock = function(units, pxOffset) {
    var $units = units || 1,
      $pxOffset = pxOffset || false;

    if ($pxOffset) {
      return ( (($lineHeightRatio * _stripUnits($maxFont)) / (_stripUnits($maxFont) / 2)) * ($units / 2) * (1 + ($pxOffset / _stripUnits($maxFont))) ) + 'em';
    } else {
      return ( (($lineHeightRatio * _stripUnits($maxFont)) / (_stripUnits($maxFont) / 2)) * ($units / 2) ) + 'em';
    }
  };


/// Performs exponent math on floated numbers.
///
/// @example
///   mathPow(3, 3)
///
/// @access private

  var mathPow = function($number, $exp) {
    var $value = Math.pow($number, $exp);
    return $value;
  };


// Typography Mixins

  var tHtml = function() {
    var rules = {
      'font-family': $bodyFont,
      'font-weight': $bodyFontWeight,
      'color': $bodyColor,

      'font-size': $minFont,
      'line-height': $lineHeightRatio + 'em'
    };

    rules['@media (min-width: ' + $minWidth + ')'] = {
      'font-size': 'calc( ' + $minFont + ' + (' + _stripUnits($maxFont) + ' - ' + _stripUnits($minFont) + ') * ((100vw - ' + $minWidth + ') / (' + _stripUnits($maxWidth) + ' - ' + _stripUnits($minWidth) + ')) )'
    };

    rules['@media (min-width: ' + $maxWidth + ')'] = {
      'font-size': $maxFont
    };

    return rules;
  };

  function tP() {
    return tHtml();
  }

  function tReset() {
    return {
      'margin': '0',
      'padding': '0'
    };
  }

  function tBlock() {
    return {
      'margin-bottom': $lineHeightRatio + 'em'
    };
  }

  function tHeader() {
    return {
      'font-family': $headerFont,
      'font-weight': $headerFontWeight,
      'color': $headerColor,
      'clear': 'both'
    };
  }

  function tH1() {
    var $localMinFont = _stripUnits($minFont) * (mathPow($headerRatio, 1.75)),
      $localMaxFont = _stripUnits($maxFont) * (mathPow($headerRatio, 1.75));

    var rules = {
      'font-size': $localMinFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['margin-top'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.25)) + 'em';
      rules['line-height'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.5)) + 'em';
      rules['margin-bottom'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 0.25)) + 'em';
    } else {
      rules['margin-top'] = 0;
      rules['line-height'] = 1.1 + 'em';
      rules['margin-bottom'] = 0.25 + 'em';
    }

    rules['@media (min-width:' + $minWidth + ')'] = {
      'font-size': 'calc( ' + $localMinFont + _getUnits($minFont) + ' + (' + $localMaxFont + ' - ' + $localMinFont + ') * ((100vw - ' + $minWidth + ') / (' + _stripUnits($maxWidth) + ' - ' + _stripUnits($minWidth) + ')) )'
    };

    rules['@media (min-width:' + $maxWidth + ')'] = {
      'font-size': $localMaxFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['@media (min-width:' + $maxWidth + ')']['margin-top'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.25)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['line-height'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.5)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['margin-bottom'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 0.25)) + 'em';
    }

    return rules;
  }

  function tH2() {
    var $localMinFont = _stripUnits($minFont) * (mathPow($headerRatio, 1.4)),
      $localMaxFont = _stripUnits($maxFont) * (mathPow($headerRatio, 1.4));

    var rules = {
      'font-size': $localMinFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['margin-top'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.25)) + 'em';
      rules['line-height'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.5)) + 'em';
      rules['margin-bottom'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 0.25) * (1 + (3 / $localMinFont))) + 'em';
    } else {
      rules['margin-top'] = 0;
      rules['line-height'] = 1.2 + 'em';
      rules['margin-bottom'] = 0.25 + 'em';
    }
    rules['@media (min-width:' + $minWidth + ')'] = {
      'font-size': 'calc( ' + $localMinFont + _getUnits($minFont) + ' + (' + $localMaxFont + ' - ' + $localMinFont + ') * ((100vw - ' + $minWidth + ') / (' + _stripUnits($maxWidth) + ' - ' + _stripUnits($minWidth) + ')) )'
    };

    rules['@media (min-width:' + $maxWidth + ')'] = {
      'font-size': $localMaxFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['@media (min-width:' + $maxWidth + ')']['margin-top'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.25)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['line-height'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.5)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['margin-bottom'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 0.25) * (1 + (3 / $localMaxFont))) + 'em';
    }

    return rules;
  }

  function tH3() {
    var $localMinFont = _stripUnits($minFont) * (mathPow($headerRatio, 1.05)),
      $localMaxFont = _stripUnits($maxFont) * (mathPow($headerRatio, 1.05));

    var rules = {
      'font-size': $localMinFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['margin-top'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.25)) + 'em';
      rules['line-height'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.5)) + 'em';
      rules['margin-bottom'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 0.25) * (1 + (3 / $localMinFont))) + 'em';
    } else {
      rules['margin-top'] = 0;
      rules['line-height'] = 1.3 + 'em';
      rules['margin-bottom'] = 0.25 + 'em';
    }
    rules['@media (min-width:' + $minWidth + ')'] = {
      'font-size': 'calc( ' + $localMinFont + _getUnits($minFont) + ' + (' + $localMaxFont + ' - ' + $localMinFont + ') * ((100vw - ' + $minWidth + ') / (' + _stripUnits($maxWidth) + ' - ' + _stripUnits($minWidth) + ')) )'
    };

    rules['@media (min-width:' + $maxWidth + ')'] = {
      'font-size': $localMaxFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['@media (min-width:' + $maxWidth + ')']['margin-top'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.25)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['line-height'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.5)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['margin-bottom'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 0.25) * (1 + (3 / $localMaxFont))) + 'em';
    }

    return rules;
  }

  function tH4() {
    var $localMinFont = _stripUnits($minFont) * (mathPow($headerRatio, 0.7)),
      $localMaxFont = _stripUnits($maxFont) * (mathPow($headerRatio, 0.7));

    var rules = {
      'font-size': $localMinFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['margin-top'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.25)) + 'em';
      rules['line-height'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.5)) + 'em';
      rules['margin-bottom'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 0.25) * (1 + (3 / $localMinFont))) + 'em';
    } else {
      rules['margin-top'] = 0;
      rules['line-height'] = 1.4 + 'em';
      rules['margin-bottom'] = 0.25 + 'em';
    }
    rules['@media (min-width:' + $minWidth + ')'] = {
      'font-size': 'calc( ' + $localMinFont + _getUnits($minFont) + ' + (' + $localMaxFont + ' - ' + $localMinFont + ') * ((100vw - ' + $minWidth + ') / (' + _stripUnits($maxWidth) + ' - ' + _stripUnits($minWidth) + ')) )'
    };

    rules['@media (min-width:' + $maxWidth + ')'] = {
      'font-size': $localMaxFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['@media (min-width:' + $maxWidth + ')']['margin-top'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.25)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['line-height'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.5)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['margin-bottom'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 0.25) * (1 + (3 / $localMaxFont))) + 'em';
    }
    return rules;
  }

  function tH5() {
    var $localMinFont = _stripUnits($minFont) * (mathPow($headerRatio, 0.35)),
      $localMaxFont = _stripUnits($maxFont) * (mathPow($headerRatio, 0.35));

    var rules = {
      'font-size': $localMinFont + _getUnits($minFont)
    };
    if ($verticalRhythm) {
      rules['margin-top'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.25)) + 'em';
      rules['line-height'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.5)) + 'em';
      rules['margin-bottom'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 0.25)) + 'em';
    } else {
      rules['margin-top'] = 0;
      rules['line-height'] = 1.5 + 'em';
      rules['margin-bottom'] = 0.25 + 'em';
    }
    rules['@media (min-width:' + $minWidth + ')'] = {
      'font-size': 'calc( ' + $localMinFont + _getUnits($minFont) + ' + (' + $localMaxFont + ' - ' + $localMinFont + ') * ((100vw - ' + $minWidth + ') / (' + _stripUnits($maxWidth) + ' - ' + _stripUnits($minWidth) + ')) )'
    };

    rules['@media (min-width:' + $maxWidth + ')'] = {
      'font-size': $localMaxFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['@media (min-width:' + $maxWidth + ')']['margin-top'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.25)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['line-height'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.5)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['margin-bottom'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 0.25)) + 'em';
    }

    return rules;
  }

  function tH6() {
    var $localMinFont = _stripUnits($minFont);
    var $localMaxFont = _stripUnits($maxFont);
    var rules = {
      'font-size': $localMinFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['margin-top'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.25)) + 'em';
      rules['line-height'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 1.5)) + 'em';
      rules['margin-bottom'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 0.25) * (1 + (2 / $localMinFont))) + 'em';
    } else {
      rules['margin-top'] = 0;
      rules['line-height'] = 1.6 + 'em';
      rules['margin-bottom'] = 0.25 + 'em';
    }

    rules['@media (min-width:' + $minWidth + ')'] = {
      'font-size': 'calc( ' + $localMinFont + _getUnits($minFont) + ' + (' + $localMaxFont + ' - ' + $localMinFont + ') * ((100vw - ' + $minWidth + ') / (' + _stripUnits($maxWidth) + ' - ' + _stripUnits($minWidth) + ')) )'
    };

    rules['@media (min-width:' + $maxWidth + ')'] = {
      'font-size': $localMaxFont + _getUnits($minFont)
    };

    if ($verticalRhythm) {
      rules['@media (min-width:' + $maxWidth + ')']['margin-top'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.25)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['line-height'] = (($lineHeightRatio * _stripUnits($maxFont)) / ($localMaxFont / 1.5)) + 'em';
      rules['@media (min-width:' + $maxWidth + ')']['margin-bottom'] = (($lineHeightRatio * _stripUnits($minFont)) / ($localMinFont / 0.25) * (1 + (1 / $localMinFont))) + 'em';
    }

    return rules;
  }

  function tBlockquote() {
    return {
      'font-style': 'italic',
      'cite': {
        'display': 'block',
        'font-style': 'normal'
      }
    };
  }

  function tPre() {
    return {
      'padding': ($lineHeightRatio * 0.5) + 'em',
      'margin-bottom': vrBlock(1),
      'code': {
        'padding': '0'
      }
    };
  }

  function tCode() {
    return {
      'font-family': $courier,
      'padding': ($lineHeightRatio * 0.05) + 'em' + ' ' + ($lineHeightRatio * 0.15) + 'em',
      'line-height': '0'
    };
  }

  function tAbbr() {
    return {
      'border-bottom': '1px dotted currentColor',
      'cursor': 'help'
    };
  }

  function tDt() {
    return {
      'color': $headerColor,
      'font-weight': 'bold'
    };
  }

  function tFieldset() {
    var rules = {
      'padding': vrBlock(0.5) + ' ' + vrBlock() + ' ' + vrBlock(),
      'border-width': '1px',
      'border-style': 'solid',
      'max-width': '100%',
      'margin-bottom': vrBlock(1, 1)
    };

    rules['@media (min-width: ' + $maxWidth + ')'] = {
      'margin-bottom': vrBlock(1.25, -1),
      'button, input[type="submit"]': {
        'margin-bottom': '0'
      }
    };
    return rules;
  }

  function tLegend() {
    return {
      'color': $headerColor,
      'font-weight': 'bold'
    };
  }

  function tInput() {
    var $localMinFont = $minFont;
    var $localMaxFont = $maxFont;

    var rules = {
      'display': 'block',
      'max-width': '100%',
      'padding': vrBlock(0.25),

      'font-size': $localMinFont,
      'margin-bottom': vrBlock(0.5, 7)
    };

    rules['@media (min-width: ' + $minWidth + ')'] = {
      'font-size': 'calc( ' + $localMinFont + ' + (' + _stripUnits($localMaxFont) + ' - ' + _stripUnits($localMinFont) + ') * ((100vw - ' + $minWidth + ') / (' + _stripUnits($maxWidth) + ' - ' + _stripUnits($minWidth) + ')) )'
    };

    rules['@media (min-width: ' + $maxWidth + ')'] = {
      'font-size': $localMaxFont,
      'margin-bottom': vrBlock(0.25, 3.5)
    };
    return rules;
  }

  function tButton() {
    var $localMinFont = $minFont;
    var $localMaxFont = $maxFont;

    var rules = {
      'display': 'block',
      'cursor': 'pointer',

      'font-size': $localMinFont,
      'padding': vrBlock(0.25) + ' ' + vrBlock(),
      'margin-bottom': vrBlock(0.75, -2)
    };

    rules['@media (min-width: ' + $minWidth + ')'] = {
      'font-size': 'calc( ' + $localMinFont + ' + (' + _stripUnits($localMaxFont) + ' - ' + _stripUnits($localMinFont) + ') * ((100vw - ' + $minWidth + ') / (' + _stripUnits($maxWidth) + ' - ' + _stripUnits($minWidth) + ')) )'
    };

    rules['@media (min-width: ' + $maxWidth + ')'] = {
      'font-size': $localMaxFont,
      'margin-bottom': vrBlock(0.75)
    };
    return rules;
  }

  function tLabel() {
    return {
      'display': 'block',
      'padding-bottom': vrBlock(0.125),
      'margin-bottom': vrBlock(-0.25, -10)
    };
  }

  function tTable() {
    var rules = {
      'width': '100%',
      'border-spacing': '0',
      'border-collapse': 'collapse',
      'margin-bottom': vrBlock(1, 5)
    };
    rules['@media (min-width: ' + $maxWidth + ')'] = {
      'margin-bottom': vrBlock(1, 3)
    };
    return rules;
  }

  function tTh() {
    var rules = {
      'text-align': 'left',
      'color': $headerColor,

      'padding': vrBlock(0.125) + ' ' + vrBlock(0.5)
    };

    rules['@media (min-width: ' + $maxWidth + ')'] = {
      'padding': vrBlock(0.25) + ' ' + vrBlock(0.5)
    };
    return rules;
  }

  function tTd() {
    var rules = {
      'padding': vrBlock(0.125) + ' ' + vrBlock(0.5)
    };

    rules['@media (min-width: ' + $maxWidth + ')'] = {
      'padding': vrBlock(0.25) + ' ' + vrBlock(0.5)
    };
    return rules;
  }


  /// The Typographic Reset. This is where Typographic goes through every markup
  // element and styles it to adhere to a vertical rhythm. After you set your
  // variables in a settings file fire this mixin.
  ///
  /// @example
  ///   @mixin typographic;

  return {
    'html': tHtml(),

    'h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td': tReset(),

    'p, blockquote, pre, address, dl, ol, ul, table': tBlock(),

    'h1, h2, h3, h4, h5, h6': tHeader(),

    'h1, .alpha': tH1(),

    'h2, .beta': tH2(),

    'h3, .gamma': tH3(),

    'h4, .delta': tH4(),

    'h5, .epsilon': tH5(),

    'h6, .zeta': tH6(),

    'blockquote': tBlockquote(),

    'pre': tPre(),

    'code': tCode(),

    'big, small, sub, sup': {
      'line-height': '0'
    },

    'abbr, acronym': tAbbr(),

    'address': {
      'font-style': 'normal'
    },

    'dt': tDt(),

    'ul': {
      'padding-left': '1.1em'
    },

    'ol': {
      'padding-left': '1.4em'
    },

    'fieldset': tFieldset(),

    'legend': tLegend(),

    'input[type="text"], input[type="email"], input[type="password"], textarea': tInput(),

    'input[type="submit"], button': tButton(),

    'label': tLabel(),

    'table': tTable(),

    'th': tTh(),

    'td': tTd(),

    '.trailer-100': {
      'margin-bottom': vrBlock()
    },

    '.trailer-75': {
      'margin-bottom': vrBlock(0.75)
    },

    '.trailer-50': {
      'margin-bottom': vrBlock(0.5)
    },

    '.trailer-25': {
      'margin-bottom': vrBlock(0.25)
    }

  };
};
