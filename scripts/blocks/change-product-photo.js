
export class ChangerProductPhoto{
  //bigPhotoId - само большое фото (его id елемента)
  //blurBackId - задний размытый план большого фото (его id елемента)
  //photos -> {classElem: photoSrc} Объект с ключом Id мини фото элемента
  // и значением ссылкой на фото
  //activePhotoClass - название активного класса, чтобы выбранное фото подсвечивалось
  //prevPhotoBtnId и nextPhotoBtnId - id кнопок, с помощью которых пролистываем фото вперед и назад
  constructor(bigPhotoClass, blurBackClass, photos, activePhotoClass, prevPhotoBtnClass, nextPhotoBtnClass){
    this.bigPhotos = document.querySelectorAll('.' + bigPhotoClass);
    this.blurPhotos = document.querySelectorAll('.' + blurBackClass);
    let tempArrayOfPhoto = [];
    this.maxPhotoId = -1;
    for (let photoClass in photos){
      tempArrayOfPhoto.push({[photoClass]: photos[photoClass]})
      this.maxPhotoId++;
    }
    this.photos = tempArrayOfPhoto;
    this.nowPhotoNum = 0;

    this.activePhotoClass = activePhotoClass;
    //Установка слушателей на кнопки фото
    for (let photoClass in photos){
      document.querySelectorAll('.' + photoClass).forEach((miniPhoto) => {
        miniPhoto.addEventListener('click', () => {
          this.setPhoto(photoClass);
          this.setActiveBtn(photoClass);
        })
      })

      document.querySelectorAll('.' + photoClass).forEach((miniPhoto) => {
        miniPhoto.addEventListener('click', () => {
          this.setPhoto(photoClass);
          this.setActiveBtn(photoClass);
        })
      })
    }
    //Назначение кнопок вперед и назад фото
    document.querySelectorAll('.' + prevPhotoBtnClass).forEach((btn) => {
      btn.addEventListener('click', () => {
        this.prevPhoto()
        let activePhotoBtnId = Object.keys(this.photos[this.nowPhotoNum])[0];
        this.setActiveBtn(activePhotoBtnId);
      });
    });
    document.querySelectorAll('.' + nextPhotoBtnClass).forEach((btn) => {
      btn.addEventListener('click', () => {
        this.nextPhoto()
        let activePhotoBtnId = Object.keys(this.photos[this.nowPhotoNum])[0];
        this.setActiveBtn(activePhotoBtnId);
      });
    });
    this.setFirstPhoto();
  }

  setActiveBtn(photoClass){
    //Сброс всех классов
    this.photos.forEach((btn) => {
      let btnClass = Object.keys(btn)[0];
      document.querySelectorAll('.' + btnClass).forEach((btnForDelClass) => {
        btnForDelClass.classList.remove(this.activePhotoClass);
      });
    });
    //Установка активного
    document.querySelectorAll('.' + photoClass).forEach((btnForAdd) => {
      btnForAdd.classList.add(this.activePhotoClass);
    });
  }

  setFirstPhoto(){
    let photoSrc = Object.values(this.photos[0])[0]
    this._setPhotoSrcForBigAndBlurPhoto(photoSrc);
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
    this._setPhotoSrcForBigAndBlurPhoto(photoSrc);
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
    this._setPhotoSrcForBigAndBlurPhoto(photoSrc);
  }

  setPhoto(photoId){
    this.photos.forEach((photoObj, index) => {
      if (Object.keys(photoObj)[0] == photoId){
        this.nowPhotoNum = index;
        let photoSrc = Object.values(photoObj)[0];
        this._setPhotoSrcForBigAndBlurPhoto(photoSrc);
      }
    })
  }

  _setPhotoSrcForBigAndBlurPhoto(photoSrc){
    this.bigPhotos.forEach((photoElem) => {
      photoElem.src = photoSrc;
    })
    this.blurPhotos.forEach((photoElem) => {
      photoElem.src = photoSrc;
    })
  }
}