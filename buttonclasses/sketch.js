// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Button {
  constructor(x, y, string, width, height) {
    this.x = x;
    this.y = y;
    this.message = string;
    this.color = "red";
    this.width = width;
    this.height = height;
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    textAlign(CENTER);
    textSize(60);
    fill(0);
    text(this.message, this.x + this.width/2, this.y + this.height/2);
  }

  hovering() {
    if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
      this.color = "orange";
      if(mouseIsPressed) {
        this.color = "white";
      }
    }
    else {
      this.color = "red";
    }
  }
}

let button1, button2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  button1 = new Button(width/2 - 250, height/3 + 100, "Button?", 500, 200);
  button2 = new Button(width/2, height/1.5, "Button2?", 1000, 200);
}

function draw() {
  button1.hovering();
  button1.display();

  button2.hovering();
  button2.display();
}
