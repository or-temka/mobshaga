import { start } from '/scripts/general.js'
start();

import { ChangerProductPhoto } from '/scripts/blocks/change-product-photo.js';

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