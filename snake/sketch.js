// State Variables
// Tyler Boechler
// September 28th, 2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let snakeSpeed;

let middleX;
let middleY;

let movementTimer = 250;

let xValuesList;
let yValuesList;

let directionState;
let gameState;

let initialTime;
let snakeSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  middleX = width/2;
  middleY = height/2;

  xValuesList = [middleX];
  yValuesList = [middleY];

  directionState = 3;
  snakeSize = 33;
  snakeSpeed = 35;

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

    drawSnakeCubes();
    moveSnake();
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
    xValuesList = append(xValuesList, xValuesList[0] - snakeSpeed);
    xValuesList = shorten(xValuesList);
  }

  else if (directionState === 2 && elapsedTime >= movementTimer) {
    yValuesList = append(yValuesList, yValuesList[0] - snakeSpeed);
    yValuesList = shorten(yValuesList);
  }

  else if (directionState === 3 && elapsedTime >= movementTimer) {
    xValuesList = append(xValuesList, xValuesList[0] + snakeSpeed);
    xValuesList = shorten(xValuesList);
  }

  else if (directionState === 4 && elapsedTime >= movementTimer) {
    yValuesList = append(yValuesList, yValuesList[0] + snakeSpeed);
    yValuesList = shorten(yValuesList);
  }

  initialTime = millis();
}

function drawSnakeCubes() {
  fill(0, 255, 0);
  for (let snakeX of xValuesList) {
    for(let snakeY of yValuesList) {
      rect(snakeX, snakeY, snakeSize, snakeSize);
    }
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


function keyPressed() {
  //LEFT
  if (key === "a" || key === "A") {
    directionState = 1;
  }
  //UP
  else if (keyCode === 38) {
    directionState = 2;
  }
  //RIGHT
  else if (keyCode === 39) {
    directionState = 3;
  }
  //DOWN
  else if (keyCode === 40) {
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
