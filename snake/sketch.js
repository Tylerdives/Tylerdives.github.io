// State Variables
// Tyler Boechler
// September 28th, 2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let snake;

let middleX;
let middleY;

let movementTimer = 1000;

let directionState;
let gameState;

let initialTime;
let foodPresent;

let foodX, foodY;
let heightCubes;
let widthCubes;

let addSnake;

function setup() {
  createCanvas(windowWidth, windowHeight);
  middleX = width/2;
  middleY = height/2;
  foodPresent = false;
  addSnake = false;


  snake = {
    xValuesList: [0, 35],
    yValuesList: [0, 0],
    size: 38,
    speed: 40,
  };

  heightCubes = floor(height/snake.speed);
  widthCubes = floor(width/snake.speed);

  directionState = 3;

  initialTime = 0;

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
    // fill(220);
    // rect(width , 100, width - 200, 500)
    drawGrid();
    drawFood();
    drawSnakeCubes();
    moveSnake();

    // hitSnake();
    // touchingFood();
  }
  else if (gameState === 3) {
    frameRate(60);
    //pause stuffs
  }
  else {
    frameRate(60);
    //Game over stuffs
  }
}

function menu() {

}

function drawGrid() {
  stroke(30);
  for(let i = 1; i <= floor(width/snake.speed); i++) {
    line(i * snake.speed, 0, i * snake.speed, floor(height/snake.speed) * snake.speed);
  }
  for(let j = 1; j <= floor(height/snake.speed); j++) {
    line(0, j * snake.speed, floor(width/snake.speed) * snake.speed, j * snake.speed);
  }
}

function moveSnake() {
  // let elapsedTime = millis() - initialTime;

  if (directionState === 1) {
    //LEFT
    // && elapsedTime >= movementTimer) {
    snake.xValuesList.splice(0 , 0, snake.xValuesList[0] - snake.speed);
    snake.yValuesList.splice(0, 0, snake.yValuesList[0]);

    snake.xValuesList = shorten(snake.xValuesList);
    snake.yValuesList = shorten(snake.yValuesList);
  }

  else if (directionState === 2) {
    //UP
  // && elapsedTime >= movementTimer) {

    snake.xValuesList.splice(0, 0, snake.xValuesList[0]);
    snake.yValuesList.splice(0 , 0, snake.yValuesList[0] - snake.speed);

    snake.xValuesList = shorten(snake.xValuesList);
    snake.yValuesList = shorten(snake.yValuesList);
  }

  else if (directionState === 3) {
    //RIGHT
    // && elapsedTime >= movementTimer) {
    snake.xValuesList.splice(0 , 0, snake.xValuesList[0] + snake.speed);
    snake.yValuesList.splice(0, 0, snake.yValuesList[0]);

    snake.xValuesList = shorten(snake.xValuesList);
    snake.yValuesList = shorten(snake.yValuesList);
  }

  else if (directionState === 4) {
    //DOWN
    // && elapsedTime >= movementTimer) {
    snake.yValuesList.splice(0 , 0, snake.yValuesList[0] + snake.speed);
    snake.xValuesList.splice(0, 0, snake.xValuesList[0]);

    snake.xValuesList = shorten(snake.xValuesList);
    snake.yValuesList = shorten(snake.yValuesList);
  }

  // initialTime = millis();
  if (addSnake) {
    if (directionState === 1) {
      snake.xValuesList.splice(0 , 0, snake.xValuesList[0] - snake.speed);
      snake.yValuesList.splice(0, 0, snake.yValuesList[0]);
    }
    else if (directionState === 2) {
      snake.xValuesList.splice(0, 0, snake.xValuesList[0]);
      snake.yValuesList.splice(0 , 0, snake.yValuesList[0] - snake.speed);
    }
    else if (directionState === 3) {
      snake.xValuesList.splice(0 , 0, snake.xValuesList[0] + snake.speed);
      snake.yValuesList.splice(0, 0, snake.yValuesList[0]);
    }
    else if (directionState === 4) {
      snake.yValuesList.splice(0 , 0, snake.yValuesList[0] + snake.speed);
      snake.xValuesList.splice(0, 0, snake.xValuesList[0]);
    }
    addSnake = false;
  }

  if (snake.xValuesList[0] < 0) {
    snake.xValuesList.splice(0, 0, floor(width/snake.speed) * snake.speed - snake.speed);
    snake.xValuesList = shorten(snake.xValuesList);
  }

  else if(snake.xValuesList[0] > floor(width/snake.speed) * snake.speed - snake.speed) {
    snake.xValuesList.splice(0, 0, 0);
    snake.xValuesList = shorten(snake.xValuesList);
  }

  else if(snake.yValuesList[0] < 0) {
    snake.yValuesList.splice(0, 0, floor(height/snake.speed) * snake.speed - snake.speed);
    snake.yValuesList = shorten(snake.yValuesList);
  }

  else if(snake.yValuesList[0] > floor(height/snake.speed) * snake.speed - 2 * snake.speed) {
    snake.yValuesList.splice(0, 0, 0);
    snake.yValuesList = shorten(snake.yValuesList);
  }
}

function drawSnakeCubes() {
  fill(0, 255, 0);
  for (let listSpot = 0; listSpot < snake.xValuesList.length; listSpot ++) {
    rect(snake.xValuesList[listSpot], snake.yValuesList[listSpot], snake.size, snake.size);
  }
}

function drawFood() {
  if (!foodPresent) {

    foodX = random(widthCubes);
    foodY = random(heightCubes);
    foodY = round(foodY);
    foodX = round(foodX);
    //Make it so it can't spawn in the snake

    foodPresent = true;
  }
  if (touchingFood()) {
    foodPresent = false;
  }
  fill("red");
  ellipse(foodX * snake.speed - snake.speed/2, foodY * snake.speed  - snake.speed/2, 15, 15);

}

function touchingFood() {
  if ((foodX - 1) * snake.speed === snake.xValuesList[0]) {
    addSnake = true;
    foodPresent = false;
  }
}

function hitSnake() {

}

// function addSnake() {
//
// }


function keyTyped() {
  //LEFT
  if (key === "a" || key === "A") {
    directionState = 1;
  }
  //UP
  else if (key === "w" || key === "W") {
    directionState = 2;
  }
  //RIGHT
  else if (key === "d" || key === "D") {
    directionState = 3;
  }
  //DOWN
  else if (key === "s" || key === "S") {
    directionState = 4;
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
