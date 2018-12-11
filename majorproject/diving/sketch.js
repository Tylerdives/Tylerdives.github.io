// Major PROJECT
// Tyler Boechler
// December 12th, 2018
//

class Player {
  constructor(boardHeight) {
    this.initX = width/2 - 50;
    this.initY = height/10 ;

    this.x = this.initX;
    this.y = this.initY;
    this.width = 30;
    this.height = 90;
    this.dx = 2;
    this.dy = -4;

    this.bodyColor = color(255, 0, 0);
    this.headColor = color(0, 255, 0);
    this.feetColor = color(255, 255, 0);

    this.angle = 0;
    this.go = false;

    this.position = "straight";
  }

  display() {
    fill(this.bodyColor);
    if (this.position === "tuck") {
      fill(0);
    }
    rect(this.x, this.y, this.width, this.height);
    fill(this.headColor);
    rect(this.x, this.y, this.width, 20);
    fill(this.feetColor);
    rect(this.x, this.y + 70, this.width, 20);
  }

  fall() {
    this.y += this.dy;
    this.dy += 0.090;

    this.x += this.dx;
    if (this.dx > 0.1) {
      this.dx -= 0.01;
    }
  }

  float() {
    this.y -= 0.01;
    // this.x += random(-0.2, 0.2);
  }

  rotatePlayer() {
    push();
    translate(this.x + 25, this.y + 75);
    rotate(45);
    pop();
  }

  reset() {
    this.initX = width/2 - 50;
    this.initY = height/10 ;

    this.x = this.initX;
    this.y = this.initY;
    this.width = 30;
    this.height = 90;
    this.dx = 2;
    this.dy = -4;

    this.angle = 0;
    this.go = false;

    this.position = "straight";
  }
}

let player;


function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);

  player = new Player(0);
}

function draw() {
  background(255);
  drawPlayer();
  if (player.go) {
    updatePlayer();
  }
  drawPool();

}

function drawPool() {
  fill(0, 0, 100, 200);
  rect(0, height-100, width, 100);

  fill(0, 255, 0);
  rect(0 , player.initY + player.height, player.initX  + 30, 10);
}

function drawPlayer() {
  player.display();
}

function updatePlayer() {
  player.rotatePlayer();
  if (player.y < height + 200) {
    player.fall();

    if(player.y < height - 100) {
      if (mouseIsPressed) {
        player.position = "tuck";
      }
      else {
        player.position = "straight";
      }
    }

    else {
      // score();
    }
  }
  else {
    // while(player.y + player.height> height - 150) {
    //   player.float();
    //   console.log(1)
    // }
    player.reset();
  }
}

function keyTyped() {
  if (key === " ") {
    player.go = true;
  }
}
