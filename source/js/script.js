let page = document.getElementsByTagName('body') [0];
let navSite = document.querySelector('.site-nav');
let navToggle = document.querySelector('.site-nav__toggle');
let allInputs = document.querySelectorAll('.form__input');
let mapPicture = document.querySelector('.map__picture');

page.classList.remove('nojs');

navToggle.onclick = function() {
  navSite.classList.toggle('site-nav--opened');
};

// слайдер

var swiper = new Swiper(".mySwiper", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});

// disabled для label
for (let i = 0; i < allInputs.length; i++) {
  if (allInputs[i].disabled) {
    allInputs[i].parentNode.classList.add('form__label--disabled');
  }
}

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
  iconUrl: './img/map-pin.svg',
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
