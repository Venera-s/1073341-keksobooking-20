'use strict';

(function () {
  var init = function (element) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var locationX = element.offsetLeft - shift.x;
        var locationY = element.offsetTop - shift.y;
        var mainPinHalfWidth = Math.round(window.map.MAIN_PIN_WIDTH / 2);
        var mainPinHalfHeight = window.map.MAIN_PIN_HEIGHT;
        var locationMinX = element.parentElement.offsetLeft - mainPinHalfWidth;
        var locationMaxX = element.parentElement.offsetWidth - mainPinHalfWidth;
        var locationMinY = window.data.LOCATION_Y_MIN - window.map.MAIN_PIN_HEIGHT;
        var locationMaxY = window.data.LOCATION_Y_MAX - window.map.MAIN_PIN_HEIGHT;

        var limitMainPin = function (valueX, valueY, valueMinX, valueMaxX, valueMinY, valueMaxY) {

          if (valueX < valueMinX) {
            valueX = valueMinX;
          }
          if (valueX > valueMaxX) {
            valueX = valueMaxX;
          }
          if (valueY < valueMinY) {
            valueY = valueMinY;
          }
          if (valueY > valueMaxY) {
            valueY = valueMaxY;
          }

          element.style.top = valueY + 'px';
          element.style.left = valueX + 'px';
          // надо подумать
          window.form.fieldAddress.value = (valueX + mainPinHalfWidth) + ', ' + (valueY + mainPinHalfHeight);
        };

        limitMainPin(locationX, locationY, locationMinX, locationMaxX, locationMinY, locationMaxY);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  window.move = {
    init: init
  };
})();


