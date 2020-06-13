'use strict';

var ADVERTS_AMOUNT = 8;
var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_AMOUNT_MAX = 100;
var GUESTS_AMOUNT_MAX = 10;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var MAX_PRICE = 1000000;
var CHEKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
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
        price: getRandomInt(0, MAX_PRICE),
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

var allAnnouncements = getAnnouncements(ADVERTS_AMOUNT);
mapPins.appendChild(getMapPins(allAnnouncements));

map.classList.remove('map--faded');
