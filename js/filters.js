'use strict';

(function () {
  var MAX_NUMBER_OF_PINS = 5;
  var DEFAULT_VALUE_ANY = 'any';
  var PricesForRoom = {
    MIN: 10000,
    MAX: 50000,
  };
  var filterTypeHouse = document.querySelector('#housing-type');
  var filterHousePrice = document.querySelector('#housing-price');
  var filterRoomNumber = document.querySelector('#housing-rooms');
  var filterCapacity = document.querySelector('#housing-guests');
  var filterFeatures = document.querySelector('#housing-features');

  var filterByTypeHouse = function (advert) {
    return filterTypeHouse.value === advert.offer.type || filterTypeHouse.value === DEFAULT_VALUE_ANY;
  };

  var filterByHousePrice = function (advert) {
    switch (filterHousePrice.value) {
      case 'low':
        return advert.offer.price < PricesForRoom.MIN;
      case 'medium':
        return PricesForRoom.MIN <= advert.offer.price && advert.offer.price < PricesForRoom.MAX;
      case 'high':
        return advert.offer.price >= PricesForRoom.MAX;
      default:
        return filterHousePrice.value === DEFAULT_VALUE_ANY;
    }
  };

  var filterByRoomNumber = function (advert) {
    return advert.offer.rooms === parseInt(filterRoomNumber.value, 10) || filterRoomNumber.value === DEFAULT_VALUE_ANY;
  };

  var filterByCapacity = function (advert) {
    return advert.offer.guests === parseInt(filterCapacity.value, 10) || filterCapacity.value === DEFAULT_VALUE_ANY;
  };

  var filterByFeatures = function (advert) {
    var checkedFeatures = Array.from(filterFeatures.querySelectorAll('input[type=checkbox]:checked')).map(function (element) {
      return element.value;
    });

    return checkedFeatures.every(function (element) {
      return advert.offer.features.includes(element);
    });
  };

  var filteringFunction = [filterByTypeHouse, filterByHousePrice, filterByRoomNumber, filterByCapacity, filterByFeatures];

  var filtrate = function (element) {
    return filteringFunction.every(function (filter) {
      return filter(element);
    });
  };

  var filterAdverts = function (adverts) {
    var filteredAdverts = [];
    for (var i = 0; i < adverts.length; i++) {
      if (adverts[i].offer && filtrate(adverts[i])) {
        filteredAdverts.push(adverts[i]);
      } if (filteredAdverts.length === MAX_NUMBER_OF_PINS) {
        break;
      }
    }
    return filteredAdverts;
  };

  window.filters = {
    getAdverts: filterAdverts,
  };
})();
