'use strict';

(function () {
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

  var getAnnouncements = function (amountAnnouncements) {
    var locationX = document.querySelector('.map').clientWidth;
    var announcements = [];
    for (var i = 0; i < amountAnnouncements; i++) {
      var positionX = window.util.getRandomInt(0, locationX);
      var positionY = window.util.getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);

      announcements.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Ваше объявление',
          address: positionX + ', ' + positionY,
          price: window.util.getRandomInt(0, PRICE_MAX),
          type: window.util.getRandomElement(PLACE_TYPES),
          rooms: window.util.getRandomInt(0, ROOMS_AMOUNT_MAX),
          guests: window.util.getRandomInt(0, GUESTS_AMOUNT_MAX),
          checkin: window.util.getRandomElement(CHEKINS),
          checkout: window.util.getRandomElement(CHEKINS),
          features: window.util.getRandomPart(FEATURES),
          description: 'Продам комфортабельную квартиру',
          photos: window.util.getRandomPart(PHOTOS)
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
    ROOMS_AMOUNT_MAX: ROOMS_AMOUNT_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,

    getAnnouncements: getAnnouncements

  };
})();
