'use strict';

(function () {
  var MAP_FADED = 'map--faded';

  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;

  var MAIN_PIN_HEIGHT_WITH_POINT = 81;

  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var MAIN_PIN_DEFAULT_X = 570;
  var MAIN_PIN_DEFAULT_Y = 375;

  var CLASS_MAP_PIN_ACTIVE = 'map__pin--active';

  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapForm = document.querySelector('.map__filters');
  var mapFormElements = mapForm.querySelectorAll('input, select');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var setEnabled = function (enabled) {
    if (enabled) {
      map.classList.remove(MAP_FADED);
      mapFilters.classList.remove(window.util.CLASS_HIDDEN);
    } else {
      map.classList.add(MAP_FADED);
      mapFilters.classList.add(window.util.CLASS_HIDDEN);
      removePins();
      resetMainPinLocation();
      closeAdvertCard();
      mapForm.reset();
      setEnabledMapFilters(true);
    }
  };

  var resetActivePin = function () {
    var mapPinActive = map.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove(CLASS_MAP_PIN_ACTIVE);
    }
  };

  var setEnabledMapFilters = function (enabled) {
    if (enabled) {
      mapFormElements.forEach(function (element) {
        element.setAttribute('disabled', 'disabled');
      });
    } else {
      mapFormElements.forEach(function (element) {
        element.removeAttribute('disabled');
      });
    }
  };

  var renderAdverts = function (adverts) {
    removePins();

    mapPins.appendChild(renderAdvertPins(adverts));
    setEnabledMapFilters(false);
  };

  var setPinActive = function (pin) {
    resetActivePin();

    pin.classList.add(CLASS_MAP_PIN_ACTIVE);
  };

  var onPinClick = function (pin, advert) {
    setPinActive(pin);
    showAdvertCard(advert);
  };

  var renderAdvertPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (advert) {
      var pin = window.pin.create(advert);

      pin.addEventListener('click', function () {
        onPinClick(pin, advert);
      });

      fragment.appendChild(pin);
    });
    return fragment;
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

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var showAdvertCard = function (advert) {
    closeAdvertCard();

    var card = window.card.create(advert);

    var buttonClose = card.querySelector('.popup__close');
    buttonClose.addEventListener('click', onButtonCloseClick);
    document.addEventListener('keydown', onPopupKeydownEsc);

    map.insertBefore(card, mapFilters);
  };

  var closeAdvertCard = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    document.removeEventListener('keydown', onPopupKeydownEsc);
  };

  var onPopupKeydownEsc = function (evt) {
    if (evt.key === window.util.Key.ESCAPE) {
      closeAdvertCard();
      resetActivePin();
    }
  };

  var onButtonCloseClick = function (evt) {
    evt.preventDefault();
    closeAdvertCard();
    resetActivePin();
  };

  var resetMainPinLocation = function () {
    mainPin.style.top = MAIN_PIN_DEFAULT_Y + 'px';
    mainPin.style.left = MAIN_PIN_DEFAULT_X + 'px';
  };

  var getMainPinLocation = function () {
    if (map.classList.contains(MAP_FADED)) {
      return {
        x: mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2),
        y: mainPin.offsetTop + Math.floor(MAIN_PIN_HEIGHT / 2)
      };
    }

    return {
      x: mainPin.offsetLeft + Math.floor(MAIN_PIN_WIDTH / 2),
      y: mainPin.offsetTop + MAIN_PIN_HEIGHT_WITH_POINT
    };
  };

  window.map = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT_WITH_POINT: MAIN_PIN_HEIGHT_WITH_POINT,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,

    setEnabled: setEnabled,
    renderAdverts: renderAdverts,
    setEnabledMapFilters: setEnabledMapFilters,
    getMainPinLocation: getMainPinLocation,

    setMainPinClickListener: setMainPinClickListener,
    removeMainPinClickListener: removeMainPinClickListener,

    setMainPinKeyDownListener: setMainPinKeyDownListener,
    removeMainPinKeyDownListener: removeMainPinKeyDownListener,
  };
})();
