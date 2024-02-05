import { start } from '/scripts/general.js'
start();

import { ChangerProductPhoto } from '/scripts/blocks/change-product-photo.js';

let blurPhotoId = 'product-photo-blur';
let bigPhotoId = 'product-photo';
let photos = {};
document.getElementById('photos-of-product').querySelectorAll('.product-page__also-photo').forEach((photoELem) => {
  let photoId = photoELem.id;
  let photoSrc = photoELem.getAttribute('src');
  photos[photoId] = photoSrc;
})
let photoChanger = new ChangerProductPhoto(
  bigPhotoId,
  blurPhotoId,
  photos,
  'product-page__also-photo--active',
  'prevPhotoBtn',
  'nextPhotoBtn'
);