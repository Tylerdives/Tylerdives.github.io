// Major PROJECT
// Tyler Boechler
// December 12th, 2018
//

class Player {
  constructor(boardHeight, tuckSpeed) {
    this.boardHeight = boardHeight;

    this.initX = width/3;
    // this.initY = 100;
    this.initY = 100;

    this.x = this.initX;
    this.y = this.initY;


    this.dx = 1.75;
    this.dy = -4;

    this.bodyColor = color(255, 0, 0);
    this.headColor = color(0, 255, 0);
    this.feetColor = color(255, 255, 0);
    this.faceColor = color(0, 0, 255);

    this.angle = 0;
    this.go = false;

    this.tuckSpinSpeed = 1.7;
    this.tuckSpinIncrease = 0.06;

    this.layoutSpeed = 0.8;
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
        this.angle += this.tuckSpinSpeed/2.7;
      }
      if (this.tuckSpinSpeed > 3) {
        this.tuckSpinSpeed -= 0.02;
      }
      this.straightened = true;
    }


    this.y += this.dy;
    this.dy += 0.080;
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

    if((this.direction === 1 || this.direction === 3) && player.position !== "tuck") {
      strokeWeight(7);
      //BODY
      line(0, -10, 0, 50);
      if(!this.go) {
        //FEET
        line(0, 50, 10, 50);

      }
      else {
        //FEET
        line(0, 50, 2, 60);
        //Hand grab
        point(2.5, -61);
      }

      fill(255);
      //ARM
      line(0, 10, 5, -60);
      //HEAD
      ellipse(0, -30, 33, 33);
      //ARM
      line(0, 10, 0, -60);


      strokeWeight(1);

    }

    else if ((this.direction === 2 || this.direction === 4) && player.position !== "tuck") {
      strokeWeight(7);
      line(0, -10, 0, 50);
      if(!this.go) {
        //FEET
        line(0, 50, -10, 50);

      }
      else {
        //FEET
        line(0, 50, -2, 60);
        //Hand grab
        point(-2.5, -61);
      }

      fill(255);
      //ARMS
      line(0, 10, -5, -60);
      //HEAD
      ellipse(0, -30, 33, 33);
      //ARMS
      line(0, 10, 0, -60);
      strokeWeight(4);

      strokeWeight(1);
    }

    //BACKWARDS TUCK
    else if(player.direction === 2 || player.direction === 4) {
      strokeWeight(7);
      fill(255);
      //Body
      //BODY
      line(0, -40, 0, 20);
      //FEMUR
      line(0, 20, -18, 0);
      ellipse(0, -40, 31, 31);
      //FEET and shins
      line(-18, 0, -24, 20);

      //Arms
      line(0, -15, -18, 13);

    }

    //FORWARDS TUCK
    else if(player.direction === 3 || player.direction === 1) {
      strokeWeight(7);
      fill(255);
      //BODY
      line(0, -40, 0, 20);
      //FEMUR
      line(0, 20, 18, 0);
      ellipse(0, -40, 31, 31);
      //FEET and shins
      line(18, 0, 24, 20);

      //Arms
      line(0, -15, 18, 13);
    }

    fill(0);
    textSize(width/54);

    if((this.direction === 1 || this.direction === 2) && !this.go) {
      text("→", 0, -70);
    }
    else if((this.direction === 3 || this.direction === 4) && !this.go) {
      text("←", 0, -70);
    }

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
    this.x = this.initX;
    this.y = boardHeight;

    this.width = 40;
    this.height = 110;
    this.dx = 1.75;
    this.dy = -4;

    this.bodyColor = color(255, 0, 0);
    this.headColor = color(0, 255, 0);
    this.feetColor = color(255, 255, 0);
    this.faceColor = color(0, 0, 255);

    this.angle = 0;
    this.go = false;

    this.tuckSpinSpeed = 1.7;
    this.tuckSpinIncrease = 0.06;

    this.position = "layout";
    this.straightened = false;
    this.secondTuck = false;
    this.layoutSpeed = 0.8;
    this.direction = 1;

    this.facing = "forwards";
    this.spin = "forwards";

    this.didFail = false;
  }
}

