import {SortBtns} from './blocks/product-sort.js';
import {OpenMenuBtn} from './blocks/open-menu-btn.js';

new OpenMenuBtn('mobileMenuBtn', () => {
  document.getElementById('mobile-menu').style.display = "block";
  document.body.style.overflow = "hidden";
}, () => {
  document.getElementById('mobile-menu').style.display = "none";
  document.body.style.overflow = "initial";
});

new SortBtns(
  ['sortByPopularity',
    () => {
      console.log("Привет");
    },
    () => {
      console.log("Пока");
    }],
  ['sortByDate',
    () => {
      console.log("Привет22222");
    },
    () => {
      console.log("Пока222222");
    }],
  ['sortByPrice',
    () => {
      console.log("Привет333333");
    },
    () => {
      console.log("Пока333333");
    }]
);