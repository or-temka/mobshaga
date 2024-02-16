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

