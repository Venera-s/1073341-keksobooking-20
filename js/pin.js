'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;


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

  window.pin = {
    create: getMapPins,
    width: PIN_WIDTH,
    height: PIN_HEIGHT
  };
})();
