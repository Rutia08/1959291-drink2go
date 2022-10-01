let page = document.getElementsByTagName('body') [0];
let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-nav__toggle');
let mapPicture = document.querySelector('.map__picture');

page.classList.remove('nojs');

navToggle.onclick = function() {
  navMain.classList.toggle('main-nav--opened');
};

// карта
mapPicture.classList.add('visually-hidden');

const map = L.map('map-wrapper')
  .setView({
    lat: 59.968137,
    lng: 30.316272,
  }, 16);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/icons/map-pin.svg',
  iconSize: [38, 50],
  iconAnchor: [19, 50],
});

const marker = L.marker(
  {
    lat: 59.968137,
    lng: 30.316272,
  },
  {
    icon: mainPinIcon,
  },
);

marker.addTo(map);
