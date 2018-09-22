// Interactive scene
// Tyler Boechler
//
//
// Extra for Experts:
// - timers, sounds, collide2d

let playerX, playerY;
let dx, dy;

let gameMusic;
let circleSound;
let bounceSound;

let numberOfPlayers;

let initialTime;
let finalTime;

let playerClicked;
let cooldown;

function preload(){
  gameMusic = loadSound("assets/catchyGameBeat.flac");
  bounceSound = loadSound("assets/bounce.wav");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  playerX = random(0, width);
  playerY = random(height/2, height)

  dx = random(15, 25);
  dy = random(15, 25);

  numberOfPlayers = 0;

  bounceSound.setVolume(0.50);
  gameMusic.setVolume(0.60);
  gameMusic.loop();

  finalTime = 0;
  playerClicked = false;
  cooldown = false;
}

function draw() {
  if (numberOfPlayers === 0) {

  }
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
    )
  }
