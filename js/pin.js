'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var create = function (advert) {
    var templateButton = pinTemplate.cloneNode(true);

    var pinImage = templateButton.querySelector('img');
    pinImage.src = advert.author.avatar;
    pinImage.alt = advert.offer.title;

    templateButton.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
    templateButton.style.top = advert.location.y - PIN_HEIGHT + 'px';

    return templateButton;
  };

  window.pin = {
    PIN_HEIGHT: PIN_HEIGHT,

    create: create
  };
})();
