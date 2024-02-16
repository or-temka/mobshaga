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
const inputForDisable = document.querySelector(".sign-up__input--hotel-room");
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