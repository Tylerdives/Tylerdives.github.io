// ball
// Tlyer Boechler
// November 14th, 2018

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 125;
    this.dx = random(-10, 10);
    this.dy = random(-10, 10);
    // this.transparency = 255;
    this.color = color(random(255), random(255), random(255), 80);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  update() {
    // this.transparency -= 4;
    // this.color.setAlpha(this.transparency);
    if (this.x < 0 + this.size/2 || this.x > width - this.size/2) {
      this.dx = this.dx * -1;
    }
    if (this.y < 0 + this.size/2 || this.y > height - this.size/2) {
      this.dy = this.dy * -1;
    }



    this.x += this.dx;
    this.y += this.dy;
  }
}

let someParticle;
let ball = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for(let i = ball.length-1; i>=0; i--) {
    ball[i].update();
    ball[i].display();
  }
}

function mousePressed() {
  let someParticle = new Ball(mouseX, mouseY);
  ball.push(someParticle);
}
