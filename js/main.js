'use strict';

(function () {
  var CLASS_MAP_PIN_ACTIVE = 'map__pin--active';
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var resetButton = document.querySelector('.ad-form__reset');
  var dataAdverts = [];

  var mapFiltersState = function () {
    mapFilters.classList.toggle(window.util.CLASS_HIDDEN);
  };

  var setInitialStates = function () {
    window.form.toggleAdFormState();
    window.map.toggleMapFormState();
    mapFiltersState();
    window.form.setAddress(window.map.MAIN_PIN_ROUND_HALF_HEIGHT);
  };

  setInitialStates();

  var successHandler = function (adverts) {
    dataAdverts = adverts;

    window.map.renderAdverts(adverts);

    window.map.toggleMapFormState();

    setMapPinsClickListener(onMapPinClick);
  };

  var errorHandler = function (message) {
    window.message.createError(message);
  };

  var activate = function () {
    window.map.removeMainPinClickListener(onMainPinClick);
    window.map.removeMainPinKeyDownListener(onMainPinKeyDown);

    mapFiltersState();

    window.form.setAddress(window.map.MAIN_PIN_WIDTH);

    window.map.setEnabled(true);
    window.form.setEnabled(true);

    window.form.toggleAdFormState();

    window.backend.loadData(successHandler, errorHandler);

    window.formSubmit.setAdFormSubmitListener();
    resetButton.addEventListener('click', onResetButtonClick);
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
    var card = window.card.create(dataAdverts[pinIndex]);
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

  window.move.init(window.form.mainPin);

  var removeMapPins = function () {
    findMapPins().forEach(function (element) {
      element.remove();
    });
  };

  var onResetButtonClick = function () {
    window.form.adForm.reset();
    window.map.mapForm.reset();

    window.form.onTypeChange();

    window.form.setDefaultLocation();

    setInitialStates();

    closePopup();
    removeMapPins();

    window.map.setEnabled(false);
    window.form.setEnabled(false);

    window.map.setMainPinClickListener(onMainPinClick);
    window.map.setMainPinKeyDownListener(onMainPinKeyDown);
  };
})();
