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
let hoveringButton;

let music;
let eatSound;

function preload() {
  music = loadSound("assets/snakemenu.mp3");
  eatSound = loadSound("assets/eatfoodsound.mp3");
}

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
    win: false,
  };

  snake2 = {
    xValuesList: [35],
    yValuesList: [0],
    size: 38,
    speed: 40,
    directionState: 1,
    win: false,
  };

  heightCubes = floor(height/snake1.speed);
  widthCubes = floor(width/snake1.speed);

  gameState = 1;

  textAlign(CENTER);

  music.setVolume(0.2);
  eatSound.setVolume(0.3);
  music.loop();
}

function draw() {
  //MENU
  if (gameState === 1) {
    frameRate(60);
    menu();
  }

  //GAME
  else if (gameState === 2) {
    frameRate(6);
    background(0);

    drawGrid();
    drawFood();

    drawSnakeCubes(snake1);
    drawSnakeCubes(snake2);

    hitSnake();

    moveSnake(snake1);
    moveSnake(snake2);
  }

  //PAUSE
  else if (gameState === 3) {
    frameRate(60);
    fill(255);
    text("PAUSED", width/2, height/2);
  }

  //GAME OVER
  else if (gameState === 4) {
    frameRate(60);
    gameOver();
  }
}


function menu() {
  background(10);
  drawGrid();


  backgroundSnakes();

  fill(0, 255, 0);
  textSize(55);
  text("TWO PLAYER SNAKE", width/2, 100);
  textSize(20);
  text("There are two snakes in a battle.", width/2, 150);
  text("A green one (WASD controls), and a blue one (IJKL controls)", width/2, 200);
  text("Eat the red food to get longer", width/2, 250);
  text("If you hit your tail, or the tail of the other snake, you lose", width/2, 300);
  text("Press P to pause and have fun", width/2, 350);
  text("By: Tyler B.", width/2, 400);

  rectMode(CENTER);

  if (collidePointRect(mouseX, mouseY, width/2 - 150, 450, 300, 100)) {
    hoveringButton = true;
    if (mouseIsPressed) {
      gameState ++;
    }
  }
  else {
    hoveringButton = false;
  }

  if (hoveringButton) {
    fill(60, 0, 0);
  }
  else {
    fill(255, 0, 0);
  }

  rect(width/2, 500, 300, 100);
  rectMode(CORNER);

  fill(255);
  textSize(35);
  text("START", width/2, 510);
}


function backgroundSnakes() {

  fill(0, 255, 0);
  rect(snake1.speed * 6, snake1.speed * 3, snake1.size, snake1.size);
  //TRYING to make less of an eyesore
  rect(snake1.speed * 7, snake1.speed * 3, snake1.size, snake1.size);

  rect(snake1.speed * 7, snake1.speed * 4, snake1.size, snake1.size);

  rect(snake1.speed * 8, snake1.speed * 4, snake1.size, snake1.size);

  rect(snake1.speed * 9, snake1.speed * 4, snake1.size, snake1.size);

  rect(snake1.speed * 10, snake1.speed * 4, snake1.size, snake1.size);

  rect(snake1.speed * 10, snake1.speed * 4, snake1.size, snake1.size);

  rect(snake1.speed * 10, snake1.speed * 5, snake1.size, snake1.size);

  rect(snake1.speed * 10, snake1.speed * 6, snake1.size, snake1.size);

  rect(snake1.speed * 10, snake1.speed * 7, snake1.size, snake1.size);

  rect(snake1.speed * 10, snake1.speed * 8, snake1.size, snake1.size);

  fill(0, 0, 255);
  rect(snake1.speed * 35, snake1.speed * 3, snake1.size, snake1.size);

  rect(snake1.speed * 35, snake1.speed * 4, snake1.size, snake1.size);

  rect(snake1.speed * 34, snake1.speed * 4, snake1.size, snake1.size);

  rect(snake1.speed * 34, snake1.speed * 5, snake1.size, snake1.size);

  rect(snake1.speed * 34, snake1.speed * 6, snake1.size, snake1.size);

  rect(snake1.speed * 34, snake1.speed * 7, snake1.size, snake1.size);

  rect(snake1.speed * 34, snake1.speed * 8, snake1.size, snake1.size);

  rect(snake1.speed * 34, snake1.speed * 9, snake1.size, snake1.size);

  rect(snake1.speed * 33, snake1.speed * 9, snake1.size, snake1.size);

  rect(snake1.speed * 32, snake1.speed * 9, snake1.size, snake1.size);

  rect(snake1.speed * 31, snake1.speed * 9, snake1.size, snake1.size);
}

