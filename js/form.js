'use strict';

(function () {
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

  var setEnabled = function (enabled) {
    if (enabled) {
      adForm.classList.remove(FORM_DISABLED);
    } else {
      adForm.classList.add(FORM_DISABLED);
    }
  };

  var toggleFormState = function () {
    formElements.forEach(function (element) {
      element.toggleAttribute('disabled');
    });
  };

  var setAddress = function (mainPin, mapPinHeight) {
    var coordinateX = Math.round(mainPin.offsetLeft + window.map.MAIN_PIN_WIDTH / 2);
    var coordinateY = mainPin.offsetTop + Math.round(mapPinHeight);
    fieldAddress.value = coordinateX + ', ' + coordinateY;
  };

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

    roomNumber.setCustomValidity(validationResult);
    roomNumber.reportValidity();
  };

  var onTimeChange = function (evt) {
    var value = evt.target.value;
    timeIn.value = value;
    timeOut.value = value;
  };

  var onTitleInput = function () {
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
  };

  titleField.addEventListener('input', onTitleInput);

  typeHouse.addEventListener('change', onTypeChange);
  housePrice.addEventListener('input', onPriceInput);

  roomNumber.addEventListener('input', onRoomsGuestsInput);
  capacity.addEventListener('input', onRoomsGuestsInput);

  timeIn.addEventListener('change', onTimeChange);
  timeOut.addEventListener('change', onTimeChange);

  window.form = {
    setEnabled: setEnabled,
    setAddress: setAddress,
    toggleElementState: toggleFormState,
    fieldAddress: fieldAddress
  };
})();
