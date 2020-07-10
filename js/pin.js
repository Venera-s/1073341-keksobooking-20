'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var renderPin = function (advert, index) {
    var templateButton = pinTemplate.cloneNode(true);

    var pinImage = templateButton.querySelector('img');

    templateButton.dataset.index = index;
    pinImage.src = advert.author.avatar;
    pinImage.alt = advert.offer.title;
    pinImage.dataset.index = index;

    templateButton.style.left = advert.location.x - PIN_WIDTH / 2 + 'px';
    templateButton.style.top = advert.location.y - PIN_HEIGHT + 'px';

    return templateButton;
  };

  var render = function (adverts) {
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (advert, index) {
      fragment.appendChild(renderPin(advert, index));
    });
    return fragment;
  };

  window.pin = {
    PIN_HEIGHT: PIN_HEIGHT,

    render: render
  };
})();
