// Fireworks
// Tlyer Boechler
// November 14th, 2018

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 125;
    this.dx = random(-10, 10);
    this.dy = random(-10, 10);
    // this.transparency = 255;
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  update() {
    // this.transparency -= 4;
    // this.color.setAlpha(this.transparency);
    if(this.x < 0 + this.size/2 || this.x > width - this.size/2) {
      this.dx = this.dx * -1;
    }
    if(this.y < 0 + this.size/2 || this.y > height - this.size/2) {
      this.dy = this.dy * -1;
    }

    

    this.x += this.dx;
    this.y += this.dy;
  }
}

let someParticle;
let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for(let i = 0; i< fireworks.length; i++) {
    fireworks[i].update();
    fireworks[i].display();
  }
}

function mousePressed() {
  let someParticle = new Particle(mouseX, mouseY);
  fireworks.push(someParticle);
}
