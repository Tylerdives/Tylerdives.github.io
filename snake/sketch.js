// State Variables
// Tyler Boechler
// September 28th, 2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let snakeSpeed;

let middleX;
let middleY;

let movementTimer = 1000;

let xValuesList;
let yValuesList;

let directionState;
let gameState;

let initialTime;
let snakeSize;
let numberOfCubes;

function setup() {
  createCanvas(windowWidth, windowHeight);
  middleX = width/2;
  middleY = height/2;

  xValuesList = [middleX];
  yValuesList = [middleY];

  directionState = 5;
  snakeSize = 33;
  snakeSpeed = 35;
  numberOfCubes = 1;

  initialTime = 0;

  gameState = 2;
}

function draw() {
  if (gameState === 1) {
    menu();
  }
  else if (gameState === 2) {
    background(0);
    // drawFood();
    moveSnake();
    drawSnakeCubes();

    // hitSnake();
    // touchingFood();
  }
  else if (gameState === 3) {
    //pause stuffs
  }
  else {
    //Game over stuffs
  }
}

function menu() {

}

function moveSnake() {
  let elapsedTime = millis() - initialTime;

  if (directionState === 1 && elapsedTime >= movementTimer) {
    xValuesList.splice(0 , 0, xValuesList[0] - snakeSpeed);
    yValuesList = append(yValuesList, yValuesList[0]);

    xValuesList = shorten(xValuesList);
    yValuesList = shorten(yValuesList);
  }

  else if (directionState === 2 && elapsedTime >= movementTimer) {
    yValuesList.splice(0 , 0, yValuesList[0] - snakeSpeed);
    xValuesList = append(xValuesList, xValuesList[0]);

    xValuesList = shorten(xValuesList);
    yValuesList = shorten(yValuesList);
  }

  else if (directionState === 3 && elapsedTime >= movementTimer) {
    xValuesList = append(xValuesList, xValuesList[0] + snakeSpeed);
    xValuesList.splice(0 , 0, xValuesList[0] + snakeSpeed);
    yValuesList = append(yValuesList, yValuesList[0]);

    xValuesList = shorten(xValuesList);
    yValuesList = shorten(yValuesList);
  }

  else if (directionState === 4 && elapsedTime >= movementTimer) {
    yValuesList.splice(0 , 0, yValuesList[0] + snakeSpeed);
    xValuesList = append(xValuesList, xValuesList[0]);

    xValuesList = shorten(xValuesList);
    yValuesList = shorten(yValuesList);
  }

  initialTime = millis();

}

function drawSnakeCubes() {
  fill(0, 255, 0);
  for (let listSpot = 0; listSpot < xValuesList.length; listSpot ++) {
    rect(xValuesList[listSpot], yValuesList[listSpot], snakeSize, snakeSize);
  }
}

function drawFood() {

}

function touchingFood() {

}

function hitSnake() {

}

function addSnake() {

}


function keyIsPressed() {
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
