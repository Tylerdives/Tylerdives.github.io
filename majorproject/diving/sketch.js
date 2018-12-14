// Major PROJECT
// Tyler Boechler
// December 12th, 2018
//

class Player {
  constructor(boardHeight, tuckSpeed) {
    this.initX = width/2;
    this.initY = height/2;

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

    this.tuckSpinSpeed = 3;

    this.position = "layout";
  }


  update() {
    if (this.position === "layout") {
      this.angle += 1;
    }
    else if (this.position === "tuck") {
      this.angle += this.tuckSpinSpeed;
      this.tuckSpinSpeed += 0.01;
    }
    else if (this.position === "straight") {
      this.angle += 2;
      this.tuckSpinSpeed = 3;
    }
    this.y += this.dy;
    this.dy += 0.090;
    this.x+= this.dx;
    if (this.dx > 0.1) {
      this.dx -= 0.01;
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    if (this.go) {
      rotate(this.angle);
    }
    fill(this.bodyColor);
    if (this.position === "tuck") {
      fill(0);
    }

    rect(0 - this.width/2, 0 - this.height/2, this.width, this.height);
    fill(this.headColor);
    rect(0 - this.width/2, 0 - this.height/2, this.width, 20);
    fill(this.feetColor);
    rect(0 - this.width/2, 0 + 70 - this.height/2, this.width, 20);
    strokeWeight(10);
    point(0, 0);
    strokeWeight(1);
    pop();
  }

  swim() {
    this.y += this.dy;
    if (this.y > height + 100) {
      this.dy = -8;
      this.angle = 0;
    }
    this.dy += 0.1;

  }

  reset() {
    this.initX = width/2;
    this.initY = 150 ;

    this.x = this.initX;
    this.y = this.initY;
    this.width = 30;
    this.height = 90;
    this.dx = 2;
    this.dy = -4;

    this.angle = 0;
    this.go = false;

    this.tuckSpinSpeed = 3;

    this.position = "layout";
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

  if (player.go) {
    updatePlayer();
  }

  drawPlayer();
  drawPool();

}

function drawPool() {
  fill(0, 0, 100, 200);
  rect(0, height-100, width, 100);

  fill(0, 255, 0);
  // rect(0 , player.initY + player.height, player.initX  + 30, 10);
}

function drawPlayer() {
  player.display();
}

function updatePlayer() {
  if (player.y < height - 100) {
    player.update();
    if (mouseIsPressed) {
      player.position = "tuck";
    }
    else if (player.position !== "layout"){
      player.position = "straight";
    }
  }
  else {
    if(player.y > height - 100) {
      player.swim();
    }
    else {
      player.reset();
    }
  }
}

function keyTyped() {
  if (key === " ") {
    player.go = true;
  }
}
