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

let numberOfPlayers;

let initialTime;
let finalTime;

let playerClicked;
let cooldown;

let box1ColourChange, box2ColourChange;
let startButtonsOffset;

let buttonCoordinates;


function preload(){
  gameMusic = loadSound("assets/catchyGameBeat.flac");
  bounceSound = loadSound("assets/bounce.wav");
  menuMusic = loadSound("assets/menumusic.wav");
  player1winSound = loadSound("assets/player1wins.wav")

}

function setup() {

  createCanvas(windowWidth, windowHeight);

  playerX = random(0, width);
  playerY = random(height/2, height);

  dx = random(15, 25);
  dy = random(15, 25);

  numberOfPlayers = 0;

  bounceSound.setVolume(0.50);
  gameMusic.setVolume(0.60);


  finalTime = 0;
  playerClicked = false;
  cooldown = false;

  box1ColourChange = false;
  box2ColourChange = false;

  startButtonsOffset = 150;
  buttonCoordinates = width/2 - startButtonsOffset;

  textAlign(CENTER);
  textSize(25);
}

function draw() {
  background(255);
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
    text("Player vs Computer", buttonCoordinates, 435, 300, 100);
    text("Player vs Player", buttonCoordinates, 585, 300, 100);

    if (collidePointRect(mouseX, mouseY, buttonCoordinates, 400, 300, 100)) {
      box1ColourChange = true;
    }
    else {
      box1ColourChange = false;
    }

    if (collidePointRect(mouseX, mouseY, buttonCoordinates, 550, 300, 100)) {
      box2ColourChange = true;
    }
    else {
      box2ColourChange = false;
    }

  }
  else {
    background(255);
    moveComputer();
    if (playerClicked && (finalTime - initialTime) <= 1000) {
      fill(145, 200, 242);
      ellipse(mouseX, mouseY, 100, 100);
      finalTime = millis();
      cooldown = true;
    }
    else {
      playerClicked = false;
      finalTime = 0;
      cooldown = false;
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
    }
  }
}

  function mouseClicked(){
    if (numberOfPlayers === 1) {
      if (!cooldown) {
        initialTime = millis();
        playerClicked = true;
        if(collidePointCircle(playerX, playerY, mouseX, mouseY, 200)) {
          gameMusic.stop();
          noLoop();
        }
        movePlayerRandomly();
      }
    }
  }


  // function playMusic() {
  //   if ()
  //   //other stuff goes here
  // }
