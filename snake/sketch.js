// State Variables
// Tyler Boechler
// September 28th, 2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let snake1;
let snake2;

let gameState;

let food1Present, food2Present;

let foodX1, foodY1;
let foodX2, foodY2;

let heightCubes;
let widthCubes;

let addSnake1, addSnake2;

function setup() {
  createCanvas(windowWidth, windowHeight);

  food1Present = false;
  food2Present = false;
  addSnake1 = false;
  addSnake2 = false;

  snake1 = {
    xValuesList: [0],
    yValuesList: [0],
    size: 38,
    speed: 40,
    directionState: 3,
  };

  snake2 = {
    xValuesList: [35],
    yValuesList: [0],
    size: 38,
    speed: 40,
    directionState: 1,
  };

  heightCubes = floor(height/snake1.speed);
  widthCubes = floor(width/snake1.speed);



  gameState = 2;
}

function draw() {
  if (gameState === 1) {
    frameRate(60);
    menu();
  }
  else if (gameState === 2) {
    frameRate(6);
    background(0);

    drawGrid();
    drawFood();

    drawSnakeCubes(snake1);
    drawSnakeCubes(snake2);

    moveSnake(snake1);
    moveSnake(snake2);

    // hitSnake();
    // touchingFood();
  }
  else if (gameState === 3) {
    frameRate(60);
  }

  else {
    frameRate(60);
    gameState = 0;
  }
}

function menu() {

}

function drawGrid() {
  stroke(30);
  for(let i = 1; i <= floor(width/snake1.speed); i++) {
    line(i * snake1.speed, 0, i * snake1.speed, floor(height/snake1.speed) * snake1.speed);
  }
  for(let j = 1; j <= floor(height/snake1.speed); j++) {
    line(0, j * snake1.speed, floor(width/snake1.speed) * snake1.speed, j * snake1.speed);
  }
}

function moveSnake(snakeNumber) {
  // let elapsedTime = millis() - initialTime;

  if (snakeNumber.directionState === 1) {
    //LEFT
    // && elapsedTime >= movementTimer) {
    snakeNumber.xValuesList.splice(0 , 0, snakeNumber.xValuesList[0] - snake1.speed);
    snakeNumber.yValuesList.splice(0, 0, snakeNumber.yValuesList[0]);

    snakeNumber.xValuesList = shorten(snakeNumber.xValuesList);
    snakeNumber.yValuesList = shorten(snakeNumber.yValuesList);
  }

  else if (snakeNumber.directionState === 2) {
    //UP
  // && elapsedTime >= movementTimer) {

    snakeNumber.xValuesList.splice(0, 0, snakeNumber.xValuesList[0]);
    snakeNumber.yValuesList.splice(0 , 0, snakeNumber.yValuesList[0] - snake1.speed);

    snakeNumber.xValuesList = shorten(snakeNumber.xValuesList);
    snakeNumber.yValuesList = shorten(snakeNumber.yValuesList);
  }

  else if (snakeNumber.directionState === 3) {
    //RIGHT
    // && elapsedTime >= movementTimer) {
    snakeNumber.xValuesList.splice(0 , 0, snakeNumber.xValuesList[0] + snake1.speed);
    snakeNumber.yValuesList.splice(0, 0, snakeNumber.yValuesList[0]);

    snakeNumber.xValuesList = shorten(snakeNumber.xValuesList);
    snakeNumber.yValuesList = shorten(snakeNumber.yValuesList);
  }

  else if (snakeNumber.directionState === 4) {
    //DOWN
    // && elapsedTime >= movementTimer) {
    snakeNumber.yValuesList.splice(0 , 0, snakeNumber.yValuesList[0] + snake1.speed);
    snakeNumber.xValuesList.splice(0, 0, snakeNumber.xValuesList[0]);

    snakeNumber.xValuesList = shorten(snakeNumber.xValuesList);
    snakeNumber.yValuesList = shorten(snakeNumber.yValuesList);
  }

  // initialTime = millis();
  if (addSnake1 && snakeNumber === snake1 || addSnake2 && snakeNumber === snake2) {
    if (snakeNumber.directionState === 1) {
      snakeNumber.xValuesList.splice(0 , 0, snakeNumber.xValuesList[0] - snake1.speed);
      snakeNumber.yValuesList.splice(0, 0, snakeNumber.yValuesList[0]);
    }
    else if (snakeNumber.directionState === 2) {
      snakeNumber.xValuesList.splice(0, 0, snakeNumber.xValuesList[0]);
      snakeNumber.yValuesList.splice(0 , 0, snakeNumber.yValuesList[0] - snakeNumber.speed);
    }
    else if (snakeNumber.directionState === 3) {
      snakeNumber.xValuesList.splice(0 , 0, snakeNumber.xValuesList[0] + snake1.speed);
      snakeNumber.yValuesList.splice(0, 0, snakeNumber.yValuesList[0]);
    }
    else if (snakeNumber.directionState === 4) {
      snakeNumber.yValuesList.splice(0 , 0, snakeNumber.yValuesList[0] + snake1.speed);
      snakeNumber.xValuesList.splice(0, 0, snakeNumber.xValuesList[0]);
    }
    if (addSnake1) {
      addSnake1 = false;
    }
    if (addSnake2) {
      addSnake2 = false;
    }
  }

  if (snakeNumber.xValuesList[0] < 0) {
    snakeNumber.xValuesList.splice(0, 0, floor(width/snake1.speed) * snake1.speed - snake1.speed);
    snakeNumber.xValuesList = shorten(snakeNumber.xValuesList);
  }

  else if(snakeNumber.xValuesList[0] > floor(width/snake1.speed) * snake1.speed - snake1.speed) {
    snakeNumber.xValuesList.splice(0, 0, 0);
    snakeNumber.xValuesList = shorten(snakeNumber.xValuesList);
  }

  else if(snakeNumber.yValuesList[0] < 0) {
    snakeNumber.yValuesList.splice(0, 0, floor(height/snake1.speed) * snake1.speed - snake1.speed);
    snakeNumber.yValuesList = shorten(snakeNumber.yValuesList);
  }

  else if(snakeNumber.yValuesList[0] > floor(height/snake1.speed) * snake1.speed - 2 * snake1.speed) {
    snakeNumber.yValuesList.splice(0, 0, 0);
    snakeNumber.yValuesList = shorten(snakeNumber.yValuesList);
  }
}

