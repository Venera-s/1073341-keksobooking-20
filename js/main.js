'use strict';

(function () {
  var ADVERTS_AMOUNT = 8;

  var mainPin = document.querySelector('.map__pin--main');

  window.form.toggleElementState();

  var activate = function () {
    window.map.removeMainPinClickListener(onMainPinClick);
    window.map.removeMainPinKeyDownListener(onMainPinKeyDown);
    window.form.setAddress(mainPin, window.pin.PIN_HEIGHT);
    window.map.setEnabled(true);
    window.form.setEnabled(true);
    window.form.toggleElementState();

    var adverts = window.data.getAnnouncements(ADVERTS_AMOUNT);
    window.map.renderAdverts(adverts);
  };

  var deactivate = function () {
    window.map.setMainPinClickListener(onMainPinClick);
    window.map.setMainPinKeyDownListener(onMainPinKeyDown);

    window.map.setEnabled(false);
    window.form.setEnabled(false);
  };

  var onMainPinClick = function (evt) {
    if (evt.button === window.util.MOUSE_LEFT) {
      activate();
    }
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.key === window.util.KEY_ENTER) {
      activate();
    }
  };

  deactivate();

  window.move.init(mainPin);

  window.main = {
    ADVERTS_AMOUNT: ADVERTS_AMOUNT,
  };
})();
