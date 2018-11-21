// Project Title
// Your Name
// Date

let snowWidth;
let snowX;
let time = 0;
let rects = [];
let snowHeight;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  snowWidth = width;
  snowHeight = 200;
  generateRectangles();
}

function draw() {
  background(0);
  fill(200);
  displayRects();
}



function displayRects() {
  for (let i=0; i<rects.length; i++) {
    rect(rects[i].x, rects[i].y, rects[i].width, rects[i].height);
  }
}

function generateRectangles() {
  //rects = [];

  for (let i=0; i<snowWidth; i++) {
    let someSnow = noise(time)*snowHeight;
    let someRect = {
      x: i,
      y: height -someSnow,
      width: 1,
      height: someSnow
    };
    rects.push(someRect);
    time += 0.001;
  }
}
