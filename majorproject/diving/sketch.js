// Major PROJECT
// Tyler Boechler
// December 12th, 2018
//

class Player {
  constructor(boardHeight, tuckSpeed) {
    this.boardHeight = boardHeight;

    this.initX = width/2;
    this.initY = 100;

    this.x = this.initX;
    this.y = this.initY;
    this.width = 30;
    this.height = 90;
    this.dx = 1.75;
    this.dy = -4;

    this.bodyColor = color(255, 0, 0);
    this.headColor = color(0, 255, 0);
    this.feetColor = color(255, 255, 0);

    this.angle = 0;
    this.go = false;

    this.tuckSpinSpeed = 1.5;
    this.tuckSpinIncrease = 0.05;

    this.layoutSpeed = 1;
    this.position = "layout";
    this.straightened = false;
    this.secondTuck = false;

    this.direction = "1";

    this.facing = "forwards";
    this.spin = "forwards";
  }


  update() {
    if(this.direction === 1 || this.direction === 3) {
      this.facing = "forwards";
      if(this.direction === 3) {
        this.spin = "backwards";
      }
      else {
        this.spin = "forwards";
      }
    }
    else if(this.direction === 2 || this.direction === 4) {
      this.facing = "backwards";
      if (this.direction === 4) {
        this.spin = "backwards";
      }
      else {
        this.spin = "forwards";
      }
    }

    if(this.spin === "forwards" && this.tuckSpinSpeed < 0) {
      this.tuckSpinSpeed = -1 * this.tuckSpinSpeed;
      this.layoutSpeed = -1 * this.layoutSpeed;
      this.tuckSpinIncrease = -1 * this.tuckSpinIncrease;
    }
    else if(this.spin === "backwards" && this.tuckSpinSpeed > 0) {
      this.tuckSpinSpeed = -1 * this.tuckSpinSpeed;
      this.layoutSpeed = -1 * this.layoutSpeed;
      this.tuckSpinIncrease = -1 * this.tuckSpinIncrease;
    }

    if (this.position === "layout") {
      this.angle += this.layoutSpeed;
    }
    else if (this.position === "tuck") {
      this.angle += this.tuckSpinSpeed;
      this.tuckSpinSpeed += this.tuckSpinIncrease;
      if(this.straightened) {
        // this.tuckSpinSpeed = this.tuckSpinSpeed/1.5;
        this.secondTuck = true;
      }
    }

    else if (this.position === "straight") {
      //Straight is after spinning
      if(this.angle < 90 && this.angle > -90) {
        this.position = "layout";
      }

      else {
        // console.log(this.tuckSpinIncrease)
        this.angle += this.tuckSpinSpeed/2.5;
      }
      if (this.tuckSpinSpeed > 3) {
        this.tuckSpinSpeed -= 0.02;
      }
      this.straightened = true;
    }
    this.y += this.dy;
    this.dy += 0.093;
    this.x += this.dx;
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
    if (this.dy !== 5) {
      if(this.y > height + 100) {
        return true;
      }
    }
    else {
      return false;
    }

  }

  reset() {
    // this.initX = this.initX;
    // this.initY = this.initY;

    this.x = this.initX;
    this.y = this.initY;
    this.width = 30;
    this.height = 90;
    this.dx = 1.75;
    this.dy = -4;

    this.bodyColor = color(255, 0, 0);
    this.headColor = color(0, 255, 0);
    this.feetColor = color(255, 255, 0);

    this.angle = 0;
    this.go = false;

    this.tuckSpinSpeed = 1.5;
    this.tuckSpinIncrease = 0.05;

    this.position = "layout";
    this.straightened = false;
    this.secondTuck = false;
    this.layoutSpeed = 1;
    this.direction = "1";

    this.facing = "forwards";
    this.spin = "forwards";
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
    // console.log(player.position)
  }

  drawPlayer();
  drawPool();

}

function drawPool() {
  fill(0, 0, 100, 200);
  rect(0, height-100, width, 100);

  fill(0, 255, 0);
  rect(0, player.height * 1.5 + 10, player.initX + player.width/2, 10);
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
    if (player.swim()) {
      defineDive();
      score(3);
      player.reset();
    }
  }
}

function score(judges, fail) {
  let score;
  let dive = round(player.angle/180) * 180;
  let allScores = [];
  for(let i = 0; i < judges; i++) {
    score = player.angle;
    score = abs(dive-score);
    score = score/random(70, 110);
    // if (random(100) < 50) {
    //   score = ceil(score*20)/2;
    // }
    // else {
    //   score = floor(score*20)/2;
    // }

    score = round(score*20)/2;



    score = abs(10-score);
    if(player.secondTuck || player.position === "tucl") {
      if (score > 4.5) {
        score = score - 3;
      }
    }
    allScores.push(score);
  }

  console.log(allScores);
}

function defineDive() {
  let diveNumber = "";

  diveNumber += player.direction;
  diveNumber += "0";

  let rotations = round(player.angle/180);
  diveNumber += rotations.toString();

  if(player.straightened || player.position === "tuck") {
    diveNumber += "c";
  }
  else {
    diveNumber += "a";
  }
  console.log(diveNumber);
}

function keyTyped() {
  if (key === " ") {
    player.go = true;
  }
  if (key === "p" && !player.go) {
    if(player.spin === "forwards") {
      player.spin = "backwards";
    }
    else if (player.spin === "backwards") {
      player.spin = "forwards";
    }

  }
}

function mousePressed() {
  player.go = true;
}
