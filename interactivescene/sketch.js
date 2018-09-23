// Interactive scene
// Tyler Boechler
//
//
// Extra for Experts:
// - timers, sounds, collide2d

let playerX, playerY;
let dx, dy;

let gameMusic;
let menuMusic;
let circleSound;
let player1winSound;
let bounceSound;

let backgroundImage;

let numberOfPlayers;

let initialTime;
let finalTime;

let playerClicked;
let cooldown;

let box1ColourChange, box2ColourChange;
let startButtonsOffset;

let buttonCoordinates;
let pvpTimer;
let timeLeft;
let trapSizeIncrease;


function preload(){
  gameMusic = loadSound("assets/catchyGameBeat.flac");
  bounceSound = loadSound("assets/bounce.wav");
  menuMusic = loadSound("assets/menumusic.wav");
  player1winSound = loadSound("assets/player1wins.wav");
  circleSound = loadSound("assets/trapclick.wav");

  backgroundImage = loadImage("assets/cloudbackground.JPG");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  playerX = random(0, width);
  playerY = random(height/2, height);

  dx = random(15, 25);
  dy = random(15, 25);

  numberOfPlayers = 0;

  pvpTimer = 0;

  bounceSound.setVolume(0.30);
  gameMusic.setVolume(0.60);
  menuMusic.setVolume(0.50);
  circleSound.setVolume(0.55);

  finalTime = 0;
  playerClicked = false;
  cooldown = false;

  box1ColourChange = false;
  box2ColourChange = false;

  startButtonsOffset = 150;
  buttonCoordinates = width/2 - startButtonsOffset;

  trapSizeIncrease = 0;

  menuMusic.loop();
}

function draw() {
  image(backgroundImage, 0, 0, width, height);
  if (numberOfPlayers === 0) {




    if (box1ColourChange) {
      fill(96, 41, 80);
    }
    else {
      fill(181, 12, 43);
    }
    rect(buttonCoordinates, 400, 300, 100);

    if (box2ColourChange) {
      fill(96, 41, 80);
    }
    else {
      fill(181, 12, 43);
    }
    rect(buttonCoordinates, 550, 300, 100)

    fill(0)
    textStyle(NORMAL);
    textAlign(CENTER);
    textSize(25);
    text("Player vs Computer", buttonCoordinates, 435, 300, 100);
    text("Player vs Player", buttonCoordinates, 585, 300, 100);

    fill(250, 70, 50);
    text("In player vs computer, the dot flies around the screen, and you have to try to trap it by clicking!", width/2, 120);
    text("In player vs player mode, one person controlls the dot, and the other tries to trap the the other player.", width/2, 160);
    text("The dot's controls are WASD for movement and SPACE for a random direction, but, every time you hit space, the trap gets bigger!", width/2, 200);
    text("When trying to catch the dot, move the mouse over the dot, then click to trap it, if you miss, the dot will move in a new pattern!", width/2, 240);
    text("Good Luck!", width/2, 310);
    text("By: Tyler B.", width/2, 360);

    textSize(55);
    textStyle(BOLD);
    text("CLICK THE DOT", width/2, 60);

    if (collidePointRect(mouseX, mouseY, buttonCoordinates, 400, 300, 100)) {
      box1ColourChange = true;
      if (mouseIsPressed) {
        menuMusic.stop();
        gameMusic.loop();
        numberOfPlayers = 1;
      }
    }
    else {
      box1ColourChange = false;
    }

    if (collidePointRect(mouseX, mouseY, buttonCoordinates, 550, 300, 100)) {
      box2ColourChange = true;
      if (mouseIsPressed) {
        menuMusic.stop();
        gameMusic.loop();
        // pvpTimer = floor((millis()/1000));
        numberOfPlayers = 2;
      }
    }
    else {
      box2ColourChange = false;
    }

  }

  else {
    cooldown = true;

    moveComputer();
    if (playerClicked && (finalTime - initialTime) <= 1000) {
      fill(255, 90, 70);
      ellipse(mouseX, mouseY, 40 + trapSizeIncrease, 40 + trapSizeIncrease);
      finalTime = millis();
      cooldown = true;
    }
    else {
      playerClicked = false;
      finalTime = 100;
      cooldown = false;
    }
    // if (numberOfPlayers === 2) {
    //   pvpTimer = pvpTimer - floor((millis()/1000));
    //   timeLeft = 60 - pvpTimer;
    //   timeLeft = str(timeLeft);
    //
    //   text(timeLeft, width - 100, 50);
    // }
    if (numberOfPlayers === 1) {
      if (dx <= 15 && dx >= -15) {
        movePlayerRandomly();
      }
    }
  }

}




function movePlayerRandomly(){
  dx = random(-30, 30);
  dy = random(-30, 30);
}

function moveComputer(){
  fill(0)
  ellipse(playerX, playerY, 9, 9)
  if (playerX + 5 > width || playerX < 0) {
    bounceSound.play()
    dx = dx * -1;
  }
  if (playerY + 5 > height || playerY < 0) {
    bounceSound.play()
    dy = dy * -1;

  }
  playerX += dx;
  playerY += dy;
}

function keyPressed(){
  //Moves the dot aka player when someone plays 2 player mode
  if (numberOfPlayers === 2) {
    if (key === "w" || key === "W") {
      dx = 3;
      dy = random(-20, -28);
    }

    else if (key === "s" || key === "S") {
      dx = 3;
      dy = random(20, 28);
    }

    else if (key === "a" || key === "A") {
      dx = random(-20, -28);
      dy = 3;
    }

    else if (key === "d" || key === "D") {
      dx = random(20, 28);
      dy = 3;
    }

    if (keyCode === 32) {
      movePlayerRandomly();
      trapSizeIncrease += 1;
    }
  }
}

  function mouseClicked(){
    if (numberOfPlayers === 1 || numberOfPlayers === 2) {
      if (!cooldown) {
        circleSound.play();
        initialTime = millis();
        playerClicked = true;
        if(collidePointCircle(playerX, playerY, mouseX, mouseY, 80 + (trapSizeIncrease * 2))) {
          player1winSound.play();
          finalTime = 0;
          initialTime = millis();
          gameMusic.stop();
          trapSizeIncrease = 0;
          numberOfPlayers = 0;
          menuMusic.loop();
        }
        movePlayerRandomly();
      }
    }
  }
