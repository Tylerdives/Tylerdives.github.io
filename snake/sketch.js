// State Variables
// Tyler Boechler
// September 28th, 2018
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;
let xSpeed, ySpeed;

let middleX;
let middleY;

let movementTimer = 250;

let xValuesList;
let yValuesList;

let directionState;
let gameState;

let elapsedTime;
let snakeSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  middleX = width/2;
  middleY = height/2;

  xValuesList = [middleX];
  yValuesList = [middleY];

  directionState = 0;


  elapsedTime = 0;

  gameState = 1;
}

function draw() {
  if (gameState === 0) {
    // menu();
  }
  else if (gameState === 2) {
    background(0);
    // drawFood();
    // moveSnake();
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

// function menu() {
//
// }
//
// function moveSnake() {
//
// }

function drawSnakeCubes() {
  rect(200, 200, 50, 50);
}

// function drawFood() {
//
// }
//
// function touchingFood() {
//
// }
//
// function hitSnake() {
//
// }
//
// function addSnake() {
//
// }


function keyPressed() {
  //LEFT
  if (keyCode === 37) {
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