function drawSnakeCubes(snakeNumber) {
  if (snakeNumber === snake1) {
    fill(0, 255, 0);
  }
  else if (snakeNumber === snake2) {
    fill(0, 0, 255);
  }
  for (let listSpot = 0; listSpot < snakeNumber.xValuesList.length; listSpot ++) {
    rect(snakeNumber.xValuesList[listSpot], snakeNumber.yValuesList[listSpot], snake1.size, snake1.size);
  }
}

function drawFood() {
  if (!food1Present) {

    foodX1 = random(1, widthCubes);
    foodY1 = random(1, heightCubes);
    foodY1 = round(foodY1);
    foodX1 = round(foodX1);
    //Make it so it can't spawn in the snake

    food1Present = true;
  }

  if (!food2Present) {

    foodX2 = random(1, widthCubes);
    foodY2 = random(1, heightCubes);
    foodY2 = round(foodY2);
    foodX2 = round(foodX2);
    //Make it so it can't spawn in the snake

    food2Present = true;
  }

  touchingFood();

  //FOOD1
  fill(200, 0, 0);
  ellipse(foodX1 * snake1.speed - snake1.speed/2, foodY1 * snake1.speed  - snake1.speed/2, 15, 15);

  //FOOD2
  fill(200, 0, 0);
  ellipse(foodX2 * snake2.speed - snake2.speed/2, foodY2 * snake2.speed  - snake2.speed/2, 15, 15);
}

function touchingFood() {
  if ((foodX1 - 1) * snake1.speed === snake1.xValuesList[0] && (foodY1 - 1) * snake1.speed === snake1.yValuesList[0]) {
    addSnake1 = true;
    food1Present = false;
  }
  if ((foodX2 - 1) * snake2.speed === snake2.xValuesList[0] && (foodY2 - 1) * snake2.speed === snake2.yValuesList[0]) {
    addSnake2 = true;
    food2Present = false;
  }
  if ((foodX1 - 1) * snake2.speed === snake2.xValuesList[0] && (foodY1 - 1) * snake2.speed === snake2.yValuesList[0]) {
    addSnake2 = true;
    food1Present = false;
  }
  if ((foodX2 - 1) * snake1.speed === snake1.xValuesList[0] && (foodY2 - 1) * snake1.speed === snake1.yValuesList[0]) {
    addSnake1 = true;
    food2Present = false;
  }
}

function hitSnake() {
  // if (snake1.xValuesList.includes(snake2.xValuesList) && snake1.yValuesList.includes(snake2.yValuesList)) {
  //   gameState ++;
  // }
}




function keyTyped() {
  //LEFT
  if (key === "a" || key === "A") {
    snake1.directionState = 1;
  }
  //UP
  else if (key === "w" || key === "W") {
    snake1.directionState = 2;
  }
  //RIGHT
  else if (key === "d" || key === "D") {
    snake1.directionState = 3;
  }
  //DOWN
  else if (key === "s" || key === "S") {
    snake1.directionState = 4;
  }
  //--------------------------------------------------------------
  if (key === "j" || key === "J") {
    snake2.directionState = 1;
  }
  //UP
  else if (key === "i" || key === "I") {
    snake2.directionState = 2;
  //RIGHT
  }
  else if (key === "l" || key === "L") {
    snake2.directionState = 3;
  }
  //DOWN
  else if (key === "k" || key === "K") {
    snake2.directionState = 4;
  }

  //Pausing
  if (key === "p" || key === "P") {
    if (gameState === 2) {
      gameState = 3;
    }
    else if (gameState === 3) {
      gameState = 2;
    }
  }
}
