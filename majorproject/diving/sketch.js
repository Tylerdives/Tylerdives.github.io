// Major PROJECT
// Tyler Boechler
// December 12th, 2018
//

class Player {
  constructor(boardHeight) {
    this.x = width/2;
    this.y = height/2;
    this.dx = 0.2;
    this.dy = 1;

    this.bodyColor = color(255, 0, 0);
    this.headColor = color(0, 255, 0);
    this.feetColor = color(255, 255, 0);

    this.angle = 0;

    this.position = "straight";
  }

  display() {
    fill(this.bodyColor);
    rect(this.x, this.y, 50, 150);
    fill(this.headColor);
    rect(this.x, this.y, 50, 20);
    fill(this.feetColor);
    rect(this.x, this.y + 130, 50, 20);
  }

  fall() {

  }

  rotatePlayer() {
    translate(this.x, this.y);
    rotate(1);

  }
}

let player;


function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);

  player = new Player(0);
}

function draw() {
  drawPlayer();
  updatePlayer();

}

function drawPlayer() {
  player.display();
}

function updatePlayer() {
  player.rotatePlayer();

}
