'use strict';

(function () {
  var main = document.querySelector('main');

  var createMessageError = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: white; font-weight: bold; background-color: orange;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '35px';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var createMessage = function (tagName, className) {
    var messageTemplate = document.querySelector(tagName).content;
    var messageBlockTemplate = messageTemplate.querySelector(className);
    var message = messageBlockTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', message);
  };

  window.message = {
    createError: createMessageError,
    createForSubmit: createMessage,
  };
})();
