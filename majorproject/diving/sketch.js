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
    this.faceColor = color(0, 0, 255);

    this.angle = 0;
    this.go = false;

    this.tuckSpinSpeed = 1.5;
    this.tuckSpinIncrease = 0.05;

    this.layoutSpeed = 1;
    this.position = "layout";
    this.straightened = false;
    this.secondTuck = false;

    this.direction = 1;

    this.facing = "forwards";
    this.spin = "forwards";

    this.didFail = false;
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

    fill(this.faceColor);
    if(this.direction === 1 || this.direction === 3) {
      rect(0, 0 - this.height/2, this.width/2, 20);
    }

    else {
      rect(0 - this.width/2, 0 - this.height/2, this.width/2, 20);
    }

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
    this.faceColor = color(0, 0, 255);

    this.angle = 0;
    this.go = false;

    this.tuckSpinSpeed = 1.5;
    this.tuckSpinIncrease = 0.05;

    this.position = "layout";
    this.straightened = false;
    this.secondTuck = false;
    this.layoutSpeed = 1;
    this.direction = 1;

    this.facing = "forwards";
    this.spin = "forwards";

    this.didFail = false;
  }
}

class DivingButton {
  constructor(playerThing, changeTo, level, image) {
    this.space = 25;
    this.radius = 40;
    this.x = width - width/20;
    this.y = height - level * 100;
    this.color = color(255, 0, 255);
    this.hoveringColor = color(100, 100, 255);
    this.changeColor = color(0, 255, 0);
    this.available = false;
    this.whatToChange = playerThing;
    this.changeTo = changeTo;
    this.on = false;
  }

  display() {
    if(this.available) {
      if(collidePointCircle(mouseX, mouseY, this.x, this.y, this.radius*2)) {
        fill(this.hoveringColor);
        if(mouseIsPressed) {
          fill(this.changeColor);
          if(this.whatToChange === "go") {
            if(player.go !== true) {
              //WAS WORKING HERE LAST
              player.go = this.changeTo;
              this.on = true;
            }
            else {
              this.available = false;
            }
          }

          else if(this.whatToChange === "position") {
            if(player.go) {
              player.position = this.changeTo;
              this.on = true;
            }
            else {
              this.available = false;
            }

          }
          // console.log(this.whatToChange, this.changeTo )
        }
        else {
          this.on = false;
        }
      }
      else {
        fill(this.color);
      }
    }
    else {
      if(player.go === false && this.whatToChange === "go") {
        this.available = true;
      }

      else if(player.go === true && this.whatToChange === "position") {
        this.available = true;
      }

      else {
        this.available = false;
      }

      fill(160)
    }

    ellipse(this.x, this.y, this.radius*2, this.radius*2);
  }
}






let gameState;

let player;

let degreeOfDifficulty;
let diveDone;
let finishedDive;
let lastScores;

let initTime;
let tuckButton, goButton;

let frontButton, backButton, reverseButton, inwardButton;

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  finishedDive = false;
  gameState = 3;
  //Guide to gameState
  //0 = Main menu
  //1 = Selection menu
  //2 = Practice menu
  //3 = Practice
  //4 = Competition menu
  //5 = Competition
  //6 = Settings


  player = new Player(0);
  goButton = new DivingButton("go", true, 1, 0);
  tuckButton = new DivingButton("position", "tuck", 2, 0);

  // frontButton = new DivingButton("direction", 1, )
}


function draw() {

  // if(gameState === 0) {
  //   mainMenu();
  // }

  background(255);


  if (player.go) {
    updatePlayer();
    // console.log(player.position)
  }
  drawPlayer();
  drawPool();
  goButton.display();
  tuckButton.display();

  if(finishedDive && !player.go) {
    if(millis() < initTime + 3000) {
      practiceDisplay();
    }
    else {
      finishedDive = false;
    }
  }

}

function drawPool() {
  strokeWeight(2);
  fill(0, 0, 100, 220);
  rect(0, height-100, width, 100);
  fill(242, 242, 210);

  rect(0, height-102, 50, 102);
  rect(width-50, height-102, 50, 102);
  stroke(242, 242, 210);
  rect(0, height-20, width, 20);
  stroke(0);

  line(0, height-102, 0, height);
  line(50, height-21, width-50, height-21);
  strokeWeight(1);
  stroke(0);
  fill(0, 255, 0);
  rect(0, player.height * 1.5 + 10, player.initX + player.width/2, 10);
}

function drawPlayer() {
  player.display();
}

function updatePlayer() {
  if (player.y < height - 100) {
    player.update();
    if (tuckButton.on) {
      player.position = "tuck";
    }
    else if (player.position !== "layout"){
      player.position = "straight";
    }
  }

  else {
    if (player.swim()) {
      if(gameState === 3) {
        player.didFail = false;
        defineDive();
        lastScores = score(1, player.didFail);
        player.reset();
        tuckButton.available = false;
        finishedDive = true;
        initTime = millis();

      }
      else if(gameState === 5) {
        defineDive();
        score(3, player.didFail);
      }

    }
  }
}

function practiceDisplay() {

  let boxWidth = width/6;
  let boxHeight = height/6;
  let boxY = height/2 - boxHeight/2;
  let boxX = width/2 - boxWidth/2;

  fill(156, 255, 255);
  strokeWeight(4);
  stroke(0);

  rect(boxX, boxY, boxWidth, boxHeight);
  line(boxX, boxY + boxHeight/2, boxX + boxWidth, boxY + boxHeight/2);

  strokeWeight(1);
  textAlign(CENTER, CENTER);
  textSize(28);
  let score = lastScores[0].toString();
  fill(0);
  text(diveDone, boxX + boxWidth/2, boxY + boxHeight/4);
  text("Average score: " + score, boxX + boxWidth/2, boxY + boxHeight/4 * 3);

}


function score(judges, fail) {
  let score;
  let dive = round(player.angle/180) * 180;
  let allScores = [];
  for(let i = 0; i < judges; i++) {
    score = player.angle;
    score = abs(dive-score);
    score = score/random(80, 100);
    score = round(score*20)/2;

    if(!fail) {
      score = abs(10-score);
      if(player.secondTuck || player.position === "tucl") {
        if (score > 3.0) {
          score = score - 3;
        }
      }
      allScores.push(score);
    }

    else {
      score = 0;
      allScores.push(score);
    }

    return allScores;
  }
}

function defineDive() {
  let diveNumber = "";

  diveNumber += player.direction;
  diveNumber += "0";

  let rotations = abs(round(player.angle/180));
  diveNumber += rotations.toString();

  if(player.straightened || player.position === "tuck") {
    diveNumber += "c";
  }
  else {
    diveNumber += "a";
  }
  diveDone = diveNumber;
}


function keyTyped() {
  if (key === "p" && !player.go) {
    if (player.direction < 4) {
      player.direction++;
    }
    else {
      player.direction = 1;
    }
  }
}

function deviceShaken() {
  if (player.direction < 4) {
    player.direction++;
  }
  else {
    player.direction = 1;
  }
}
