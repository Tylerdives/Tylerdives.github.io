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

function setup() {
  createCanvas(windowWidth, windowHeight);
  middleX = width/2;
  middleY = height/2;
  foodPresent = false;



  snake = {
    xValuesList: [0, 35],
    yValuesList: [0, 0],
    size: 33,
    speed: 35,
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
  for(let i = 1; i <= floor(width/snake.speed) - 1; i++) {
    line(snake.speed * i, 0, snake.speed * i, height - floor(height/snake.speed) - 4);
  }
  for(let j = 1; j <= floor(height/snake.speed); j++) {
    line(0 , snake.speed * j, width - 1.5 * floor(width/snake.speed) - 2, snake.speed * j);
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

  if (snake.xValuesList[0] < 0) {
    snake.xValuesList.splice(0, 0, width - 1.5 * floor(width/snake.speed) - 35);
    snake.xValuesList = shorten(snake.xValuesList);
  }
  else if(snake.xValuesList[0] > width -  1.5 * floor(width/snake.speed) - 70) {
    snake.xValuesList.splice(0, 0, 0);
    snake.xValuesList = shorten(snake.xValuesList);
  }
  else if(snake.yValuesList[0] < 0) {
    snake.yValuesList.splice(0, 0, height - floor(height/snake.speed) - 2 * snake.speed);
    snake.yValuesList = shorten(snake.yValuesList);
  }
  else if(snake.yValuesList[0] > height - floor(height/snake.speed) - 2 * snake.speed) {
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

    foodX = random(1, widthCubes - 1);
    foodY = random(1, heightCubes - 1);
    //Make it so it can't spawn in the snake

    foodPresent = true;
  }
  fill("red");
  ellipse(foodX * snake.speed, foodX, 15, 15);

}

function touchingFood() {

}

function hitSnake() {

}

function addSnake() {

}


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
