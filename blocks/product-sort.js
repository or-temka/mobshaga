//Получаем массив независимых кнопок от других кнопок
export class SortBtns{
  btns = [];
  constructor(...btns){
    btns.forEach((btn) => {
      let btnId = btn[0];
      let sortBtn = document.getElementById(btnId);
      let btnObj = {
        id: btnId,
        btn: sortBtn,
        upFunc(){btn[1]()},
        downFunc(){btn[2]()},
        position: "none" //-- none, up, down
      }
      this.btns.push(btnObj);
      sortBtn.addEventListener("click", () => {
        this.changeSortBtn(btnObj);
      });
    });
  }
  changeSortBtn(btnObj){
    let sortBtn = btnObj.btn;
    if (btnObj.position == "up") { //Изменяем на убывание
      this.clearSort();
      sortBtn.classList.add('product-sort__text-of-sort--down');
      btnObj.position = "down";
      btnObj.downFunc();
    } else if (btnObj.position == "down") { //На возрастание
      this.clearSort();
      sortBtn.classList.add('product-sort__text-of-sort--up');
      btnObj.position = "up";
      btnObj.upFunc();
    } else { //Убираем изначальный кружок
      this.clearSort();
      sortBtn.classList.add('product-sort__text-of-sort--up');
      btnObj.position = "up";
      btnObj.upFunc();
    }
  }
  clearSort(){ //Очистка всех сортировок (на кружок) (Может быть только одна сортировка)
    this.btns.forEach((btn) => {
      btn.positon = "none";
      btn.btn.classList.remove('product-sort__text-of-sort--up');
      btn.btn.classList.remove('product-sort__text-of-sort--down');
    });
  }
}

