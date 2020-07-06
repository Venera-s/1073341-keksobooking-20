'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 82;


  // 3 пункт: На основе данных, созданных в первом пункте, создать DOM-элементы, соответствующие меткам на карте, и заполнить их данными из массива.

  var renderPin = function (offer) {
    var templateButton = pinTemplate.cloneNode(true);
    var pinImage = templateButton.querySelector('img');
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;
    templateButton.style.left = offer.location.x - MAIN_PIN_WIDTH / 2 + 'px';
    templateButton.style.top = offer.location.y - MAIN_PIN_HEIGHT + 'px';
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

  window.pin = {
    create: getMapPins,
    WIDTH: MAIN_PIN_WIDTH,
    HEIGHT: MAIN_PIN_HEIGHT
  };
})();
