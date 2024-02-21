export class NonUseBtn{
  nowNotificationActive = false;
  //notificationBlockSelector - block of notification for set display none and block
  //notificationTextSelector - for set text notification in block notification
  //btnsSelector - [array] of object {btnsSelector: string: textNotificationNonUse: string}
  //notificationDuration - duration of notification im ms [default = 4000]
  constructor(notificationBlockSelector, notificationTextSelector, btnsSelector, warningSignSelector, notificationDuration = 4000){
    this.notificationBlock = document.querySelector(notificationBlockSelector);
    this.notificationText = document.querySelector(notificationTextSelector);
    this.warningSign = document.querySelector(warningSignSelector);
    this.notificationDuration = notificationDuration;
    
    this.warningSign.style.display = "block";
    
    for (let btn of btnsSelector){
      const btnSelector = Object.keys(btn)[0];
      document.querySelectorAll(btnSelector).forEach((btnElem) => {
        btnElem.addEventListener("click", this._notUseOpenNotification.bind(this, btn[btnSelector]));
      });
    }

  }
  _notUseOpenNotification(textNotification){
    if (this.nowNotificationActive){ return; }
    this.nowNotificationActive = true;
    this.notificationText.textContent = textNotification;
    this.notificationBlock.style.display = "block";
    setTimeout(() => {
      this.notificationBlock.style.transform = "translateX(120%)";
      this.notificationBlock.style.animation = "pop-up-fly-reverse 0.2s ease-in-out";
      
      setTimeout(() => {
        this.notificationBlock.style.display = "none";
        this.notificationBlock.style.transform = "translateX(0%)";
        this.notificationBlock.style.animation = "pop-up-fly 0.2s ease-in-out";
        this.nowNotificationActive = false;
      }, 200);
    }, textNotification.length * 60);
  }
  
}