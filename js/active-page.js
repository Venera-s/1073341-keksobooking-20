'use strict';

(function () {
  var MAP_FADED = 'map--faded';

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var activatePage = function () {
    window.main.setAddress(window.map.pinHeight);
    window.main.setEnabled(map, MAP_FADED);
    window.main.setEnabledAdForm();
    toggleStateForm(window.main.elements);
    var allAnnouncements = window.data.getAnnouncements(window.data.advertsAmount);
    mapPins.appendChild(window.pin.create(allAnnouncements));
    mainPin.removeEventListener('mousedown', onMainPinClick);
    mainPin.removeEventListener('keydown', onMainPinKeyDown);
  };

  var onMainPinClick = function (evt) {
    if (evt.button === window.util.mouseDownLeft) {
      activatePage();
    }
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.key === window.util.keyCodeEnter) {
      activatePage();
    }
  };

  var toggleStateForm = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].toggleAttribute('disabled');
    }
  };

  toggleStateForm(window.main.elements);

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinKeyDown);

})();
