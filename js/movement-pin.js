'use strict';

(function () {

  var movePin = document.querySelector('.map__pin--main');
  var locationMinX = movePin.parentElement.offsetLeft;
  var locationMaxX = movePin.parentElement.offsetWidth;
  var PIN_HALF_WIDTH = window.pin.width / 2;
  var limitationMinPinX = locationMinX - PIN_HALF_WIDTH;
  var limitationMaxPinX = locationMaxX - PIN_HALF_WIDTH;
  var limitationMinPinY = window.data.locationMinY - window.pin.height;
  var limitationMaxPinY = window.data.locationMaxY - window.pin.height;

  console.log(limitationMinPinX, limitationMaxPinX, limitationMinPinY, limitationMaxPinY);


  movePin.addEventListener('mousedown', function (evt) {
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
      movePin.style.top = (movePin.offsetTop - shift.y) + 'px';
      movePin.style.left = (movePin.offsetLeft - shift.x) + 'px';

      var movePinMinX = locationMinX - shift.x;
      var movePinMinY = window.data.locationMinY - shift.y;

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
    movePin: movePin
  };
})();


