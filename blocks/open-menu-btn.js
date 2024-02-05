export class OpenMenuBtn{
  constructor(btnId, handlerOpen, handlerClose){
    this.btn = document.getElementById(btnId);
    this.opened = false;
    this.openFunc = handlerOpen;
    this.closeFunc = handlerClose;
    this.btn.addEventListener('click', () => this.opened ? this.closeMenu() : this.openMenu());
  }
  openMenu(){
    this.btn.classList.remove('open-menu-btn--not-active');
    this.btn.classList.add('open-menu-btn--active');
    this.opened = true;
    this.openFunc();
  }
  closeMenu(){
    this.btn.classList.remove('open-menu-btn--active');
    this.btn.classList.add('open-menu-btn--not-active');
    this.opened = false;
    this.closeFunc();
  }
}