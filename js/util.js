'use strict';

(function () {
  var MOUSE_LEFT = 0;

  var Key = {
    ESCAPE: 'Escape',
    ENTER: 'Enter'
  };

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (elements) {
    return elements[getRandomInt(0, elements.length - 1)];
  };

  var getRandomPart = function (elements) {
    var benefits = elements.length;
    var begin = getRandomInt(0, benefits - 2);
    var end = getRandomInt(begin + 1, benefits);
    return elements.slice(begin, end);
  };

  window.util = {
    MOUSE_LEFT: MOUSE_LEFT,

    Key: Key,

    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    getRandomPart: getRandomPart
  };
})();
