import { start } from '/scripts/general.js'
start();

import { SortBtns } from '/scripts/blocks/product-sort.js';
import { NonUseBtn } from './blocks/NonUseBtn.js';

//non use btn
const nonUseBtn = new NonUseBtn(
  ".pop-up-msg",
  ".pop-up-msg__msg",
  [
    {".primary-btn--category": "Извните, категории будут доступны позже. Мы уже работаем над этим."},
    {"#shops-menu-link": "Извините, магазины будут доступны позже. Мы уже работаем над ними."},
    {"#travel-menu-link": "Извините, поездки будут доступны позже. Мы уже работаем над ними."},
    {"#shops-menu-link": "Извините, магазины будут доступны позже. Мы уже работаем над ними."},
    {"#shops-menu-link": "Извините, магазины будут доступны позже. Мы уже работаем над ними."},
    {"#shops-menu-link": "Извините, магазины будут доступны позже. Мы уже работаем над ними."},
    {"#shops-menu-link": "Извините, магазины будут доступны позже. Мы уже работаем над ними."},
  ],
  ".pop-up-msg__warning-img",
)

//product sorter
const boxForProduct = document.querySelector(".marketplace__products");

function addProductInBox(photos, productLink, productName, price, date, ownerName, ownerLink, ownerRoom){
  let productPhotosString = `<ul class="product__change-photo-box">`;
  for (let photo of photos){
    productPhotosString += `
      <li class="product__change-photo-line"></li>
      <img src="${photo}" alt="Изображение товара" class="product__img">
    `;
  }
  productPhotosString += `</ul>`;
  
  const product = document.createElement("div");
  product.classList.add("product");
  product.classList.add("marketplace__product");
  product.innerHTML = `
    <a class="product__photo-container" href="${productLink}">
      <img src="${photos[0]}" alt="Фотография ${productName}" class="product__mobile-photo">`
      + productPhotosString +
    `</a>
    <div class="product__info-container">
      <h3 class="h3"><a class="product__name" href="${productLink}">${productName}</a></h3>
      <span class="product__price">${price}</span>
      <div class="product__more-info">
        <h4 class="h4"><a class="product__human" href="${ownerLink}">${ownerName}</a></h4>
        <div class="product__more-than">
          <span class="product__date">${date}</span>
          <span class="product__room">${ownerRoom}</span>
        </div>
      </div>
    </div>
  `;
  boxForProduct.append(product);
}

new SortBtns(
  ['sortByPopularity',
    () => {
      //top popularity
    },
    () => {
      //down popularity
    }],
  ['sortByDate',
    () => {
      //top date
    },
    () => {
      //down date
    }],
  ['sortByPrice',
    () => {
      //top price
    },
    () => {
      //down price
    }]
);

const photosForProduct = [
  "source/product_img/f1.jpg",
  "source/product_img/f2.jpg",
  "source/product_img/f1.jpg",
  "source/product_img/f2.jpg",
]

addProductInBox(photosForProduct, "link", "Название продукта 1", 100, "11 февраля", "Артём Бобцов", "link owner", "5501");


//click also product btn
document.querySelector(".marketplace__also-btn").addEventListener("click", (event) => {
  event.target.style.display = "none";
  document.querySelector(".marketplace__load-also-btn").style.display = "block";
});