'use strict';

(function () {
  var MAP_FADED = 'map--faded';
  var MAIN_PIN_HEIGHT = 82;
  var MAIN_PIN_ROUND_HALF_HEIGHT = 31;
  var MAIN_PIN_WIDTH = 65;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var setEnabled = function (enabled) {
    if (enabled) {
      map.classList.remove(MAP_FADED);
    } else {
      map.classList.add(MAP_FADED);
    }
  };

  var renderAdverts = function (adverts) {
    mapPins.appendChild(window.pin.render(adverts));
  };

  var setMainPinClickListener = function (listener) {
    mainPin.addEventListener('click', listener);
  };

  var removeMainPinClickListener = function (listener) {
    mainPin.removeEventListener('click', listener);
  };

  var setMainPinKeyDownListener = function (listener) {
    mainPin.addEventListener('keydown', listener);
  };

  var removeMainPinKeyDownListener = function (listener) {
    mainPin.removeEventListener('keydown', listener);
  };

  window.map = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_ROUND_HALF_HEIGHT: MAIN_PIN_ROUND_HALF_HEIGHT,

    setEnabled: setEnabled,
    renderAdverts: renderAdverts,

    setMainPinClickListener: setMainPinClickListener,
    removeMainPinClickListener: removeMainPinClickListener,

    setMainPinKeyDownListener: setMainPinKeyDownListener,
    removeMainPinKeyDownListener: removeMainPinKeyDownListener,

  };
})();
