export class ImageUploader {

  photos = {};

  maxPhotoAmount = 10;
  currentPhotoAmount = 0;

  //uploadBtnSelector - Кнопка input (type file), с помощью которой происходит загрузка файлов
  //blockForPreviewSelector - отображает превью загруженных картинок
  //options - параметры для управления загрузчиком
    //draggableImg - Разрешает перетаскивание фото
    //photosUpdate - функция, обновляющая контейнер с видом фото после выполнения действия над ними
    //afterDragAndDrop - Функция, которая выполняется после перетаскивания
    //duringDragAndDrop - Функция, которая выполняется во время перетаскивания
    //delImgBtnSelector - Кнопки для удаления фото
    constructor(uploadBtnSelector, blockForPreviewSelector, uploadBtnLabelSelector, options = {}){
    this.uploadBtn = document.querySelector(uploadBtnSelector);
    this.uploadBtnLabel = document.querySelector(uploadBtnLabelSelector);
    this.blockForPreview = document.querySelector(blockForPreviewSelector);

    //Назначение пользовательских функций
    if (options.photosUpdate) { this.photosUpdate = options.photosUpdate; }
    if (options.afterDragAndDrop) { this.afterDragAndDrop = options.afterDragAndDrop; }
    if (options.duringDragAndDrop) { this.duringDragAndDrop = options.duringDragAndDrop; }

    if (options.draggableImg){
      this._setDraggableImgs();
      this._setDraggableImgsForMobile();
    }

    this.options = options;

    //Настройки
    this.uploadBtn.setAttribute("accept", ".jpg,.jpeg,.png");
    this.uploadBtn.addEventListener("change", this._filesUpload.bind(this));

  }

  _setDelImgListener(imgBox){
    if (!this.options.delImgBtnSelector){
      return;
    }
    imgBox.querySelector(this.options.delImgBtnSelector).addEventListener("click", (event) => {
        event.target.parentElement.remove();
        this.currentPhotoAmount--;
    })
  }

  _filesUpload(event){
    if (!event.target.files.length){ return }

    const files = Array.from(event.target.files);

    files.forEach(file => {
      if (file.type.match('image') === null){ return }

      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        if (this.currentPhotoAmount >= this.maxPhotoAmount) { 
          return;
        }
        if (event.loaded > 2097152){
          console.log("больше 2 мбайт");
          return;
        }
        this.uploadImg(event.target.result);
      }
      fileReader.readAsDataURL(file);
    })

    
  }

  uploadImg(imgSrc){
    const imgBox = document.createElement("div");
    imgBox.classList.add("data-edit__uploaded-img-container");
    imgBox.classList.add("uploaded-imgs__img-container");
    imgBox.innerHTML = `
      <img class="data-edit__uploaded-img uploaded-imgs__img" src="${imgSrc}" alt="Загруженное изображение">
      <div class="data-edit__uploaded-img-del-btn uploaded-imgs__del-img-btn"></div>`

    this.blockForPreview.append(imgBox);

    if (this.options.draggableImg){
      this._setDraggableImgs();
      this._setDraggableImgsForMobile();
    }

    if (this.afterDragAndDrop) { this.afterDragAndDrop() };
    if (this.photosUpdate) { this.photosUpdate() };

    this._setDelImgListener(imgBox);

    this.currentPhotoAmount++;
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
        console.log(nowClientX, nowClientY);
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