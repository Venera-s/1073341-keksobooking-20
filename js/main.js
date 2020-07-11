'use strict';

(function () {
  var CLASS_MAP_PIN_ACTIVE = 'map__pin--active';
  var map = document.querySelector('.map');
  var mapForm = document.querySelector('.map__filters');
  var mapFormElements = mapForm.querySelectorAll('input, select');
  var mapFilters = document.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormElements = window.form.adForm.querySelectorAll('input, select, textarea, .ad-form__submit');

  window.form.toggleElementState(mapFormElements);
  window.form.toggleElementState(adFormElements);

  var successHandler = function (adverts) {
    window.backend.dataAdverts = adverts;
    window.map.renderAdverts(adverts);
    window.form.toggleElementState(mapFormElements);
    setMapPinsClickListener(onMapPinClick);
  };

  var errorHandler = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: white; font-weight: bold; background-color: orange;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '35px';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var activate = function () {
    window.map.removeMainPinClickListener(onMainPinClick);
    window.map.removeMainPinKeyDownListener(onMainPinKeyDown);

    window.form.setAddress(mainPin, window.pin.PIN_HEIGHT);

    window.map.setEnabled(true);
    window.form.setEnabled(true);
    window.form.toggleElementState(adFormElements);

    window.backend.loadData(successHandler, errorHandler);
  };

  var deactivate = function () {
    window.map.setMainPinClickListener(onMainPinClick);
    window.map.setMainPinKeyDownListener(onMainPinKeyDown);
    removeMapPinsClickListener('click', onMapPinClick);

    window.map.setEnabled(false);
    window.form.setEnabled(false);
  };

  var onMainPinClick = function (evt) {
    if (evt.button === window.util.MOUSE_LEFT) {
      activate();
    }
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.key === window.util.KEY_ENTER) {
      activate();
    }
  };

  var removeMapPinActive = function () {
    var mapPinActive = map.querySelector('.map__pin--active');
    if (mapPinActive) {
      mapPinActive.classList.remove(CLASS_MAP_PIN_ACTIVE);
    }
  };

  var onMapPinClick = function (evt) {
    removeMapPinActive();
    closePopup();

    if (evt.target.matches('img[data-index]')) {
      evt.target.parentElement.classList.add(CLASS_MAP_PIN_ACTIVE);
    } else {
      evt.target.classList.add(CLASS_MAP_PIN_ACTIVE);
    }

    var pinIndex = evt.target.dataset.index;
    var card = window.card.create(window.backend.dataAdverts[pinIndex]);
    map.insertBefore(card, mapFilters);

    var buttonClose = card.querySelector('.popup__close');
    buttonClose.addEventListener('click', onButtonCloseClick);

    document.addEventListener('keydown', onPopupKeydownEsc);
  };

  var closePopup = function () {
    var popup = document.querySelector('.popup');

    if (popup) {
      popup.remove();
    }

    document.removeEventListener('keydown', onPopupKeydownEsc);
  };

  var onPopupKeydownEsc = function (evt) {
    if (evt.key === window.util.KEY_ESC) {
      evt.preventDefault();
      closePopup();
      removeMapPinActive();
    }
  };

  var onButtonCloseClick = function (evt) {
    evt.preventDefault();
    closePopup();
    removeMapPinActive();
  };


  var findMapPins = function () {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main), img[data-index]');

    return mapPins;
  };

  var setMapPinsClickListener = function (listener) {
    findMapPins().forEach(function (element) {
      element.addEventListener('click', listener);
    });
  };

  var removeMapPinsClickListener = function (listener) {
    findMapPins().forEach(function (element) {
      element.removeEventListener('click', listener);
    });
  };

  deactivate();

  window.move.init(mainPin);
})();
