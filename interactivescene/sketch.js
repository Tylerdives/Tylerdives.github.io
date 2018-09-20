// Interactive scene
// Tyler Boechler
//
//
// Extra for Experts:
// - timers, sounds,

let playerX, playerY;
let dx, dy;

let backgroundSound;
let circleSound;

let changeDirSound;

function preload(){

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  playerX = random(0, width);
  playerY = random(height/2, height)

  dx = random(15, 25);
  dy = random(15, 25);
}

function draw() {
  background(255);
  moveComputer();
}

function moveComputer(){
  fill(0)
  ellipse(playerX, playerY, 5, 5)
  if (playerX + 5 > width || playerX < 0) {
    dx = dx * -1;
  }
  if (playerY + 5 > height || playerY < 0) {
    dy = dy * -1;
  }
  playerX += dx;
  playerY += dy;
}

function keyPressed(){
  if (key === "w" || key === "W") {
    dx = 3;
    dy = 20;
  }
  else if (key === "s" || key === "S") {
    dx = 3;
    dy = -20;
  }
  else if (key === "a" || key === "A") {
    dx = -20;
    dy = 3;
  }
  else if (key === "d" || key === "D") {
    dx = -20;
    dy = 3;
  }
  // if (key === SPACE) {
  //
  // }
}
