'user strict';

var AMOUNT_OF_ANNOUNCEMENTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAX_AMOUNT_ROOMS = 20;
var MAX_AMOUNT_GUESTS = 10;
var MIN_VALUE = 0;
var MIN_VALUE_Y = 130;
var MAX_VALUE_Y = 630;
var MAX_PRICE = 1000000;
var CHEKINS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var locationX = document.querySelector('.map').clientWidth;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomElement = function (elements) {
    return elements[getRandomIntInclusive(MIN_VALUE, elements.length - 1)];
}

// var getRandomPart = function (elements) {
//     var benefits = elements.length;

// }

//Функция для создания массива из 8 сгенерированных JS-объектов. Каждый объект массива ‐ описание похожего объявления неподалёку. 

var getAnnouncements = function (amountAnnouncements) {
    var announcements = [];
    for (var i = 0; i < amountAnnouncements; i++) {
        var positionX = getRandomIntInclusive(MIN_VALUE, locationX);
        var positionY = getRandomIntInclusive(MIN_VALUE_Y, MAX_VALUE_Y);

        announcements.push({
            author: {
                avatar: '../img/avatars/user0' + (i + 1) + '.png'
            },
            offer: {
                title: 'Ваше объявление',
                address: '' + positionX + ', ' + positionY,
                price: getRandomIntInclusive(MIN_VALUE, MAX_PRICE),
                type: getRandomElement(TYPES),
                rooms: getRandomIntInclusive(MIN_VALUE, MAX_AMOUNT_ROOMS),
                guests: getRandomIntInclusive(MIN_VALUE, MAX_AMOUNT_GUESTS),
                checkin: getRandomElement(CHEKINS),
                checkout: getRandomElement(CHEKINS),
                features: getRandomPart(FEATURES),
                    description: 'Продам комфортабельную квартиру',
                photos: getRandomPart(PHOTOS)
            },
            location: {
                x: positionX,
                y: positionY
            }
        }
        );
    }
    return announcements;
};

var allAnnnouncements = getAnnouncements(AMOUNT_OF_ANNOUNCEMENTS);



var pinButton = document.querySelector('#pin').content.querySelector('.map__pin');
var templateButton = pinButton.cloneNode(true);

var createUsers = function (users) {
    templateButton.style.left = users.positionX';
    users.style.top = users.positionY;
}

// var allUsers = createUsers(announcements);



