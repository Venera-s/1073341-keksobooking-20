'use strict';

(function () {
  var Method = {
    GET: 'GET',
    POST: 'POST'
  };
  var MethodUrl = {
    URL_GET: 'https://javascript.pages.academy/keksobooking/data',
    URL_POST: 'https://javascript.pages.academy/keksobooking'
  };
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

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
    requestData(successHandler, errorHandler, Method.GET, MethodUrl.URL_GET).send();
  };

  var uploadData = function (data, successHandler, errorHandler) {
    requestData(successHandler, errorHandler, Method.POST, MethodUrl.URL_POST).send(data);
  };

  window.backend = {
    loadData: loadData,
    uploadData: uploadData,
  };
})();
