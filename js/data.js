'use strict';

var GUESTS_AMOUNT_MAX = 10;
var ROOMS_AMOUNT_MAX = 100;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PRICE_MAX = 1000000;
var PLACE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHEKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

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


window.data = {
  getAnnouncements: getAnnouncements,
  ROOMS_AMOUNT_MAX: ROOMS_AMOUNT_MAX
};

