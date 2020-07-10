'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var typesOfHousing = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var createPopup = function (advert) {
    var card = cardTemplate.cloneNode(true);
    var popupAvatar = card.querySelector('.popup__avatar');
    var popupTitle = card.querySelector('.popup__title');
    var popupAdress = card.querySelector('.popup__text--address');
    var popupPrice = card.querySelector('.popup__text--price');
    var popupType = card.querySelector('.popup__type');
    var popupGuests = card.querySelector('.popup__text--capacity');
    var popupTimeInOut = card.querySelector('.popup__text--time');
    var popupDescription = card.querySelector('.popup__description');

    popupTitle.textContent = advert.offer.title;
    popupAdress.textContent = advert.offer.address;
    popupPrice.textContent = advert.offer.price + ' ₽/ночь';
    popupType.textContent = typesOfHousing[advert.offer.type];
    popupGuests.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    popupTimeInOut.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд после ' + advert.offer.checkout;

    if (advert.author.avatar) {
      popupAvatar.src = advert.author.avatar;
    } else {
      popupAvatar.classList.add(window.util.CLASS_HIDDEN);
    }

    if (advert.offer.description) {
      popupDescription.textContent = advert.offer.description;
    } else {
      popupDescription.classList.add(window.util.CLASS_HIDDEN);
    }

    setCardFeatures(advert, card);
    setCardPhotos(advert, card);

    return card;
  };

  var setCardFeatures = function (advert, card) {
    var cardFeatures = card.querySelector('.popup__features');
    cardFeatures.textContent = '';

    if (advert.offer.features.lenght !== 0) {
      advert.offer.features.forEach(function (element) {
        var popupFeature = document.createElement('li');
        popupFeature.classList.add('popup__feature', 'popup__feature--' + element);
        cardFeatures.appendChild(popupFeature);
      });
    } else {
      cardFeatures.classList.add(window.util.CLASS_HIDDEN);
    }
  };

  var setCardPhotos = function (advert, card) {
    var cardPhotos = card.querySelector('.popup__photos');
    var cardPhotoTemplate = cardPhotos.querySelector('.popup__photo');
    cardPhotoTemplate.remove();

    if (advert.offer.photos.length !== 0) {
      advert.offer.photos.forEach(function (element) {
        var cardPhoto = cardPhotoTemplate.cloneNode(true);
        cardPhoto.src = element;
        cardPhotos.appendChild(cardPhoto);
      });
    } else {
      cardPhotos.classList.add(window.util.CLASS_HIDDEN);
    }
  };

  window.card = {
    create: createPopup,
  };
})();

