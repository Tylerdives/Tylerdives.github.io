// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let duck;
let scalar;

function preload() {
  duck = loadImage("assets/duck.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  scalar = 1.0;
}

function draw() {
  background(255);
  image(duck, mouseX, mouseY, duck.width * scalar, duck.height * scalar);
}

function mouseWheel(event) {
  if (event.delta > 0 && scalar <= 1.6){
    scalar = scalar * 1.1;
  }
  if (event.delta < 0 && scalar >= 0.1) {
    scalar = scalar * 0.9;
  }
}
