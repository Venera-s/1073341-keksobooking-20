'use strict';

(function () {
  var MAX_NUMBER_OF_PINS = 5;
  var DEFAULT_VALUE_ANY = 'any';
  var filterTypeHouse = document.querySelector('#housing-type');

  var filterByTypeHouse = function (advert) {
    return filterTypeHouse.value === advert.offer.type || filterTypeHouse.value === DEFAULT_VALUE_ANY;
  };

  var filteringFunction = [filterByTypeHouse];

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
    adverts: filterAdverts,
  };
})();
