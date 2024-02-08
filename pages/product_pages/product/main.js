import { start } from '/scripts/general.js'
start();

import { ChangerProductPhoto } from '/scripts/blocks/change-product-photo.js';
import { Swiper } from '/node_modules/swiper/swiper-bundle.js';
import { SwipeListener } from '/scripts/blocks/swipeListener.js';

let blurPhotoClass = 'product-photo-blur';
let bigPhotoClass = 'product-photo';
let photos = {};

document.getElementById('photos-of-product').querySelectorAll('.product-page__also-photo').forEach((photoELem) => {
  let photoClass = photoELem.classList[0];
  let photoSrc = photoELem.getAttribute('src');
  photos[photoClass] = photoSrc;
})

let photoChanger = new ChangerProductPhoto(
  bigPhotoClass,
  blurPhotoClass,
  photos,
  'product-page__also-photo--active',
  'prevPhotoBtn',
  'nextPhotoBtn'
);

//Открытие полноразмерного фото товара
document.getElementById('full-photo-opener').addEventListener('click', () => {
  document.getElementById('full-product-photo').style.display = "block";
});

document.querySelectorAll('.closer-full-photo').forEach((closerElem) => {
  closerElem.addEventListener('click', () => {
    document.getElementById('full-product-photo').style.display = "none";
  })
})

//Работа со свайпером
const swiper = new Swiper(".photo-swiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction"
  },
  spaceBetween: 30,
  mousewheel: true,
  keyboard: true,
});

document.querySelector('.full-mobile-photo__back-btn').addEventListener("click", () => {
  closeFullMobilePhoto()
});

function closeFullMobilePhoto(){
  document.body.style.overflow = "initial";
  document.querySelector('.full-mobile-photo').style.display = "none";
}

swiper.forEach((swipe) => {
  swipe.on('slideChange', () => {
    document.querySelector('.full-mobile-photo__photo-num-text').innerHTML = swipe.activeIndex + 1;
    swiper.forEach((el) => {
      el.slideTo(swipe.activeIndex);
    });
  });
});

document.querySelector('.product-page__swiper').addEventListener("click", () => {
  document.body.style.overflow = "hidden";
  document.querySelector('.full-mobile-photo').style.display = "block";
  document.querySelector('.full-mobile-photo__max-photo-text').innerHTML = swiper[1].slides.length;
});

//Свайпер закрытия фото в full для мобилки
const swipeDown = new SwipeListener(".full-mobile-photo", {
  swipeSide: "down",
  minSwipeLength: 100,
  handlerEnd: closeFullMobilePhoto,
  walkingBlocks: ".full-mobile-photo__swiper-slide",
  transparencyBlocks: ".full-mobile-photo",
});
const swipeUp = new SwipeListener(".full-mobile-photo", {
  swipeSide: "up",
  minSwipeLength: 100,
  handlerEnd: closeFullMobilePhoto,
  walkingBlocks: ".full-mobile-photo__swiper-slide",
  transparencyBlocks: ".full-mobile-photo",
});