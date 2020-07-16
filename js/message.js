'use strict';

(function () {
  var main = document.querySelector('main');

  var successMsgTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorMsgTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var hideMessage = function () {
    var successMsg = document.querySelector('.success');
    if (successMsg) {
      successMsg.remove();
      return;
    }

    var errorMsg = document.querySelector('.error');
    if (errorMsg) {
      errorMsg.remove();
    }
  };

  var onDocumentKeyDown = function (evt) {
    if (evt.key === window.util.Key.ESCAPE) {
      hideMessage();
      document.removeEventListener('keydown', onDocumentKeyDown);
    }
  };

  var onDocumentClick = function () {
    hideMessage();
    document.removeEventListener('click', onDocumentClick);
  };

  var showSuccess = function () {
    var message = successMsgTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', message);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  };

  var showError = function (message) {
    var node = errorMsgTemplate.cloneNode(true);
    node.querySelector('.error__message').textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyDown);
  };

  window.message = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
