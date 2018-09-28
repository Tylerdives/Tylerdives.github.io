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

let movementTimer = 500;

let xValuesList;
let yValuesList;

let directionState;
let gameState;

let elapsedTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  middleX = width/2;
  middleY = height/2;

  xValuesList = [middleX];
  yValuesList = [middleY];

  directionState = 0;


  elapsedTime = 0;

}

function draw() {
  if (gameState === 0) {
    menu();
  }
  else {
    background(0);
    drawFood();
    moveSnake();
    drawSnakeCubes();
    hitSnake();
    touchingFood();
  }
}

function menu() {

}
function moveSnake() {

}

function drawSnakeCubes() {

}

function drawFood() {

}

function touchingFood() {

}

function hitSnake() {

}

function addSnake() {

}

function drawCube() {

}

function keyIsPressed() {

}
