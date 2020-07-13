'use strict';

(function () {
  var resetButton = document.querySelector('.ad-form__reset');

  var onResetButtonClick = function () {
    window.form.setAddress(window.map.MAIN_PIN_ROUND_HALF_HEIGHT);
    window.adForm.reset();
    mapForm.reset();
  };

  var setResetButtonClickListener = function () {
    resetButton.addEventListener('click', onResetButtonClick);
  };

  var removeResetButtonClickListener = function () {
    resetButton.removeEventListener('click', onResetButtonClick);
  };

  window.reset = {
    setResetButtonClickListener: setResetButtonClickListener,
    removeResetButtonClickListener: removeResetButtonClickListener
  };
})();
