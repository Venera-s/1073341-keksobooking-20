'use strict';

(function () {
  var MAP_PIN_ROUND_HALF_HEIGHT = 31;
  var MAP_PIN_WIDTH = 65;
  var TITLE_LENGTH_MIN = 30;
  var TITLE_LENGTH_MAX = 100;
  var FORM_DISABLED = 'ad-form--disabled';

  var PRICES_FOR_TYPES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var formElements = document.querySelectorAll('form input, form select, form textarea, .ad-form__submit');
  var adForm = document.querySelector('.ad-form');
  var fieldAddress = adForm.querySelector('#address');
  var titleField = adForm.querySelector('#title');
  var housePrice = adForm.querySelector('#price');
  var typeHouse = adForm.querySelector('#type');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var setEnabled = function (variable, className) {
    variable.classList.toggle(className);
  };

  var setEnabledAdForm = function () {
    setEnabled(adForm, FORM_DISABLED);
  };

  var setAddress = function (mapPinHeight) {
    var coordinateX = Math.round(window.movementPin.movePin.offsetLeft + MAP_PIN_WIDTH / 2);
    var coordinateY = window.movementPin.movePin.offsetTop + Math.round(mapPinHeight);
    fieldAddress.value = coordinateX + ', ' + coordinateY;
  };

  titleField.addEventListener('input', function () {
    var titleFieldLength = titleField.value.length;
    var validationResult = '';

    if (titleField.validity.valueMissing) {
      validationResult = 'Заполните пожалуйста поле';
    } else if (titleFieldLength < TITLE_LENGTH_MIN) {
      validationResult = 'Еще нужно ввести ' + (TITLE_LENGTH_MIN - titleFieldLength) + ' символов';
    } else if (titleFieldLength > TITLE_LENGTH_MAX) {
      validationResult = 'Удалите лишние ' + (TITLE_LENGTH_MAX - titleFieldLength) + ' символов';
    }

    titleField.reportValidity();
    titleField.setCustomValidity(validationResult);
  });

  var onPriceInput = function () {
    housePrice.reportValidity();
  };

  var onTypeChange = function () {
    housePrice.setAttribute('placeholder', PRICES_FOR_TYPES[typeHouse.value]);
    housePrice.setAttribute('min', PRICES_FOR_TYPES[typeHouse.value]);
    housePrice.reportValidity();
  };

  var onRoomsGuestsInput = function () {
    var rooms = parseInt(roomNumber.value, 10);
    var guests = parseInt(capacity.value, 10);
    var roomValue = roomNumber.selectedIndex;
    var capacityValue = capacity.selectedIndex;
    var validationResult = '';
    if (rooms === window.data.ROOMS_AMOUNT_MAX && guests !== 0) {
      validationResult = 'Для ' + roomNumber.options[roomValue].label + ' предназначено ' + capacity.options[roomValue].label;
    } else if (guests === 0 && rooms !== window.data.ROOMS_AMOUNT_MAX) {
      validationResult = 'Для ' + capacity.options[capacityValue].label + ' предназначено ' + roomNumber.options[capacityValue].label;
    } else if (rooms < guests) {
      validationResult = 'Количество комнат не должно превышать количество гостей';
    }

    roomNumber.reportValidity();
    roomNumber.setCustomValidity(validationResult);
  };

  var onTimeChange = function (evt) {
    var value = evt.target.value;
    timeIn.value = value;
    timeOut.value = value;
  };

  setAddress(MAP_PIN_ROUND_HALF_HEIGHT);

  typeHouse.addEventListener('change', onTypeChange);
  housePrice.addEventListener('input', onPriceInput);

  onRoomsGuestsInput();

  roomNumber.addEventListener('input', onRoomsGuestsInput);
  capacity.addEventListener('input', onRoomsGuestsInput);

  timeIn.addEventListener('change', onTimeChange);
  timeOut.addEventListener('change', onTimeChange);

  window.main = {
    setEnabled: setEnabled,
    setEnabledAdForm: setEnabledAdForm,
    setAddress: setAddress,
    elements: formElements
  };
})();
