//Слушает в какую сторону был сделан свайп
//и в зависимости от этого выполняет функцию
export class SwipeListener {
  x = null;
  y = null;
  lastX = null;
  lastY = null;
  transparencyBlockOpacity = 1;
  
  //blockFowSwipe - блок, к которому применяется свайп (за который свайпим)

  //options:
  //swipeSide - сторона, в которую должен быть сделан swipe
  //("down", "up", "left", "right")
  //handlerEnd - Функция, которая выполнится в конце верного свайпа
  //minSwipeLength - Длина свайпа в px, при которой свайп будет засчитан и выполнится hadlerEnd
  //handlerDuration - Функция, которая будет происходить во время правильного свайпа
  //handlerNotDone - Функция, которая сработает, если свайп не был завершен
  //walkingBlocks - если есть блоки/блок, то блоки/блок будут смещаться в сторону свайпа
  //transparencyBlocks - если есть блоки/блок, то блоки/блок будут становиться прозрачными со временем при свайпе
  //transparencyBlocksSpeed - скорость, с которой блоки transparencyBlocks становятся прозрачными
  constructor(blockForSwipe, options){
    this.swipeSide = options.swipeSide ? options.swipeSide : "down";
    this.minSwipeLength = options.minSwipeLength ? options.minSwipeLength : 20;
    
    // Ходячие блоки при свайпе (если есть)
    if (options.walkingBlocks){
      this.walkingBlocks = [];
      if (Array.isArray(options.walkingBlocks)){
        options.walkingBlocks.forEach((blockSelector) => {
          document.querySelectorAll(blockSelector).forEach((block) => {
            this.walkingBlocks.push(block);
          })
        });
      } else {
        document.querySelectorAll(options.walkingBlocks).forEach((block) => {
          this.walkingBlocks.push(block);
        })
      }
    } else { this.walkingBlocks = null }

    // Теряющие прозрачность блоки при свайпе (если есть)
    if (options.transparencyBlocks){
      this.transparencyBlocks = [];
      if (Array.isArray(options.transparencyBlocks)){
        options.transparencyBlocks.forEach((blockSelector) => {
          document.querySelectorAll(blockSelector).forEach((block) => {
            this.transparencyBlocks.push(block);
          })
        });
      } else {
        document.querySelectorAll(options.transparencyBlocks).forEach((block) => {
          this.transparencyBlocks.push(block);
        })
      }
    } else { this.transparencyBlocks = null }
    this.transparencyBlocksSpeed = options.transparencyBlocksSpeed ? options.transparencyBlocksSpeed : 0.2;

    //Пользовательские функции обработки
    this.handlerEnd = options.handlerEnd ? options.handlerEnd : null;
    this.handlerDuration = options.handlerDuration ? options.handlerDuration : null;
    this.handlerNotDone = options.handlerNotDone ? options.handlerNotDone : null;
    
    //Слушатели свайпа
    this.swipeElements = document.querySelectorAll(blockForSwipe);
    this.swipeElements.forEach((elem) => {
      elem.addEventListener("touchstart", this._touchStart.bind(this), false);
      elem.addEventListener("touchmove", this._touchMove.bind(this), false);
      elem.addEventListener("touchend", this._touchEnd.bind(this), false);
    });
    
  }
  
  _touchStart(event){
    this.x = event.touches[0].clientX;
    this.y = event.touches[0].clientY;
  }

