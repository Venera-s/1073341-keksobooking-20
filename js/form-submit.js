'use strict';

(function () {
  var successHandler = function () {
    window.message.createForSubmit('#success', '.success');

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var errorHandler = function () {
    window.message.createForSubmit('#error', '.error');

    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', onErrorButtonClick);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  var onErrorButtonClick = function (evt) {
    evt.preventDefault();
    closeMessage();
  };

  var onDocumentKeydown = function (evt) {
    evt.preventDefault();
    if (evt.key === window.util.KEY_ESC) {
      closeMessage();
    }
  };

  var onDocumentClick = function (evt) {
    evt.preventDefault();
    closeMessage();
  };

  var closeMessage = function () {
    var errorMessage = document.querySelector('.error');
    var successMessage = document.querySelector('.success');

    if (successMessage) {
      successMessage.remove();
    } else {
      errorMessage.remove();
    }

    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(window.form.adForm), successHandler, errorHandler);
  };

  var setAdFormSubmitListener = function () {
    window.form.adForm.addEventListener('submit', onAdFormSubmit);
  };

  var removeAdFormSubmitListener = function () {
    window.form.adForm.removeEventListener('submit', onAdFormSubmit);
  }; // не использовала нигде

  window.formSubmit = {
    setAdFormSubmitListener: setAdFormSubmitListener,
    removeAdFormSubmitListener: removeAdFormSubmitListener,
  };
})();
