export class RentPriceSet{
  constructor(){
    this.parentForFirstBlock = document.getElementById("price-rent-inputs");
    this.parentForSecondBlock = document.getElementById("price-rent-selects");
    this.firstBlockId = "price-rent-price-";
    this.secondBlockId = "price-rent-time-";
    this.delBtnContainer = document.getElementById("price-rent-del-btns");
    this.delBtnId = "price-rent-del-btn-";

    this.lastId = 1;

    //add eventListeners
    document.getElementById("more-price-rent-fields-btn").addEventListener("click", this.addField.bind(this));
    
  }

  _createElements(){
    //input
    this.input = document.createElement("input");
    this.input.classList.add("data-edit__input-text");
    this.input.classList.add("input");
    this.input.type = "text";
    this.input.placeholder = "Цена в рублях";

    //select
    this.select = document.createElement("select");
    this.select.classList.add("data-edit__select");
    this.select.classList.add("select");
    this.select.innerHTML = `
      <option data-time-rent="1hour" class="data-edit__option select__option" value="1hour" selected>1 час</option>
      <option data-time-rent="2hours" class="data-edit__option select__option" value="2hours">2 часа</option>
      <option data-time-rent="12hours" class="data-edit__option select__option" value="12hours">12 часов</option>
      <option data-time-rent="1day" class="data-edit__option select__option" value="1day">1 день</option>
      <option data-time-rent="2days" class="data-edit__option select__option" value="2days">2 дня</option>
      <option data-time-rent="3days" class="data-edit__option select__option" value="3days">3 дня</option>
      <option data-time-rent="4days" class="data-edit__option select__option" value="4days">4 дня</option>
      <option data-time-rent="5days" class="data-edit__option select__option" value="5days">5 дней</option>
      <option data-time-rent="1week" class="data-edit__option select__option" value="1week">1 неделя</option>
      <option data-time-rent="2weeks" class="data-edit__option select__option" value="2weeks">2 недели</option>
      <option data-time-rent="1month" class="data-edit__option select__option" value="1month">1 месяц</option>
    `;

    //delBtn
    this.delBtn = document.createElement("div");
    this.delBtn.classList.add("data-edit__del-btn-container");
    this.delBtn.innerHTML = `<div class="new-product-page--del-rent-btn data-edit__del-field-btn"></div>`;
    
  }

  _setOrder(){
    let inputIds = 1;
    this.parentForFirstBlock.childNodes.forEach((elem) => {
      if (elem.className == "data-edit__input-text input"){
        elem.id = "price-rent-price-" + inputIds;
        inputIds++;
      }
    });

    let selectIds = 1;
    this.parentForSecondBlock.childNodes.forEach((elem) => {
      if (elem.className == "data-edit__select select"){
        elem.id = "price-rent-time-" + selectIds;
        selectIds++;
      }
    });

    let delBtnIds = 1;
    this.delBtnContainer.childNodes.forEach((elem) => {
      if (elem.className == "data-edit__del-btn-container"){
        elem.id = "price-rent-del-btn-" + delBtnIds;
        elem.setAttribute("data-field-id", delBtnIds);
        elem.setAttribute("onclick", "delField(" + delBtnIds + ")")
        delBtnIds++;
      }
    });

    this.lastId--;
  }

  addField(){
    if (this.lastId > 10){
      return false;
    }
    this._createElements();
    let newId = this.lastId + 1;
    this.input.id = this.firstBlockId + newId;
    this.select.id = this.secondBlockId + newId;
    this.delBtn.id = this.delBtnId + newId;
    this.delBtn.setAttribute("data-field-id", newId);
    this.delBtn.setAttribute("onclick", "delField(" + newId + ")")
    this.parentForFirstBlock.append(this.input);
    this.parentForSecondBlock.append(this.select);
    this.delBtnContainer.append(this.delBtn);
    this.lastId++;
  }

  delField(fieldId){

    console.log(fieldId);

    let inputForDel = document.getElementById("price-rent-price-" + fieldId);
    this.parentForFirstBlock.removeChild(inputForDel);

    let selectForDel = document.getElementById("price-rent-time-" + fieldId);
    this.parentForSecondBlock.removeChild(selectForDel);

    let delBtnForDel = document.getElementById("price-rent-del-btn-" + fieldId);
    this.delBtnContainer.removeChild(delBtnForDel);

    this._setOrder();
  }
}