  _touchMove(event){
    this.lastX = event.touches[0].clientX;
    this.lastY = event.touches[0].clientY;
    const xDifference = this.lastX - this.x;
    const yDifference = this.lastY - this.y;
    const direction = Math.abs(xDifference) > Math.abs(yDifference) ? "horizontal" : "vertical";

    //Выполняется во время скролла на одном уровне с ним
    if (this.handlerDuration){
      if (this.swipeSide == "up"){
        if (direction == "vertical" && this.lastY < this.y){
          this.handlerDuration();
        }
      }
      else if (this.swipeSide == "down"){
        if (direction == "vertical" && this.lastY > this.y){
          this.handlerDuration();
        }
      }
      else if (this.swipeSide == "right"){
        if (direction == "horizontal" && this.lastX > this.x){
          this.handlerDuration();
        }
      }
      else if (this.swipeSide == "left"){
        if (direction == "horizontal" && this.lastX < this.x){
          this.handlerDuration();
        }
      }
    }

    //Смещение элемента walkingBlock в сторону правильного скролла
    if (this.walkingBlocks){
      if (this.swipeSide == "up"){
        if (direction == "vertical" && this.lastY < this.y){
          this.walkingBlocks.forEach((block) => {
            block.style.transform = "translateY(" + yDifference + "px)";
          })
        }
      }
      else if (this.swipeSide == "down"){
        if (direction == "vertical" && this.lastY > this.y){
          this.walkingBlocks.forEach((block) => {
            block.style.transform = "translateY(" + yDifference + "px)";
          })
        }
      }
      else if (this.swipeSide == "right"){
        if (direction == "horizontal" && this.lastX > this.x){
          this.walkingBlocks.forEach((block) => {
            block.style.transform = "translateX(" + xDifference + "px)";
          })
        }
      }
      else if (this.swipeSide == "left"){
        if (direction == "horizontal" && this.lastX < this.x){
          this.walkingBlocks.forEach((block) => {
            block.style.transform = "translateX(" + xDifference + "px)";
          })
        }
      }
    }


    //Появление прозрачности на transparencyBlocks при скролле
    if (this.transparencyBlocks){
      if (this.swipeSide == "up" || this.swipeSide == "down"){
        this.transparencyBlockOpacity = 1 - (Math.abs(yDifference) / this.minSwipeLength * this.transparencyBlocksSpeed);
      } else {
        this.transparencyBlockOpacity = 1 - (Math.abs(xDifference) / this.minSwipeLength * this.transparencyBlocksSpeed);
      }

      if (this.swipeSide == "up"){
        if (direction == "vertical" && this.lastY < this.y){
          this.transparencyBlocks.forEach((block) => {
            block.style.opacity = this.transparencyBlockOpacity;
          })
        }
      }
      else if (this.swipeSide == "down"){
        if (direction == "vertical" && this.lastY > this.y){
          this.transparencyBlocks.forEach((block) => {
            block.style.opacity = this.transparencyBlockOpacity;
          })
        }
      }
      else if (this.swipeSide == "right"){
        if (direction == "horizontal" && this.lastX > this.x){
          this.transparencyBlocks.forEach((block) => {
            block.style.opacity = this.transparencyBlockOpacity;
          })
        }
      }
      else if (this.swipeSide == "left"){
        if (direction == "horizontal" && this.lastX < this.x){
          this.transparencyBlocks.forEach((block) => {
            block.style.opacity = this.transparencyBlockOpacity;
          })
        }
      }
    }

  }

  _touchEnd(){ //В конце тача
    const xDifference = this.lastX - this.x;
    const yDifference = this.lastY - this.y;
    const direction = Math.abs(xDifference) > Math.abs(yDifference) ? "horizontal" : "vertical";

    //Выполняется по окончанию скролла на требуемую длину
    if (this.handlerEnd){
      if (this.swipeSide == "up"){
        if (Math.abs(yDifference) > this.minSwipeLength){
          if (direction == "vertical" && this.lastY < this.y){
            this.handlerEnd();
          } else if (this.handlerNotDone) { this.handlerNotDone() }
        } else if (this.handlerNotDone) { this.handlerNotDone() }
      }
      else if (this.swipeSide == "down"){
        if (Math.abs(yDifference) > this.minSwipeLength){
          if (direction == "vertical" && this.lastY > this.y){
            this.handlerEnd();
          } else if (this.handlerNotDone) { this.handlerNotDone() }
        } else if (this.handlerNotDone) { this.handlerNotDone() }
      }
      else if (this.swipeSide == "right"){
        if (Math.abs(xDifference) > this.minSwipeLength){
          if (direction == "horizontal" && this.lastX > this.x){
            this.handlerEnd();
          } else if (this.handlerNotDone) { this.handlerNotDone() }
        } else if (this.handlerNotDone) { this.handlerNotDone() }
      }
      else if (this.swipeSide == "left"){
        if (Math.abs(xDifference) > this.minSwipeLength){
          if (direction == "horizontal" && this.lastX < this.x){
            this.handlerEnd();
          } else if (this.handlerNotDone) { this.handlerNotDone() }
        } else if (this.handlerNotDone) { this.handlerNotDone() }
      }
    }

    // Сброс двигаемого блока
    if (this.walkingBlocks){
      this.walkingBlocks.forEach((block) => {
        block.style.transform = "translate(0px)";
      })
    }

    // Сброс прозрачности блоков
    if (this.transparencyBlocks){
      this.transparencyBlocks.forEach((block) => {
        block.style.opacity = 1;
        this.transparencyBlockOpacity = 1;
      })
    }


    
  }
}