'use strict';

var AMOUNT_OF_ANNOUNCEMENTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAX_AMOUNT_ROOMS = 100;
var MAX_AMOUNT_GUESTS = 10;
var MIN_VALUE = 0;
var MIN_VALUE_Y = 130;
var MAX_VALUE_Y = 630;
var MAX_PRICE = 1000000;
var CHEKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_HALF_WIDTH = 25;
var PIN_HEIGHT = 70;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var locationX = document.querySelector('.map').clientWidth;
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (elements) {
  return elements[getRandomIntInclusive(MIN_VALUE, elements.length - 1)];
};

var getRandomPart = function (elements) {
  var benefits = elements.length;
  var begin = getRandomIntInclusive(MIN_VALUE, benefits - 2);
  var end = getRandomIntInclusive(begin + 1, benefits);
  return elements.slice(begin, end);
};

// 1 пункт: Функция для создания массива из 8 сгенерированных JS-объектов. Каждый объект массива ‐ описание похожего объявления неподалёку.

var getAnnouncements = function (amountAnnouncements) {
  var announcements = [];
  for (var i = 0; i < amountAnnouncements; i++) {
    var positionX = getRandomIntInclusive(MIN_VALUE, locationX);
    var positionY = getRandomIntInclusive(MIN_VALUE_Y, MAX_VALUE_Y);

    announcements.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Ваше объявление',
        address: '' + positionX + ', ' + positionY,
        price: getRandomIntInclusive(MIN_VALUE, MAX_PRICE),
        type: getRandomElement(TYPES),
        rooms: getRandomIntInclusive(MIN_VALUE, MAX_AMOUNT_ROOMS),
        guests: getRandomIntInclusive(MIN_VALUE, MAX_AMOUNT_GUESTS),
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

var allAnnouncements = getAnnouncements(AMOUNT_OF_ANNOUNCEMENTS);

// 3 пункт: На основе данных, созданных в первом пункте, создать DOM-элементы, соответствующие меткам на карте, и заполнить их данными из массива.

var pinButton = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');

var createDocumentElement = function (user) {
  var templateButton = pinButton.cloneNode(true);
  var pinImage = templateButton.querySelector('img');
  pinImage.src = user.author.avatar;
  pinImage.alt = user.offer.title;
  templateButton.style.left = user.location.x - PIN_HALF_WIDTH + 'px';
  templateButton.style.top = user.location.y - PIN_HEIGHT + 'px';
  return templateButton;
};

// 4 пункт: Отрисовать сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов использовать DocumentFragment.

var getMapPins = function (announcements) {
  for (var i = 0; i < announcements.length; i++) {
    var pin = createDocumentElement(announcements[i]);
    fragment.appendChild(pin);
  }
  return fragment;
};

mapPins.appendChild(getMapPins(allAnnouncements));
