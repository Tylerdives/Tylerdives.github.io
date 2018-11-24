// Pair Programming Game
// Tyler Boechler & Quincy Fast
// November 16th, 2018;
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Raindrop  {
  constructor() {
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = 0.01;
    this.dy = random(5, 6);
    this.radius = random(3, 7);
    this.color = color(0, random(60), 255 - random(50), 255 - random(150));
    this.touchingGround = false;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

    // fill(0);
    // textSize(60);
    // let messages = ["hey", "hi", "hola", "hello"];
    // text(random("hey"), this.x, this.y);
  }

  fall() {
    if (this.y + this.dy >= collectionHeight + this.radius/2) {
      this.touchingGround = true;
      this.y = random(-1000, -10);
      this.dy = 10;
    }
    else {
      this.touchingGround = false;
      this.dy += 0.2;
      // this.x += this.dx;
      this.y += this.dy;

      if(random(100) > 30 && this.dx < 5) {
        this.dx += random(0.1, 1);
      }
      else if (this.dx >= -1) {
        this.dx -= random(0.1, 1);
      }

      if (this.x > width) {
        this.x = 0;
      }
      else if (this.x < 0) {
        this.x = width;
      }
      this.x += this.dx;
    }

  }

}

class Snowflake {
  constructor() {
    this.x = random(width);
    this.y = random(-2000, -10);
    this.dx = random(-10, 10);
    this.dy = random(5, 6);
    this.size = random(20, 40);
    this.color = color(random(200, 255));
    this.touchingGround = false;
    this.shape = "*";
  }

  display() {
    fill(this.color);
    textSize(this.size);
    text(this.shape, this.x, this.y);
  }

  fall() {
    if (this.y + this.dy >= collectionHeight + this.size) {
      this.touchingGround = true;
      this.y = random(0, -10);
      this.dy = random(5, 6);
      this.dx = random(-2, 2);
    }
    else {
      this.touchingGround = false;
      this.dy += 0.01;
      if(random(100) > 50 && this.dx < 7) {
        this.dx++;
      }
      else if (this.dx >= -6){
        this.dx--;
      }
      if (this.x > width) {
        this.x = 0;
      }
      else if (this.x < 0) {
        this.x = width;
      }
      this.x += this.dx;
      this.y += this.dy;
    }

  }


}

class LightningBolt {
  constructor() {
    this.x = random(100, width - 100);
    this.y = -25;
    this.steps = ceil(random(15, 40));
    this.stepSize = ceil(width/this.steps);
    this.color = color(random(220, 255), random(220, 255), random(150, 220));
    this.size = floor(random(1, 10));
  }

  display() {
    // stroke(5);
    let nextY = this.y + this.stepSize;
    let nextX = this.x + random(-25, 25);
    strokeWeight(this.size);
    stroke(this.color);
    line(this.x, this.y, nextX, nextY);

    this.x = nextX;
    this.y = nextY;
  }
}

// let weatherLists.weather = [];

let dropCounter = 0;
let collectionHeight;
// let buffer = 31;

let weather;
let noRain;
let noSnow;
let lightning;

let weatherLists = {
  rain: [],
  snow: [],
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  weather = "rain";
  noRain = true;
  noSnow = true;
}

function draw() {

  if (weather === "rain") {
    if (noRain) {
      generatePrecipitation(weatherLists.rain, noRain);
    }

    if (random(300) > 298) {
      lightning = new LightningBolt();
      let shockTime = millis();
      for(let i = 0; i < lightning.steps; i++) {
        lightning.display();
      }
    }


    else {
      background(0);
      displayPrecipitation(weatherLists.rain, "rain");
      displayPrecipitation(weatherLists.snow, "snow");
    }
    elementalCollection(weather);
  }

  else if (weather === "snow") {
    background(0);
    if (noSnow) {
      generatePrecipitation(weatherLists.snow, noSnow);

    }
    displayPrecipitation(weatherLists.snow, "snow");
    displayPrecipitation(weatherLists.rain, "rain");
    elementalCollection(weather);
  }

  else if (weather === "sunny") {
    // display
  }
}

// function mousePressed() {
//   //rain
//   generateRain();
// }

function displayPrecipitation(precip, type) {
  collectionHeight = height - dropCounter * 0.001;
  for (let i=precip.length-1; i>0; i--) {
    precip[i].fall();
    precip[i].display();
    touchingGround(i, precip, type);
  }
}


function touchingGround(i, precip, type) {
  if (precip[i].touchingGround) {
    // console.log("in here...");
    dropCounter++;
    if (weather !== type) {
      // console.log("here!");
      precip.splice(i, 1);
    }

  }
}

function generatePrecipitation(list, type) {
  if (weather === "rain") {
    for (let i = 0; i < 400; i++) {
      let somePrecip = new Raindrop();
      list.push(somePrecip);
    }
    noRain = false;
  }
  else if (weather === "snow") {
    for (let i = 0; i < 400; i++) {
      let somePrecip = new Snowflake();
      list.push(somePrecip);
    }
    noSnow = false;
  }
}

function meltSnow() {

}

function evaporateWater() {

}

function elementalCollection(element) {
  noStroke();
  if (element === "rain") {
    fill(0, 0, 255, 150);
    rect(0, collectionHeight, width, dropCounter * 0.001);
  }
  else if (element === "snow") {
    fill(200, 200, 255, 125);
    rect(0, collectionHeight, width, dropCounter * 0.001);
  }


}
