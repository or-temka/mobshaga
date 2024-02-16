export class SinglePhotoUploader {

  photo = null;

  //inputSelector - (string) селектор Input, через который загружаем одно фото
  //viewPhotoSelector - (array<string>) селектор/ы img, которые будут отображать загруженное изображение
  //options: (obj)
    //maxPhotoValue - (number) - максимальный размер фото (в байтах)
    //inputLabelSelector - (string) селектор лейбла для input
    //imgContainer - (obj) Контейнер для изображений:
      //selector - (string) селектор контейнера
      //visibleImgContainerWhenEmpty - (boolean) Показывать блок с фото, когда фото ещё не загружено или нет

  constructor (inputSelector, viewPhotoSelectors, options = {}){
    this.input = document.querySelector(inputSelector);
    this.input.setAttribute("accept", ".jpg,.jpeg,.png");
    this.input.removeAttribute("multiple");
    this.input.addEventListener("change", this._imgUpload.bind(this));

    this.viewPhotos = [];
    for (let selector of viewPhotoSelectors){
      this.viewPhotos.push(document.querySelectorAll(selector));
    }

    // imgContainer:
    if (options.imgContainer?.selector){
      this.imgContainer = document.querySelector(options.imgContainer.selector);
    
      this.visibleImgContainerWhenEmpty = options.imgContainer.visibleImgContainerWhenEmpty != undefined
        ? options.imgContainer.visibleImgContainerWhenEmpty
        : true
      if (!this.visibleImgContainerWhenEmpty){
        this.imgContainer.style.display = "none";
      }
    }

    // some options
    if (options.inputLabelSelector) {
      this.inputLabel = document.querySelector(options.inputLabelSelector);
    }
    this.maxPhotoValue = Number.isInteger(options.maxPhotoValue)
      ? options.maxPhotoValue
      : 4190000; //+-4 Mb
    
  }

  _imgUpload(event){
    //save photo in class
    if (!event.target.files.length){ return };

    let uploadedPhoto = event.target.files[0];
    if (uploadedPhoto.type.match('image') === null){ return }
    
    const fileReader = new FileReader();

    fileReader.readAsDataURL(uploadedPhoto);

    fileReader.onload = (event) => {

      //photoValue check
      if (event.loaded > this.maxPhotoValue){
        if (!this.visibleImgContainerWhenEmpty){
          this.imgContainer.style.display = "none";
        }
        this.inputLabel.innerHTML = "Слишком большой размер файла";
        this.inputLabel.style.color = "red";
        this.photo = null;
        return;
      }

      this.photo = event.target.result;

      //change viewPhoto and container 
      if (!this.visibleImgContainerWhenEmpty){
        this.imgContainer.style.display = "block";
      }

      this.viewPhotos.forEach((viewPhotoArray) => {
        viewPhotoArray.forEach((viewPhoto) => {
          viewPhoto.src = this.photo;
        })
      });
    };

    //change inputLabel
    this.inputLabel.innerHTML = event.target.files[0].name;
    this.inputLabel.style.color = "#333";

  }


}