function gameOver() {
  music.stop();
  textSize(55);

  if (snake1.win) {
    fill(0, 255, 0);
    text("PLAYER 1 WINS", width/2, height/2);
  }
  else if (snake2.win) {
    fill(0, 0, 255);
    text("PLAYER 2 WINS", width/2, height/2);
  }
  else {
    fill(255);
    text("TIE", width/2, height/2);
  }
  text("PRESS R TO RESTART", width/2, height/2 + 200);
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

  //ADDING SNAKES
  if (addSnake1 && snakeNumber === snake1 || addSnake2 && snakeNumber === snake2) {
    if (snakeNumber.directionState === 1) {
      snakeNumber.xValuesList.splice(0 , 0, snakeNumber.xValuesList[0] - snakeNumber.speed);
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
    snakeNumber.xValuesList.splice(0, 0, floor(width/snakeNumber.speed) * snakeNumber.speed - snakeNumber.speed);
    snakeNumber.xValuesList = shorten(snakeNumber.xValuesList);
  }

  else if(snakeNumber.xValuesList[0] > floor(width/snakeNumber.speed) * snakeNumber.speed - snakeNumber.speed) {
    snakeNumber.xValuesList.splice(0, 0, 0);
    snakeNumber.xValuesList = shorten(snakeNumber.xValuesList);
  }

  else if(snakeNumber.yValuesList[0] < 0) {
    snakeNumber.yValuesList.splice(0, 0, floor(height/snakeNumber.speed) * snakeNumber.speed);
    snakeNumber.yValuesList = shorten(snakeNumber.yValuesList);
  }

  else if(snakeNumber.yValuesList[0] > floor(height/snake1.speed) * snakeNumber.speed - snakeNumber.speed) {
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
    eatSound.play();
    addSnake1 = true;
    food1Present = false;
  }
  if ((foodX2 - 1) * snake2.speed === snake2.xValuesList[0] && (foodY2 - 1) * snake2.speed === snake2.yValuesList[0]) {
    eatSound.play();
    addSnake2 = true;
    food2Present = false;
  }
  if ((foodX1 - 1) * snake2.speed === snake2.xValuesList[0] && (foodY1 - 1) * snake2.speed === snake2.yValuesList[0]) {
    eatSound.play();
    addSnake2 = true;
    food1Present = false;
  }
  if ((foodX2 - 1) * snake1.speed === snake1.xValuesList[0] && (foodY2 - 1) * snake1.speed === snake1.yValuesList[0]) {
    eatSound.play();
    addSnake1 = true;
    food2Present = false;
  }
}

function hitSnake() {
  //If player one wins
  if (snake1.xValuesList.includes(snake2.xValuesList[0]) && snake1.yValuesList.includes(snake2.yValuesList[0]) || snake2.xValuesList.includes(snake2.xValuesList[0], 1) && snake2.yValuesList.includes(snake2.yValuesList[0], 1)) {
    // if(snake1.xValuesList[0] !== snake2.xValuesList[0] && snake1.yValuesList[0] !== snake2.yValuesList[0]) {
    //Only if the snake's don't have a head on collision
    snake1.win = true;
    // }
    gameState = 4;
  }
  //If player 2 wins
  //If player one wins
  if (snake2.xValuesList.includes(snake1.xValuesList[0]) && snake2.yValuesList.includes(snake1.yValuesList[0]) || snake1.xValuesList.includes(snake1.xValuesList[0], 1) && snake1.yValuesList.includes(snake1.yValuesList[0], 1)) {
    // if(snake1.xValuesList[0] !== snake2.xValuesList[0] && snake1.yValuesList[0] !== snake2.yValuesList[0]) {
    //Only if the snake's don't have a head on collision
    snake2.win = true;
    // }
    gameState  = 4;
  }
//   if (snake2.xValuesList.includes(snake1.xValuesList[0]) && snake2.yValuesList.includes(snake1.yValuesList[0]) || )

}




function keyTyped() {
  //Player one controls
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
  //Player 2 controls
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
      music.setVolume(0.05);
      gameState = 3;
    }
    else if (gameState === 3) {
      gameState = 2;
      music.setVolume(0.2);
    }
  }

  if (gameState === 4) {
    if (key === "r" || key === "R") {
      snake1.win = false;
      snake2.win = false;
      gameState = 1;
      music.loop();
    }
  }
}
