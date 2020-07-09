'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content;
  var cardTemplateArticle = cardTemplate.querySelector('.map__card');

  var types = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var createPopup = function (author) {
    var card = cardTemplateArticle.cloneNode(true);
    var popupAvatar = card.querySelector('.popup__avatar');
    var popupTitle = card.querySelector('.popup__title');
    var popupAdress = card.querySelector('.popup__text--address');
    var popupPrice = card.querySelector('.popup__text--price');
    var popupType = card.querySelector('.popup__type');
    var popupGuests = card.querySelector('.popup__text--capacity');
    var popupTimeInOut = card.querySelector('.popup__text--time');
    var popupDescription = card.querySelector('.popup__description');
    var map = document.querySelector('.map');
    var mapFilters = document.querySelector('.map__filters-container');

    popupTitle.textContent = author.offer.title;
    popupAdress.textContent = author.offer.address;
    popupPrice.textContent = author.offer.price + ' ₽/ночь';
    popupType.textContent = types[author.offer.type];
    popupGuests.textContent = author.offer.rooms + ' комнаты для ' + author.offer.guests + ' гостей';
    popupTimeInOut.textContent = 'Заезд после ' + author.offer.checkin + ', выезд после ' + author.offer.checkout;

    if (author.author.avatar) {
      popupAvatar.src = author.author.avatar;
    } else {
      popupAvatar.classList.add(window.util.CLASS_HIDDEN);
    }

    if (author.offer.description) {
      popupDescription.textContent = author.offer.description;
    } else {
      popupDescription.classList.add(window.util.CLASS_HIDDEN);
    }

    getCardFeatures(author, card);
    getCardPhotos(author, card);

    map.insertBefore(card, mapFilters);

    return card;
  };

  var getCardFeatures = function (author, card) {
    var cardFeatures = card.querySelector('.popup__features');
    cardFeatures.textContent = '';

    if (author.offer.features.lenght !== 0) {
      author.offer.features.forEach(function (element) {
        var popupFeature = document.createElement('li');
        popupFeature.classList.add('popup__feature', 'popup__feature--' + element);
        cardFeatures.appendChild(popupFeature);
      });
    } else {
      cardFeatures.classList.add(window.util.CLASS_HIDDEN);
    }
  };

  var getCardPhotos = function (author, card) {
    var cardPhotos = card.querySelector('.popup__photos');
    var cardPhotoTemplate = cardPhotos.querySelector('.popup__photo');
    cardPhotoTemplate.remove();

    if (author.offer.photos.length !== 0) {
      author.offer.photos.forEach(function (element) {
        var cardPhoto = cardPhotoTemplate.cloneNode(true);
        cardPhoto.src = element;
        cardPhotos.appendChild(cardPhoto);
      });
    } else {
      cardPhotos.classList.add(window.util.CLASS_HIDDEN);
    }
  };

  (function () {
    window.data.getAnnouncements(window.main.ADVERTS_AMOUNT).forEach(function (element) {
      createPopup(element);
    });
  })();

  window.card = {
    create: createPopup,
  };
})();

