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

    if (options.draggableImg){
      this._setDraggableImgs();
      this._setDraggableImgsForMobile();
    }
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

    let elemForDrag;
    let startX;
    let startY;
    let nowX;
    let nowY;
    let nowClientX;
    let nowClientY;

    for (let imgBlock of this.blockForPreview.children){
      imgBlock.addEventListener("touchstart", (event) => {

        document.body.style.overflow = "hidden";

        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;

        const elemForClone = imgBlock;
        elemForDrag = elemForClone.cloneNode(true);

        elemForDrag.style.position = "absolute";
        elemForDrag.style.zindex = "100";
        elemForDrag.querySelector('img').style.height = elemForClone.offsetHeight + "px";
        elemForDrag.querySelector('img').style.width = elemForClone.offsetWidth + "px";
        this.blockForPreview.append(elemForDrag);

        elemForDrag.style.left = elemForClone.getBoundingClientRect().left + window.scrollX + "px";
        elemForDrag.style.top = elemForClone.getBoundingClientRect().top + window.scrollY + "px";
      
        setTimeout(() => {
          imgBlock.style.opacity = "0";
        }, 300)
        

      });

      imgBlock.addEventListener("touchmove", (event) => {
        document.body.style.overflow = "hidden";

        imgBlock.style.opacity = "0";

        nowX = event.touches[0].pageX;
        nowY = event.touches[0].pageY;

        nowClientX = event.touches[0].clientX;
        nowClientY = event.touches[0].clientY;

        elemForDrag.style.left = nowX - elemForDrag.offsetWidth/2 + "px";
        elemForDrag.style.top = nowY - elemForDrag.offsetHeight/2 + "px";
      });

      imgBlock.addEventListener("touchend", () => {

        document.body.style.overflow = "initial";

        elemForDrag.remove();

        //Элемент, на который упал тач
        const endTouchElement = document.elementFromPoint(nowClientX, nowClientY);

        for (let imgBox of this.blockForPreview.children){
          if (imgBox === endTouchElement){
            this.blockForPreview.insertBefore(imgBlock, imgBox);
          }
        }

        imgBlock.style.opacity = "1";

        setTimeout(() => {imgBlock.style.opacity = "1";}, 250)

        if (this.afterDragAndDrop) { this.afterDragAndDrop() };
        if (this.photosUpdate) { this.photosUpdate() };

      });
    }
  }

}