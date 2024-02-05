import { start } from '/scripts/general.js'
start();

import { SortBtns } from '/scripts/blocks/product-sort.js';


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