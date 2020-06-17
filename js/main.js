'use strict';

var ADVERTS_AMOUNT = 8;
var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
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
var CHEKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var KEY_CODE_ENTER = 13;
var MOUSE_DOWN_LEFT = 0;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

var formElements = document.querySelectorAll('form input, form select, form textarea, .ad-form__submit');

var disabledForm = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].toggleAttribute('disabled');
  }
};

disabledForm(formElements);

var mapPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fieldAddress = adForm.querySelector('#address');

// Заполнение поля адреса

var pin = function (mapPinHeight) {
  var coordinateX = Math.round(mapPin.offsetLeft + MAP_PIN_WIDTH / 2);
  var coordinateY = mapPin.offsetTop + Math.round(mapPinHeight);
  fieldAddress.value = coordinateX + ', ' + coordinateY;
};

pin(MAP_PIN_ROUND_HALF_HEIGHT);

// Активация страницы

var activePage = function () {
  pin(MAP_PIN_HEIGHT);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  disabledForm(formElements);
  var allAnnouncements = getAnnouncements(ADVERTS_AMOUNT);
  mapPins.appendChild(getMapPins(allAnnouncements));
  mapPin.removeEventListener('mousedown', onMapPinClick);
  mapPin.removeEventListener('keydown', onMapPinDown);
};

var onMapPinClick = function (evt) {
  if (evt.button === MOUSE_DOWN_LEFT) {
    activePage();
  }
};

var onMapPinDown = function (evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    activePage();
  }
};

mapPin.addEventListener('mousedown', onMapPinClick);
mapPin.addEventListener('keydown', onMapPinDown);


var titleField = adForm.querySelector('#title');

titleField.addEventListener('input', function () {
  var titleFieldLength = titleField.value.length;

  if (titleField.validity.valueMissing) {
    titleField.setCustomValidity('Заполните пожалуйста поле');
  } else if (titleFieldLength < TITLE_LENGTH_MIN) {
    titleField.setCustomValidity('Еще нужно ввести ' + (TITLE_LENGTH_MIN - titleFieldLength) + ' символов');

  } else if (titleFieldLength > TITLE_LENGTH_MAX) {
    titleField.setCustomValidity('Удалите лишние ' + (TITLE_LENGTH_MAX - titleFieldLength) + ' символов');

  } else {
    titleField.setCustomValidity('');
  }
});

var housePrice = adForm.querySelector('#price');
var typeHouse = adForm.querySelector('#type');

var pricesForTypes = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

typeHouse.addEventListener('input', function () {
  housePrice.setAttribute('placeholder', pricesForTypes[typeHouse.value]);
  housePrice.setAttribute('min', pricesForTypes[typeHouse.value]);
});


