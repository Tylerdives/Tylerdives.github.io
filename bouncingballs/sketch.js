// Project Title
// Your Name
// Date

let ballArray = [];
let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  fill(0);
  moveBalls();
}

function moveBalls() {
  for(let i = 0; i < ballArray.length; i++) {
    ellipse(ballArray[i].x, ballArray[i].y, ballArray[i].radius * 2, ballArray[i].radius * 2);
    ballArray[i].x += ballArray[i].xSpeed;
    ballArray[i].y += ballArray[i].ySpeed;

    if(ballArray[i].x > width - ballArray[i].radius || ballArray[i].x < 0 + ballArray[i].radius) {
      ballArray[i].xSpeed = ballArray[i].xSpeed * -1;
    }
    if(ballArray[i].y > height - ballArray[i].radius || ballArray[i].y < 0 + ballArray[i].radius) {
      ballArray[i].ySpeed = ballArray[i].ySpeed * -1;
    }
  }
}
function mouseClicked() {
  ball = {
    x: mouseX,
    y: mouseY,
    xSpeed: random(-5, 5),
    ySpeed: random(-5, 5),
    radius: 20,
  };
  ballArray.push(ball);
}
