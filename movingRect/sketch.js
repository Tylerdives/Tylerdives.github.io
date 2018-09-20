// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let dx;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  dx = 3;
}

function draw() {
  background(255);
  fill(45, 50, 175);
  rect(x, height/2, 100, 50);
  if (x + 100 > width || x < 0){
    dx = dx * -1;
  }
  x += dx;
}
