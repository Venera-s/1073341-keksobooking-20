'use strict';

(function () {
  var formElements = document.querySelectorAll('form input, form select, form textarea, .ad-form__submit');
  var MOUSE_DOWN_LEFT = 0;
  var KEY_CODE_ENTER = 'Enter';
  var ADVERTS_AMOUNT = 8;
  var MAP_PIN_HEIGHT = 82;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPin = document.querySelector('.map__pin--main');

  var activatePage = function () {
    window.form.setAddress(MAP_PIN_HEIGHT);
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    disableForm(formElements);
    var allAnnouncements = window.data.getAnnouncements(ADVERTS_AMOUNT);
    mapPins.appendChild(window.pin.create(allAnnouncements));
    mapPin.removeEventListener('mousedown', onMapPinClick);
    mapPin.removeEventListener('keydown', onMapPinDown);
  };

  var onMapPinClick = function (evt) {
    if (evt.button === MOUSE_DOWN_LEFT) {
      activatePage();
    }
  };

  var onMapPinDown = function (evt) {
    if (evt.key === KEY_CODE_ENTER) {
      activatePage();
    }
  };

  var disableForm = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].toggleAttribute('disabled');
    }
  };

  disableForm(formElements);

  mapPin.addEventListener('mousedown', onMapPinClick);
  mapPin.addEventListener('keydown', onMapPinDown);

  window.activePage = {
    mapPin: mapPin
  };
})();