class DivingButton {
  constructor(playerThing, changeTo, level, message) {
    this.space = 25;
    this.radius = height/13;
    this.x = width - this.radius - 40;
    this.y = height - level * (height/5.5) - height/7;
    this.color = color(255, 0, 255);
    this.hoveringColor = color(100, 100, 255);
    this.changeColor = color(0, 255, 0);
    this.available = false;
    this.whatToChange = playerThing;
    this.changeTo = changeTo;
    this.on = false;
    this.selected = false;
    this.message = message;
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

          else if(this.whatToChange === "direction") {
            if(!player.go) {
              player.direction = this.changeTo;
              this.selected = true;
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
        this.on = false;
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

      else if(player.go === false && this.whatToChange === "direction") {
        this.available = true;
      }

      else {
        this.available = false;
      }

      fill(160);
    }

    if(player.direction === this.changeTo) {
      fill(this.changeColor);
    }
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
    fill(0);
    textSize(width/54);
    textAlign(CENTER, CENTER);
    text(this.message, this.x, this.y);
  }
}




let gameState;

let player;


let diveDone;
let finishedDive;
let lastScores;

let initTime;
let initTimeCompButton;
let tuckButton, goButton;

let frontButton, backButton, reverseButton, inwardButton;

let diveMap;

let poolAmbiance;

let menuPool;
let buttonY;

let boardHeight;
let compListOne, compListTwo, compListThree, compListFour;
let ddListOne, ddListTwo, ddListThree, ddListFour;
let compMode = 0;
let temp;
let totalScore;

function preload() {
  menuPool = loadImage("assets/menuimage.jpg");
  // poolAmbiance = loadSound("assets/poolAmbiance.wav");
}

function setup() {
  angleMode(DEGREES);

  createCanvas(windowWidth, windowHeight);
  finishedDive = false;
  gameState = 1;
  buttonY = height/10;
  boardHeight = 100;
  //Guide to gameState
  //1 = Selection/Main menu
  //2 = Practice
  //3 = Competition menu
  //4 = Competition
  //5 = Settings/How to play

  compListOne = ["101c", "201c", "401c", "202c", "301c", "103c"];
  ddListOne = [1.2, 1.5, 1.4, 1.5, 1.6, 1.6];
  compListTwo = ["103c", "201c", "301c", "403c", "303c", "404c"];
  ddListTwo = [1.5, 1.7, 1.8, 1.9, 2.0, 2.4];

  compListThree = ["103c", "201c", "301c", "401c", "104c", "204c", "303c", "403c"];
  ddListThree = [1.6, 1.5, 1.6, 1.4, 2.2, 2.2, 2.1, 2.2];
  compListFour =  ["105c", "203c", "303c", "404c", "106c", "205c", "306c", "405c"];
  ddListFour = [2.2, 1.9, 2.0, 2.4, 2.5, 2.8, 2.6, 2.7];


  player = new Player(0, 0);
  goButton = new DivingButton("go", true, 0, "GO");
  tuckButton = new DivingButton("position", "tuck", 1, "Tuck");

  frontButton = new DivingButton("direction", 1, 1, "Front");
  backButton = new DivingButton("direction", 2, 2, "Back");
  reverseButton = new DivingButton("direction", 3, 3, "Reverse");
  inwardButton = new DivingButton("direction", 4, 4, "Inward");

  let diveMap = new Map();
}


function draw() {
  //Main Menu
  if(gameState === 1) {
    mainMenu();
  }
  //Practice
  else if (gameState === 2) {
    practice();
  }
  //Competition menu
  else if (gameState === 3) {
    competitionMenu();
  }

  else if (gameState === 4) {
    competition();
  }

}

function mainMenu() {
  image(menuPool, 0, 0, width, height);
  textSize(width/9);
  fill(255, 20, 70);
  text("Dynamic Diving", width/2, 250);
  drawStartButtons();
}

function competitionMenu() {
  image(menuPool, 0, 0, width, height);
  //COMPETITION 1, 1m Prov
  if(collidePointCircle(mouseX, mouseY,width/3, height/4, width/6, width/6)) {
    fill(0, 200, 100);
    if(mouseIsPressed) {
      compMode = 1;
      gameState = 4;
    }
  }
  else {
    fill(0, 255, 0);
  }
  ellipse(width/3, height/4, width/6, width/6);

  //COMPETITION 2, 3m prov
  if(collidePointCircle(mouseX, mouseY, width/1.5, height/4, width/6, width/6)) {
    fill(0, 200, 100);
    if(mouseIsPressed) {
      compMode = 2;
      gameState = 4;
    }
  }
  else {
    fill(0, 255, 0);
  }

  ellipse(width/1.5, height/4, width/6, width/6);

  //COMPETITION 3, 1m Nat
  if(collidePointCircle(mouseX, mouseY, width/3, height/4 * 3, width/6, width/6)) {
    fill(0, 200, 100);
    if(mouseIsPressed) {
      compMode = 3;
      gameState = 4;
    }
  }
  else {
    fill(0, 255, 0);
  }

  ellipse(width/3, height/4 * 3, width/6, width/6);

  //COMPETITION 4, 3m Nat
  if(collidePointCircle(mouseX, mouseY, width/1.5, height/4 * 3, width/6, width/6)) {
    fill(0, 200, 100);
    if(mouseIsPressed && !(millis() < initTimeCompButton + 1000)) {
      compMode = 4;
      gameState = 4;
    }
  }
  else {
    fill(0, 255, 0);
  }

  ellipse(width/1.5, height/4 * 3, width/6, width/6);


  fill(0);
  textAlign(CENTER, CENTER);
  text("1m Provincials", width/3, height/4);
  text("3m Nationals", width/1.5, height/4 * 3);
  text("1m Nationals", width/3, height/4 * 3);
  text("3m Provincials", width/1.5, height/4);
}

function competition() {

  if((compMode === 1 || compMode === 3) && temp !== false) {
    player.y = 400;
    boardHeight = 400;
    temp = false;
  }
  else if ((compMode === 2 || compMode === 40) && temp !== false) {
    player.y = 100;
    boardHeight = 100;
    temp = false;
  }

  background(255);

  if (player.go) {
    updatePlayer();
  }

  drawPlayer();
  drawPool();
  displayButtons();


  if(finishedDive) {
    if(millis() < initTime + 3000) {
      displayScores();
      goButton.available = false;
    }
    else {
      finishedDive = false;
    }
  }

}

function displayScores() {
  let time = millis();
  rectMode(CENTER);
  for(let i = 0; i < lastScores.length; i++) {
    fill(0);
    rect(width * (i+1) * (1/(lastScores.length+1)), height-200, 100, 100);
    fill(255);
    textAlign(CENTER, CENTER);
    text(lastScores[i].toString(), width * (i+1) * (1/(lastScores.length+1)), height-200);
  }
  rectMode(CORNER);
}

function switchBoardButton() {
  // let buttonY = height/10;
  if(collidePointCircle(mouseX, mouseY, width-300, buttonY, 90, 90)) {
    fill(0, 255, 255);
    if(mouseIsPressed) {
      if(player.y !== 400) {
        buttonY = height/10 * 4;
        player.y = 400;
        boardHeight = 400;
      }
      else {
        buttonY = height/10;
        player.y = 100;
        boardHeight = 100;
      }
    }
  }
  else {
    fill(255, 100, 50);
  }
  ellipse(width-300, buttonY, 90, 90);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(width/68);
  text("SWITCH", width-300, buttonY);

}

function drawStartButtons() {
  fill(0);

  textSize(width/40);
  stroke(0);

  //PRACTICE BUTTON
  if(collidePointEllipse(mouseX, mouseY, width/3, height-height/4, width/5, height/5)) {
    fill(255, 0, 0);
    if(mouseIsPressed) {
      gameState = 2;
    }
  }
  else {
    fill(255, 120, 0);
  }
  strokeWeight(3);
  ellipse(width/3, height-height/4, width/5, height/5);


  //COMPETITION BUTTON
  if(collidePointEllipse(mouseX, mouseY, width/1.5, height-height/4, width/5, height/5)) {
    fill(255, 0, 0);
    if(mouseIsPressed) {
      gameState = 3;
      initTimeCompButton = millis();
    }
  }
  else {
    fill(255, 120, 0);
  }

  ellipse(width/1.5, height-height/4, width/5, height/5);

  strokeWeight(2);
  fill(255);
  textAlign(CENTER, CENTER);
  text("PRACTICE", width/3, height-height/4);
  text("COMPETITION", width/1.5, height-height/4);
}

function practice() {
  // let noMusic;
  // if(noMusic !== false) {
  //   poolAmbiance.setVolume(0.01);
  //   poolAmbiance.loop();
  //   noMusic = false;
  // }

  background(255);
  if (player.go) {
    updatePlayer();
  }
  else {
    switchBoardButton();
  }
  drawPlayer();
  drawPool();
  displayButtons();


  if(finishedDive && !player.go) {
    if(millis() < initTime + 5000) {
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

  //Diving board
  rect(0, 110 * 1.5 - 11, width/3 + 10 + 3, 10);
  rect(0, 110 * 4.2 - 11, width/3 + 10 + 3, 10);
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
      if(gameState === 2) {
        player.didFail = false;
        defineDive();
        lastScores = score(1, player.didFail);
        player.reset();

        frontButton.selected = false;
        backButton.selected = false;
        reverseButton.selected = false;
        inwardButton.selected = false;
        tuckButton.available = false;

        finishedDive = true;
        initTime = millis();
      }

      else if (gameState === 4){
        defineDive();
        if(compMode === 1 || compMode === 2) {
          lastScores = score(3, player.didFail);
        }
        else {
          lastScores = score(5, player.didFail);
        }

        player.reset();

        frontButton.selected = false;
        backButton.selected = false;
        reverseButton.selected = false;
        inwardButton.selected = false;
        tuckButton.available = false;

        finishedDive = true;
        initTime = millis();
      }

    }
  }
}

function displayButtons() {
  if(!player.go) {
    goButton.display();
    frontButton.display();
    backButton.display();
    reverseButton.display();
    inwardButton.display();
  }

  else {
    tuckButton.display();
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

  textSize(width/54);
  let score = lastScores[0].toString();
  fill(0);
  textAlign(CENTER, CENTER);
  text("Dive number: " + diveDone, boxX + boxWidth/2, boxY + boxHeight/4);
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
      if(player.secondTuck || player.straightened === false) {
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


  }
  return allScores;
}

function defineDive() {
  let diveNumber = "";

  diveNumber += player.direction;
  diveNumber += "0";

  let rotations = abs(round(player.angle/180));
  diveNumber += rotations.toString();


  diveNumber += "c";

  diveDone = diveNumber;
}
