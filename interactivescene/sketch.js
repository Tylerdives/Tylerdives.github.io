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

let timer;

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

  // timer = 200;
}

function draw() {
  background(255);
  moveComputer();

  // if (timer <= 120) {
  //   fill(161, 237, 229, 200);
  //   ellipse(mouseX, mouseY, 50, 50);
  //   timer = second();


  }

  // gameMusic.play()

}

function movePlayerRandomly(){
  dx = random(-25, 25);
  dy = random(-25, 25);
}

function moveComputer(){
  fill(0)
  ellipse(playerX, playerY, 5, 5)
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

  // function mouseClicked(){
  //   timer = 0;
  //   movePlayerRandomly();
  // }
