'use strict';

(function () {

  var MainPinMove = document.querySelector('.map__pin--main');

  MainPinMove.addEventListener('mousedown', function (evt) {
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

      var locationX = MainPinMove.offsetLeft - shift.x;
      var locationY = MainPinMove.offsetTop - shift.y;
      var mainPinHalfWidth = Math.round(window.pin.WIDTH / 2);
      var mainPinHalfHeight = window.pin.HEIGHT;
      var locationMinX = MainPinMove.parentElement.offsetLeft - mainPinHalfWidth;
      var locationMaxX = MainPinMove.parentElement.offsetWidth - mainPinHalfWidth;
      var locationMinY = window.data.LOCATION_Y_MIN - window.pin.HEIGHT;
      var locationMaxY = window.data.LOCATION_Y_MAX - window.pin.HEIGHT;



      // var MainPinMoveMinX = locationMinX - shift.x;
      // var MainPinMoveMinY = window.data.LOCATION_Y_MIN - shift.y;
      // var limitationMinPinX = locationMinX - MAIN_PIN_HALF_WIDTH;
      // var limitationMaxPinX = locationMaxX - MAIN_PIN_HALF_WIDTH;

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

        MainPinMove.style.top = valueY + 'px';
        MainPinMove.style.left = valueX + 'px';

        window.main.fieldAddress.value = (valueX + mainPinHalfWidth) + ', ' + (valueY + mainPinHalfHeight);
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

  window.movementPin = {
    move: MainPinMove
  };
})();


