export class ImageUploader {
  //uploadBtnSelector - Кнопка input (type file), с помощью которой происходит загрузка файлов
  //blockForPreviewSelector - отображает превью загруженных картинок
  //options - параметры для управления загрузчиком
    //draggableImg - Разрешает перетаскивание фото
    //photosUpdate - функция, обновляющая контейнер с видом фото после выполнения действия над ними
    //afterDragAndDrop - Функция, которая выполняется после перетаскивания
    //duringDragAndDrop - Функция, которая выполняется во время перетаскивания
    constructor(uploadBtnSelector, blockForPreviewSelector, options = {}){
    this.uploadBtn = document.querySelector(uploadBtnSelector);
    this.blockForPreview = document.querySelector(blockForPreviewSelector);

    //Назначение пользовательских функций
    if (options.photosUpdate) { this.photosUpdate = options.photosUpdate; }
    if (options.afterDragAndDrop) { this.afterDragAndDrop = options.afterDragAndDrop; }
    if (options.duringDragAndDrop) { this.duringDragAndDrop = options.duringDragAndDrop; }

    if (options.draggableImg){ this._setDraggableImgs() }
  }

  _setDraggableImgs(){ //Устанавливает перетаскивание фото
    for (let imgBlock of this.blockForPreview.children){
      imgBlock.setAttribute("draggable", "true");

      //Начало перетаскивания элемента
      imgBlock.addEventListener("dragstart", (event) => {
        event.target.classList.add('selected');
      })

      //Конец перетаскивания элемента
      imgBlock.addEventListener("dragend", (event) => {
        event.target.style.opacity = "1";
        event.target.classList.remove('selected');
        if (this.afterDragAndDrop) { this.afterDragAndDrop() };
        if (this.photosUpdate) { this.photosUpdate() };
      })
      
      //События во время перетаскивания
      imgBlock.addEventListener("dragover", (event) => {
        event.preventDefault();

        const activeElement = this.blockForPreview.querySelector(".selected");
        activeElement.style.opacity = "0";
        const currentElement = event.target;
        
        if (activeElement === currentElement){ return }

        const nextElement = (currentElement === activeElement.nextElementSibling) ?
          currentElement.nextElementSibling :
          currentElement;

        this.blockForPreview.insertBefore(activeElement, nextElement);
      })
    }
  }

  _setDraggableImgsForMobile(){

  }

}