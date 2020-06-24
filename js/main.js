'use strict';

var ADVERTS_AMOUNT = 8;
var ROOMS_AMOUNT_MAX = 100;
var GUESTS_AMOUNT_MAX = 10;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var MAP_PIN_WIDTH = 65;
var MAP_PIN_HEIGHT = 82;
var MAP_PIN_ROUND_HALF_HEIGHT = 31;
var TITLE_LENGTH_MIN = 30;
var TITLE_LENGTH_MAX = 100;
var PRICE_MAX = 1000000;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MOUSE_DOWN_LEFT = 0;
var KEY_CODE_ENTER = 'Enter';

var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHEKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PRICES_FOR_TYPES = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formElements = document.querySelectorAll('form input, form select, form textarea, .ad-form__submit');
var fieldAddress = adForm.querySelector('#address');
var titleField = adForm.querySelector('#title');
var housePrice = adForm.querySelector('#price');
var typeHouse = adForm.querySelector('#type');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

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

// 1 пункт: Функция для создания массива из 8 сгенерированных JS-объектов. Каждый объект массива ‐ описание похожего объявления неподалёку.

var getAnnouncements = function (amountAnnouncements) {
  var locationX = document.querySelector('.map').clientWidth;
  var announcements = [];
  for (var i = 0; i < amountAnnouncements; i++) {
    var positionX = getRandomInt(0, locationX);
    var positionY = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);

    announcements.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Ваше объявление',
        address: positionX + ', ' + positionY,
        price: getRandomInt(0, PRICE_MAX),
        type: getRandomElement(PLACE_TYPES),
        rooms: getRandomInt(0, ROOMS_AMOUNT_MAX),
        guests: getRandomInt(0, GUESTS_AMOUNT_MAX),
        checkin: getRandomElement(CHEKINS),
        checkout: getRandomElement(CHEKINS),
        features: getRandomPart(FEATURES),
        description: 'Продам комфортабельную квартиру',
        photos: getRandomPart(PHOTOS)
      },
      location: {
        x: positionX,
        y: positionY
      }
    }
    );
  }
  return announcements;
};

// 3 пункт: На основе данных, созданных в первом пункте, создать DOM-элементы, соответствующие меткам на карте, и заполнить их данными из массива.

var renderPin = function (offer) {
  var templateButton = pinTemplate.cloneNode(true);
  var pinImage = templateButton.querySelector('img');
  pinImage.src = offer.author.avatar;
  pinImage.alt = offer.offer.title;
  templateButton.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
  templateButton.style.top = offer.location.y - PIN_HEIGHT + 'px';
  return templateButton;
};

// 4 пункт: Отрисовать сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов использовать DocumentFragment.

var getMapPins = function (announcements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < announcements.length; i++) {
    var pin = renderPin(announcements[i]);
    fragment.appendChild(pin);
  }
  return fragment;
};

var disableForm = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].toggleAttribute('disabled');
  }
};

// Заполнение поля адреса

var setAddress = function (mapPinHeight) {
  var coordinateX = Math.round(mapPin.offsetLeft + MAP_PIN_WIDTH / 2);
  var coordinateY = mapPin.offsetTop + Math.round(mapPinHeight);
  fieldAddress.value = coordinateX + ', ' + coordinateY;
};

// Активация страницы

var activatePage = function () {
  setAddress(MAP_PIN_HEIGHT);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  disableForm(formElements);
  var allAnnouncements = getAnnouncements(ADVERTS_AMOUNT);
  mapPins.appendChild(getMapPins(allAnnouncements));
  mapPin.removeEventListener('mousedown', onMapPinClick);
  mapPin.removeEventListener('keydown', onMapPinDown);
};

var onMapPinClick = function (evt) {
  if (evt.button === MOUSE_DOWN_LEFT) {
    activatePage();
  }
};

var onMapPinDown = function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    activatePage();
  }
};

// Валидация формы

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
  if (rooms === ROOMS_AMOUNT_MAX && guests !== 0) {
    validationResult = 'Для ' + roomNumber.options[roomValue].label + ' предназначено ' + capacity.options[roomValue].label;
  } else if (guests === 0 && rooms !== ROOMS_AMOUNT_MAX) {
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

disableForm(formElements);

setAddress(MAP_PIN_ROUND_HALF_HEIGHT);

mapPin.addEventListener('mousedown', onMapPinClick);
mapPin.addEventListener('keydown', onMapPinDown);

typeHouse.addEventListener('change', onTypeChange);
housePrice.addEventListener('input', onPriceInput);

onRoomsGuestsInput();

roomNumber.addEventListener('input', onRoomsGuestsInput);
capacity.addEventListener('input', onRoomsGuestsInput);

timeIn.addEventListener('change', onTimeChange);
timeOut.addEventListener('change', onTimeChange);
