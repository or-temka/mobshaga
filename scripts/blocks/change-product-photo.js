export class ChangerProductPhoto{
  //bigPhotoId - само большое фото (его id елемента)
  //blurBackId - задний размытый план большого фото (его id елемента)
  //photos -> {idElem: photoSrc} Объект с ключом Id мини фото элемента
  // и значением ссылкой на фото
  //activePhotoClass - название активного класса, чтобы выбранное фото подсвечивалось
  //prevPhotoBtnId и nextPhotoBtnId - id кнопок, с помощью которых пролистываем фото вперед и назад
  constructor(bigPhotoId, blurBackId, photos, activePhotoClass, prevPhotoBtnId, nextPhotoBtnId){
    this.bigPhoto = document.getElementById(bigPhotoId);
    this.blurPhoto = document.getElementById(blurBackId);
    let tempArrayOfPhoto = [];
    this.maxPhotoId = -1;
    for (let photoId in photos){
      tempArrayOfPhoto.push({[photoId]: photos[photoId]})
      this.maxPhotoId++;
    }
    this.photos = tempArrayOfPhoto;
    this.nowPhotoNum = 0;
    

    this.activePhotoClass = activePhotoClass;
    //Установка слушателей на кнопки фото
    for (let photoId in photos){
      let photoBtn = document.getElementById(photoId);
      photoBtn.addEventListener('click', () => {
        this.setPhoto(photoId);
        this.setActiveBtn(photoId);
      })
    }
    //Назначение кнопок вперед и назад фото
    document.getElementById(prevPhotoBtnId).addEventListener('click', () => {
      this.prevPhoto()
      let activePhotoBtnId = Object.keys(this.photos[this.nowPhotoNum])[0];
      this.setActiveBtn(activePhotoBtnId);
    })
    document.getElementById(nextPhotoBtnId).addEventListener('click', () => {
      this.nextPhoto()
      let activePhotoBtnId = Object.keys(this.photos[this.nowPhotoNum])[0];
      this.setActiveBtn(activePhotoBtnId);
    })
    this.setFirstPhoto();
  }
  setActiveBtn(photoId){
    //Сброс всех классов
    this.photos.forEach((btn) => {
      let btnId = Object.keys(btn)[0];
      document.getElementById(btnId).classList.remove(this.activePhotoClass);
    });
    //Установка активного
    let photoBtn = document.getElementById(photoId);
    photoBtn.classList.add(this.activePhotoClass);
  }
  setFirstPhoto(){
    let photoSrc = Object.values(this.photos[0])[0]
    this.bigPhoto.src = photoSrc;
    this.blurPhoto.src = photoSrc;
    this.nowPhotoNum = 0;
    this.setActiveBtn(Object.keys(this.photos[0])[0]);
  }
  nextPhoto(){
    let photoSrc = "";
    if (this.nowPhotoNum != this.maxPhotoId) {
      photoSrc = Object.values(this.photos[this.nowPhotoNum + 1])[0]
      this.nowPhotoNum++;
    } else {
      photoSrc = Object.values(this.photos[0])[0]
      this.nowPhotoNum = 0;
    }
    this.bigPhoto.src = photoSrc;
    this.blurPhoto.src = photoSrc;
  }
  prevPhoto(){
    let photoSrc = "";
    if (this.nowPhotoNum != 0) {
      photoSrc = Object.values(this.photos[this.nowPhotoNum - 1])[0]
      this.nowPhotoNum--;
    } else {
      photoSrc = Object.values(this.photos[this.maxPhotoId])[0]
      this.nowPhotoNum = this.maxPhotoId;
    }
    this.bigPhoto.src = photoSrc;
    this.blurPhoto.src = photoSrc;
  }
  setPhoto(photoId){
    this.photos.forEach((photoObj, index) => {
      if (Object.keys(photoObj)[0] == photoId){
        this.nowPhotoNum = index;
        let photoSrc = Object.values(photoObj)[0];
        this.bigPhoto.src = photoSrc;
        this.blurPhoto.src = photoSrc;
      }
    })
  }
}