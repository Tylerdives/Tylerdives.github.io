// Pair Programming Game
// Tyler Boechler & Quincy Fast
// November 16th, 2018;
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Raindrop  {
  constructor() {
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = 0;
    this.dy = 8;
    this.radius = random(3, 6);
    this.color = color(0, random(60), 255 - random(50), 255 - random(150));
    this.touchingGround = false;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  fall() {
    if (this.y + this.dy >= collectionHeight + this.radius/2) {
      this.touchingGround = true;
      this.y = random(-1000, -10);
      this.dy = 8;
    }
    else {
      this.dy += 0.2;
      this.y += this.dy;
    }

  }
}

let rainArray = [];
let dropCounter = 0;
let collectionHeight;
let buffer = 31;

let weather;
let noRain;
let noSnow;

function setup() {
  createCanvas(windowWidth, windowHeight);
  weather = "rain";
  noRain = true;
}

function draw() {
  if (weather === "rain") {
    if (noRain) {
      generateRain();
    }
    displayRain();
  }
}

function mousePressed() {
  //rain
  generateRain();
}

function displayRain() {

  collectionHeight = height - dropCounter * 0.0001;
  background(255);
  for (let i=rainArray.length-1; i>0; i--) {
    rainArray[i].fall();
    rainArray[i].display();
    touchingGround(i);
  }

  elementalCollection("rain");
}

function touchingGround(i) {
  if (rainArray[i].touchingGround) {
    dropCounter++;
    // rainArray.splice(i, 1);
  }
}

function generateRain() {
  for (let i = 0; i < 400; i++) {
    let someRain = new Raindrop();
    rainArray.push(someRain);
  }
  noRain = false;
}



function elementalCollection(element) {
  if (element === "rain") {
    fill(0, 0, 255, 150);
  }

  rect(0, collectionHeight, width, dropCounter * 0.0001);
}
