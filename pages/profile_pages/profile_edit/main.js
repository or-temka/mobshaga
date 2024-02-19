import { start } from '/scripts/general.js'
start();

import { SinglePhotoUploader } from '../../../scripts/blocks/singlePhotoUploader.js';
import { setPhonePattern } from '../../../scripts/blocks/setPhonePattern.js';

//tel pattern
setPhonePattern();

//profile photo uploader
const profilePhotoUploader = new SinglePhotoUploader(
  "#input-file-photo",
  [".profile-photo-upload__big-photo-img", ".profile-photo-upload__small-photo-img"],
  {
    inputLabelSelector: ".input--label-for-file",
    imgContainer: {
      selector: ".profile-photo-upload",
      visibleImgContainerWhenEmpty: false,
    }
  }
);

//set disabled hotel-room if person not from hotel
const inputForDisable = document.querySelector(".profile-edit__input--hotel-room");
inputForDisable.setAttribute("disabled", "true");
inputForDisable.setAttribute("placeholder", "Недоступно");
document.getElementById("hotel-number-select").addEventListener("change", (event) => {
  if (event.target.value === "null"){
    inputForDisable.setAttribute("disabled", "true");
    inputForDisable.setAttribute("placeholder", "Недоступно");
    inputForDisable.value = "";
  } else {
    inputForDisable.removeAttribute("disabled");
    inputForDisable.setAttribute("placeholder", "Например: 4301");
  }
});

//for open edit menu for btn ---------------------------------------------
const btnsForOpenPage = document.querySelectorAll(".profile-edit__menu-btn");
const selectForOpenPage = document.getElementById("mobile-menu-edit-category");

btnsForOpenPage.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    document.querySelectorAll(".profile-edit__menu-btn").forEach((elem) => {
      elem.classList.remove("profile-edit__menu-btn--active");
    });
    const pressedBtn = event.target;
    pressedBtn.classList.add("profile-edit__menu-btn--active");
    const pageForOpen = pressedBtn.getAttribute("data-edit-page");

    setPage(pageForOpen);

    selectForOpenPage.value = pageForOpen;
  });
})
//for select input
selectForOpenPage.addEventListener("change", (event) => {
  const pageForOpen = event.target.value;

  setPage(pageForOpen);

  btnsForOpenPage.forEach((btn) => {
    btn.classList.remove("profile-edit__menu-btn--active");
    if (btn.getAttribute("data-edit-page") == pageForOpen){
      btn.classList.add("profile-edit__menu-btn--active");
    }
  });

});

function setPage(pageForOpen){
  document
    .querySelector(".profile-edit__edit-content")
    .querySelectorAll(".profile-edit__edit-page")
    .forEach((page) => {
      page.style.display = "none";
    });

  document
    .querySelector(".profile-edit__edit-content")
    .querySelector(`[data-edit-page="${pageForOpen}"]`)
    .style.display = "block";
}
// ------------------------------------------------------------------------