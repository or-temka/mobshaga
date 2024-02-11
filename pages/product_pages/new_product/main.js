import { RentPriceSet } from "../../../scripts/blocks/RentPriceSet.js";
import { ImageUploader } from "../../../scripts/blocks/imageUploader.js";

const rentPriceSet = new RentPriceSet();

window.delField = (fieldId) => {
  rentPriceSet.delField(fieldId);
}


//Работа с загрузчиком фото

  //Кнопки удаления фото


document.querySelectorAll(".uploaded-imgs__del-img-btn").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    event.target.parentElement.remove();
  })
})

function photoBoxUpdate(){
  //Добавляем первому фото подпись
  const imgsBox = document.querySelector('.uploaded-imgs');

  const firstImgBox = imgsBox.querySelector('.uploaded-imgs__img-container');
  const blockInFirstElem = document.createElement("div");
  blockInFirstElem.classList.add("data-edit__main-photo-label");
  blockInFirstElem.classList.add("uploaded-imgs__main-photo-label");
  blockInFirstElem.innerHTML = `<span class="data-edit__main-photo-label-text uploaded-imgs__main-photo-label-text">Основное</span>`;
  firstImgBox.append(blockInFirstElem);
}

function afterDragAndDrop(){
  //Удаляем у всех фото подпись "основное фото", чтобы позже поставить это первому
  const imgsBox = document.querySelector('.uploaded-imgs');
  for (let imgBox of imgsBox.children){
    imgBox.querySelector(".uploaded-imgs__main-photo-label")?.remove();
    imgBox.style.opacity = "1";
    
  }
}

function duringDragAndDrop(){
  console.log("Я во время перетаскивания");
}

const imageUploader = new ImageUploader(
  ".input--file",
  ".uploaded-imgs",
  ".input--label-for-file",
  {
    delImgBtnSelector: ".uploaded-imgs__del-img-btn",
    draggableImg: true,
    photosUpdate: photoBoxUpdate,
    afterDragAndDrop: afterDragAndDrop,
    duringDragAndDrop: duringDragAndDrop,
  }
);