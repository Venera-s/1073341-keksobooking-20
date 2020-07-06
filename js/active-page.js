'use strict';

(function () {
  var MAP_FADED = 'map--faded';

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var activatePage = function () {
    window.main.setAddress(window.map.MAP_PIN_HEIGHT);
    window.main.setEnabled(map, MAP_FADED);
    window.main.setEnabledAdForm();
    toggleStateForm(window.main.elements);
    var allAnnouncements = window.data.getAnnouncements(window.data.ADVERTS_AMOUNT);
    mapPins.appendChild(window.pin.create(allAnnouncements));
    mainPin.removeEventListener('mousedown', onMainPinClick);
    mainPin.removeEventListener('keydown', onMainPinKeyDown);
  };

  var onMainPinClick = function (evt) {
    if (evt.button === window.util.MOUSE_DOWN_LEFT) {
      activatePage();
    }
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.key === window.util.KEY_CODE_ENTER) {
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
