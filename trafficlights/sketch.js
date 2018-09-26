
// Traffic Light
// Tyler Boechler
// Sept 25, 2018

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/

let state;
let lastTimeSwitchedColour;

const redLightDuration = 10000;
const yellowLightDuration = 2000;
const greenLightDuration = 6000;

function setup() {
  createCanvas(600, 600);

  state = 1;
  lastTimeSwitchedColour = 0;
}

function draw() {
  background(255);
  drawOutlineOfLights();
  changeState();
  displayCorrectLight();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  fill(35, 0, 0);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(35, 35, 0);
  ellipse(width/2, height/2, 50, 50); //middle
  fill(0, 35, 0);
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function changeState() {
  let elapsedTime = millis() - lastTimeSwitchedColour;
  if (state === 1 && millis() - lastTimeSwitchedColour >= redLightDuration) {
    state = 2;
    lastTimeSwitchedColour = millis();
  }
  if (state === 2 && millis() - lastTimeSwitchedColour >= greenLightDuration) {
    state = 3;
    lastTimeSwitchedColour = millis();
  }
  if (state === 3 && millis() - lastTimeSwitchedColour >= yellowLightDuration) {
    state = 1;
  }
}


function displayRedLight(){
  fill(255, 0, 0);
  ellipse(width/2, height/2 - 65, 50, 50); //top
}

function displayGreenLight(){
  fill(0, 255, 0);
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function displayYellowLight(){
  fill(255, 255, 0);
  ellipse(width/2, height/2, 50, 50); //middle
}

function displayCorrectLight() {
  if (state === 1) {
    displayRedLight();
  }
  if (state === 2) {
    displayGreenLight();
  }
  if (state === 3) {
    displayYellowLight();
  }
}

function changeLights() {

}
