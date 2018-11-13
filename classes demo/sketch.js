// Walker OOP demo
// Tyler Boechler
// November 13th, 2018

class Walker {
  constructor(color) {
    this.x = width/2;
    this.y = height/2;
    this.colour = color;
    this.speed = 20;
  }

  display() {
    fill(this.colour);
    noStroke();
    ellipse(this.x, this.y, 20, 20);
  }

  move() {
    let choice = random(0, 100);
    if (choice < 25) {
      //Up
      this.y -= this.speed;
    }

    else if (choice < 50) {
      //down
      this.y += this.speed;
    }

    else if (choice > 75) {
      //left
      this.x -= this.speed;
    }

    else {
      this.x += this.speed;
    }

  }

}

let tyler;
let nevan;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tyler = new Walker("blue");
  nevan = new Walker("red");
}

function draw() {

  tyler.move();
  tyler.display();

  nevan.move();
  nevan.display();
}
