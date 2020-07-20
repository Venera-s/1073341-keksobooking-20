'use strict';

(function () {
  var TYPES_OF_FILES = ['gif', 'jpg', 'jpeg', 'png'];
  var WIDTH_AND_HEIGHT_OF_PHOTO = 60;
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var chooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var chooserPhotoOfHouse = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoOfHouseContainer = document.querySelector('.ad-form__photo-container');
  var previewPhotoOfHouse = document.querySelector('.ad-form__photo');

  var loadFile = function (element, preview) {
    var file = element.files[0];
    var fileName = file.name.toLowerCase();
    var matches = TYPES_OF_FILES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var createPreviewPhotoElement = function () {
    var blockPhoto = document.createElement('div');
    blockPhoto.classList.add('ad-form__photo');
    var blockImg = document.createElement('img');
    blockPhoto.appendChild(blockImg);
    blockImg.alt = 'Фото жилья';
    blockImg.width = WIDTH_AND_HEIGHT_OF_PHOTO;
    blockImg.height = WIDTH_AND_HEIGHT_OF_PHOTO;
    previewPhotoOfHouseContainer.appendChild(blockPhoto);
    return blockImg;
  };

  var onChooserAvatarChange = function () {
    loadFile(chooserAvatar, previewAvatar);
  };

  var onChooserPhotoOfHouseChange = function () {
    previewPhotoOfHouse.classList.add('hidden');
    loadFile(chooserPhotoOfHouse, createPreviewPhotoElement());
  };

  var setChooserAvatarChangeListener = function () {
    chooserAvatar.addEventListener('change', onChooserAvatarChange);
  };

  var setChooserHouseChangeListener = function () {
    chooserPhotoOfHouse.addEventListener('change', onChooserPhotoOfHouseChange);
  };

  var resetPreviewOfPhotos = function () {
    var photosOfHouse = document.querySelectorAll('.ad-form__photo:not(.ad-form__photo--template)');

    previewAvatar.src = DEFAULT_AVATAR;
    previewPhotoOfHouse.classList.remove('hidden');
    if (photosOfHouse) {
      photosOfHouse.forEach(function (element) {
        element.remove();
      });
    }
  };

  window.files = {
    setChooserAvatarChangeListener: setChooserAvatarChangeListener,
    setChooserHouseChangeListener: setChooserHouseChangeListener,

    resetPreviewOfPhotos: resetPreviewOfPhotos,
  };
})();
