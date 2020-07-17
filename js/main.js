'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  var adverts = [];

  var renderAdverts = function () {
    if (adverts.length === 0) {
      window.backend.load(function (loadedAdverts) {
        adverts = loadedAdverts;

        window.map.renderAdverts(adverts);
      }, window.message.showError);
    } else {
      window.map.renderAdverts(adverts);
    }
  };

  var activate = function () {
    window.map.removeMainPinClickListener(onMainPinClick);
    window.map.removeMainPinKeyDownListener(onMainPinKeyDown);
    window.map.setMapFormChangeListener(renderAdverts);

    window.map.setEnabled(true);
    window.form.setEnabled(true);

    renderAdverts();
  };

  var deactivate = function () {
    window.map.setMainPinClickListener(onMainPinClick);
    window.map.setMainPinKeyDownListener(onMainPinKeyDown);
    window.map.removeMapFormChangeListener(renderAdverts);

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

  window.move.init(mainPin, function () {
    window.form.setAddress(window.map.getMainPinLocation());
  });

  window.form.setSubmitListener(function (formData) {
    window.backend.save(formData, function () {
      window.message.showSuccess();
      deactivate();
    }, window.message.showError);
  });

  window.form.setResetListener(deactivate);
})();
