// Pair Programming Game
// Tyler Boechler & Quincy Fast
// November 16th, 2018;
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Raindrop  {
  constructor() {
    this.x = random(width);
    this.y = random(-1000, -10);
    this.dx = 0;
    this.dy = 8;
    this.radius = 6;
    this.color = color(0, random(60), 255 - random(50), 255 - random(150));
    this.touchingGround = false;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  fall() {
    if (this.y + this.dy >= collectionHeight) {
      this.touchingGround = true;

    }
    else {
      this.dy += 0.3;
      this.y += this.dy;
    }

  }

}

let rainArray = [];
let dropCounter = 0;
let collectionHeight;
let buffer = 31;

let weather;

function setup() {
  createCanvas(windowWidth, windowHeight);
  weather = "rain";
}

function draw() {
  if (weather === "rain") {

    displayRain();
  }
}

function mousePressed() {
  //rain
  generateRain();


}

function displayRain() {
  collectionHeight = height - dropCounter * 0.1;
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
    rainArray.splice(i, 1);
  }
}

function generateRain() {
  for (let i = 0; i < 200; i++) {
    let someRain = new Raindrop();
    rainArray.push(someRain);
  }
}



function elementalCollection(element) {
  if (element === "rain") {
    fill(0, 0, 255, 150);
  }

  rect(0, collectionHeight, width, dropCounter * 0.1);
}
