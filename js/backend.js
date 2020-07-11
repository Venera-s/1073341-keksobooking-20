'use strict';

(function () {
  var GET = 'GET';
  var POST = 'POST';
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var dataAdverts = [];

  var requestData = function (successHandler, errorHandler, method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          successHandler(xhr.response);
          break;

        case StatusCode.BAD_REQUEST:
          error = 'Плохой запрос';
          break;
        case StatusCode.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Запрашиваемый ресурс не найден';
          break;
        case StatusCode.SERVER_ERROR:
          error = 'Внутренняя ошибка сервера';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.open(method, url);
    return xhr;
  };

  var loadData = function (successHandler, errorHandler) {
    requestData(successHandler, errorHandler, GET, URL_GET).send();
  };

  var uploadData = function (data, successHandler, errorHandler) {
    requestData(successHandler, errorHandler, POST, URL_POST).send(data);
  };

  window.backend = {
    loadData: loadData,
    uploadData: uploadData,
    dataAdverts: dataAdverts
  };
})();
