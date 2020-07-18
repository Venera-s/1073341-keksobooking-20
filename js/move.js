'use strict';

(function () {
  var initialize = function (element, moveListener) {
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

        var x = element.offsetLeft - shift.x;
        var y = element.offsetTop - shift.y;

        var mainPinHalfWidth = Math.floor(window.map.MAIN_PIN_WIDTH / 2);

        var minX = element.parentElement.offsetLeft - mainPinHalfWidth;
        var maxX = element.parentElement.offsetWidth - mainPinHalfWidth;

        var minY = window.map.LOCATION_Y_MIN - window.map.MAIN_PIN_HEIGHT_WITH_POINT;
        var maxY = window.map.LOCATION_Y_MAX - window.map.MAIN_PIN_HEIGHT_WITH_POINT;

        var limitMainPin = function (valueX, valueY, valueMinX, valueMaxX, valueMinY, valueMaxY) {
          var correctX = valueX;
          var correctY = valueY;

          if (valueX < valueMinX) {
            correctX = valueMinX;
          }
          if (valueX > valueMaxX) {
            correctX = valueMaxX;
          }
          if (valueY < valueMinY) {
            correctY = valueMinY;
          }
          if (valueY > valueMaxY) {
            correctY = valueMaxY;
          }

          element.style.top = correctY + 'px';
          element.style.left = correctX + 'px';

          moveListener();
        };

        limitMainPin(x, y, minX, maxX, minY, maxY);
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
    initialize: initialize
  };
})();


