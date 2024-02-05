import { OpenMenuBtn } from './blocks/open-menu-btn.js';

export function start(){
  new OpenMenuBtn('mobileMenuBtn', () => {
    document.getElementById('mobile-menu').style.display = "block";
    document.body.style.overflow = "hidden";
  }, () => {
    document.getElementById('mobile-menu').style.display = "none";
    document.body.style.overflow = "initial";
  });
  
}