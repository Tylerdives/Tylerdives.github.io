// interactive scene
// Tyler Boechler
// September 12th, 2018
//
// Extra for Experts:
//
let BLUE = (38, 131, 193)
let gunShift = 50;

let x;
let y;

let xShift;
let yShift;



function drawPlayer(xLocation, yLocation){
  fill(38, 131, 193);
  ellipse(xLocation, yLocation, 100, 100);
  fill(158, 24, 9);
  ellipse(xLocation, yLocation, 15, 25);
  fill(255, 0, 0);
  rect(xLocation - 5, yLocation  - gunShift, 10, 40);

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  y = height/2;
  x = width/2;

  xShift = 0;
  yShift = 0;
}


function draw() {
  background(255)

  x += xShift;
  y += yShift;
  drawPlayer(x, y);
}

function keyPressed(){
  if(key = "w"){
    yShift = -1;
  }
  if(key = "s"){
    yShift = 1;
  }
  if(key = "a"){
    xShift = 1;
  }
  if(key = "d"){
    xShift = -1;
  }

}

function keyReleased(){
  xShift = 0;
  yShift = 0;
}
